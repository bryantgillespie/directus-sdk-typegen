import { isSEOField, seoTypeName } from './extensions/seo-plugin';

export const interfacesWithChoices = [
	'select-dropdown',
	'select-multiple',
	'select-multiple-dropdown',
	'select-radio',
];

export function pascalCase(value: string): string {
	return value
		.split(/[\s_-]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export function singularize(word: string): string {
	if (!word || typeof word !== 'string') return '';

	if (word.endsWith('ies') && word.length > 3) {
		return word.slice(0, -3) + 'y';
	}

	if (word.endsWith('es') && ['ch', 'sh', 'ss', 'x'].some((ending) => word.endsWith(ending))) {
		return word.slice(0, -2);
	}

	if (word.endsWith('ves')) {
		return word.slice(0, -3) + 'f';
	}

	if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
		return word.slice(0, -1);
	}

	// If no rules apply, return the original word
	return word;
}

export function generateJSDocComment(field: any): string {
	const comments = [];

	// Skip fields with translation descriptions for now
	if (field.meta?.note && !field.meta.note.startsWith('$t')) {
		comments.push(`@description ${field.meta.note}`);
	}

	if (field.schema?.is_primary_key || field.meta?.required) {
		comments.push('@required');
	}

	return comments.length > 0 ? `\t/** ${comments.join(' ')} */\n` : '';
}

export function shouldIncludeField(field: any): boolean {
	const isPresentationField = field.meta?.interface?.startsWith('presentation-');

	const isNonRelationalAlias =
		field.type === 'alias' &&
		!field.meta?.special?.some((special: string) =>
			['m2o', 'o2m', 'm2m', 'm2a', 'translations', 'files'].includes(special),
		);

	const isGroup = field.meta?.special?.includes('group');

	return !(isPresentationField || isNonRelationalAlias || isGroup);
}

export function determineFieldType(field: any): string {
	// Handle extensions like SEO type
	if (isSEOField(field)) {
		return seoTypeName;
	}

	// Handle translations interface first
	if (field.meta?.special?.includes('translations')) {
		const translationsCollection = field.relation?.collection;
		if (translationsCollection) {
			const translationType = pascalCase(singularize(translationsCollection));
			return `${translationType}[] | null`;
		}
	}
	// Handle files interface
	if (field.meta?.special?.includes('files')) {
		return 'DirectusFile[] | string[] | null';
	}

	if (field.relation && field.relation.collection) {
		const relatedTypeName = pascalCase(singularize(field.relation.collection));

		if (field.relation.type === 'many') {
			return `${relatedTypeName}[] | string[]`;
		} else if (field.relation.type === 'm2a') {
			// Handle many-to-any relations
			const allowedCollections = field.relation.allowedCollections;
			if (Array.isArray(allowedCollections) && allowedCollections.length > 0) {
				const unionTypes = allowedCollections
					.map((collection) => `${pascalCase(singularize(collection))}`)
					.join(' | ');
				return `${unionTypes} | string`;
			}
			return 'any | string';
		} else {
			return `${relatedTypeName} | string`;
		}
	}

	if (interfacesWithChoices.includes(field.meta?.interface)) {
		const choices = field.meta.options?.choices;

		if (Array.isArray(choices) && choices.length > 0) {
			const choiceValues = choices.map((choice: any) => {
				return choice.value === null ? 'null' : escapeStringLiteral(choice.value);
			});

			// Remove duplicate values while preserving order
			const uniqueChoices = [...new Set(choiceValues)];

			const unionOfChoices = uniqueChoices.join(' | ');

			if (['select-multiple', 'select-multiple-dropdown'].includes(field.meta.interface)) {
				return `Array<${unionOfChoices}>`;
			}

			return unionOfChoices;
		}
	}

	if (field.type === 'json') {
		if (field.meta?.interface === 'list') {
			const nestedFields = field.meta.options?.fields;

			if (Array.isArray(nestedFields) && nestedFields.length > 0) {
				const nestedTypes = nestedFields.map((nestedField: any) => {
					const fieldType = determineFieldType(nestedField); // Reuse the same function
					return `${nestedField.field}: ${fieldType}`;
				});

				return `Array<{ ${nestedTypes.join('; ')} }>`;
			}

			return 'unknown[]';
		}

		if (field.meta?.interface === 'input-code') {
			return 'Record<string, any>';
		}

		if (field.meta?.interface === 'tags') {
			return 'string[]';
		}

		return 'any';
	}

	if (field.type === 'csv') {
		return 'string[]';
	}

	if (['integer', 'bigInteger', 'float', 'decimal'].includes(field.type)) {
		return 'number';
	}

	if (field.type === 'boolean') {
		return 'boolean';
	}

	return 'string';
}

export function escapeStringLiteral(value: unknown): string {
	// Handle non-string values
	if (typeof value !== 'string') {
		if (value === undefined || value === null) {
			return 'null';
		}
		if (typeof value === 'number') {
			return value.toString();
		}
		// For other types, convert to JSON string
		return JSON.stringify(value);
	}

	// Escape backslashes and single quotes
	const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

	// Check if the string contains any special characters
	if (/^[a-zA-Z0-9_]+$/.test(escaped)) {
		// If it's a simple string, just wrap it in single quotes
		return `'${escaped}'`;
	} else {
		// For complex strings, use a template literal string
		return `\`${escaped.replace(/`/g, '\\`')}\``;
	}
}
