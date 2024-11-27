export interface Field {
	field: string;
	type: string;
	schema?: {
		is_nullable?: boolean;
		is_primary_key?: boolean;
		max_length?: number;
		foreign_key_table?: string;
		foreign_key_column?: string;
	};
	meta?: {
		interface?: string;
		note?: string;
		required?: boolean;
		options?: {
			choices?: Array<{ value: string }>;
		};
		special?: string[];
	};
	relation?: {
		type: 'one' | 'many' | 'm2a';
		collection?: string;
		allowedCollections?: string[];
	};
}

export interface Collection {
	collection: string;
	schema?: object;
	meta?: {
		singleton?: boolean;
	};
	fields: Field[];
}

export interface Relation {
	meta: {
		one_collection: string;
		one_field: string;
		many_collection: string;
		many_field: string;
		one_allowed_collections?: string[];
		junction_field?: string;
	};
}

export interface TranslationRelation {
	oneCollection: string;
	oneField: string;
	manyCollection: string;
	manyField: string;
	junctionField?: string;
}
