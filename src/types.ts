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
		type: 'one' | 'many';
		collection?: string;
	};
}

export interface Collection {
	collection: string;
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
	};
}
