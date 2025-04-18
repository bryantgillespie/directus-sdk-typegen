import type { ApiClient } from './api';
import type { Collection, Field, Relation, TranslationRelation } from './types';

export async function getCollections(api: ApiClient): Promise<Record<string, Collection>> {
	const [collectionsData, fieldsData, relationsData] = await Promise.all([
		api.fetch('/collections'),
		api.fetch('/fields'),
		api.fetch('/relations'),
	]);

	const collections: Record<string, Collection> = {};

	for (const collection of collectionsData.data) {
		// We want to skip over folders
		if (collection.schema) {
			collections[collection.collection] = { ...collection, fields: [] };
		}
	}

	const translationRelations: TranslationRelation[] = relationsData.data
		.filter((relation: Relation) => {
			const oneField = fieldsData.data.find(
				(field: Field & { collection: string }) =>
					field.collection === relation.meta.one_collection &&
					field.field === relation.meta.one_field &&
					field.meta?.special?.includes('translations'),
			);
			return !!oneField;
		})
		.map((relation: Relation) => ({
			oneCollection: relation.meta?.one_collection,
			oneField: relation.meta?.one_field,
			manyCollection: relation.meta?.many_collection,
			manyField: relation.meta?.many_field,
			junctionField: relation.meta?.junction_field ?? '',
		}));

	for (const field of fieldsData.data) {
		if (collections[field.collection]) {
			collections[field.collection]?.fields.push(field);
		}
	}

	for (const relation of relationsData.data) {
		const meta = relation.meta;

		if (meta) {
			if (meta.one_allowed_collections) {
				// Handle many-to-any relation
				updateFieldRelation({
					collections,
					collectionName: meta.many_collection,
					relatedCollection: 'directus_collections',
					fieldName: meta.many_field,
					relationType: 'm2a',
					allowedCollections: meta.one_allowed_collections,
				});
			} else {
				// Handle one-to-many and many-to-one relations
				updateFieldRelation({
					collections,
					collectionName: meta.one_collection,
					fieldName: meta.one_field,
					relationType: 'many',
					relatedCollection: meta.many_collection,
				});
				updateFieldRelation({
					collections,
					collectionName: meta.many_collection,
					fieldName: meta.many_field,
					relationType: 'one',
					relatedCollection: meta.one_collection,
				});
			}
		}
	}

	for (const relation of translationRelations) {
		const mainCollection = collections[relation.oneCollection];
		if (mainCollection) {
			const existingTranslationField = mainCollection.fields.find((field) =>
				field.meta?.special?.includes('translations'),
			);

			if (!existingTranslationField) {
				mainCollection.fields.push({
					field: 'translations',
					type: 'alias',
					meta: {
						special: ['o2m'],
						interface: 'translations',
					},
					relation: {
						type: 'many',
						collection: relation.manyCollection,
					},
				});
			}
		}
	}

	return collections;
}

interface UpdateFieldRelationParams {
	collections: Record<string, Collection>;
	collectionName: string;
	fieldName: string;
	relationType: 'one' | 'many' | 'm2a';
	relatedCollection?: string | string[];
	allowedCollections?: string[];
}

export function updateFieldRelation({
	collections,
	collectionName,
	fieldName,
	relationType,
	relatedCollection,
	allowedCollections,
}: UpdateFieldRelationParams): void {
	const field = collections[collectionName]?.fields.find((field) => field.field === fieldName);

	if (field) {
		field.relation = {
			type: relationType,
			collection: relatedCollection as string,
			allowedCollections,
		};
	}
}
