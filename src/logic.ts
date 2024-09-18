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
		collections[collection.collection] = { ...collection, fields: [] };
	});

	fieldsData.data.forEach((field: Field & { collection: string }) => {
		if (collections[field.collection]) {
			collections[field.collection]?.fields.push(field);
		}
	});

	relationsData.data.forEach((relation: Relation) => {
		const meta = relation.meta;

		if (meta) {
			updateFieldRelation(collections, meta.one_collection, meta.one_field, 'many', meta.many_collection);
			updateFieldRelation(collections, meta.many_collection, meta.many_field, 'one', meta.one_collection);
		}
	});

	return collections;
}

export function updateFieldRelation(
	collections: Record<string, Collection>,
	collectionName: string,
	fieldName: string,
	relationType: 'one' | 'many',
	relatedCollection: string,
): void {
	const field = collections[collectionName]?.fields.find((field) => field.field === fieldName);

	if (field) {
		field.relation = {
			type: relationType,
			collection: relatedCollection,
		};
	}
}
