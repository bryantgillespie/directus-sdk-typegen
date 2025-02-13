import { Field } from '../types';

export interface ExtensionSeoMetadata {
	title?: string;
	meta_description?: string;
	og_image?: string;
	additional_fields?: Record<string, unknown>;
	sitemap?: {
		change_frequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
		priority: string;
	};
	no_index?: boolean;
	no_follow?: boolean;
}

export function isSEOField(field: Field): boolean {
	return (
		field.type === 'json' &&
		field.meta?.interface === 'seo-interface' &&
		field.meta?.special?.includes('cast-json') === true
	);
}

export const seoOutput = `
export interface ExtensionSeoMetadata {
    title?: string;
    meta_description?: string;
    og_image?: string;
    additional_fields?: Record<string, unknown>;
    sitemap?: {
        change_frequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: string;
    };
    no_index?: boolean;
    no_follow?: boolean;
}\n\n`;

export const seoTypeName = 'ExtensionSeoMetadata';
