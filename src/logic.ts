import { ApiClient } from './api';
import type { Collection, Field, Relation } from './types';

export async function getCollections(api: ApiClient): Promise<Record<string, Collection>> {
	const [collectionsData, fieldsData, relationsData] = await Promise.all([
		api.fetch('/collections'),
		api.fetch('/fields'),
		api.fetch('/relations'),
	]);

	const collections: Record<string, Collection> = {};

	collectionsData.data.forEach((collection: Collection) => {
		// We want to skip over folders
		if (collection.schema) {
			collections[collection.collection] = { ...collection, fields: [] };
		}
	});

	fieldsData.data.forEach((field: Field & { collection: string }) => {
		if (collections[field.collection]) {
			collections[field.collection]?.fields.push(field);
		}
	});

	relationsData.data.forEach((relation: Relation) => {
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
	});

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
