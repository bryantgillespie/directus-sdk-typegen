export interface Email {
	/** @required */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	event?: Event | string | null;
	metadata?: Record<string, any> | null;
	event_email?: EventEmail | string | null;
	to_person?: People | string | null;
}

export interface EmailTemplate {
	/** @required */
	id: string;
	subject?: string | null;
	template?: string | null;
}

export interface EventCustomRegistrationAnswer {
	/** @required */
	id: string;
	people?: People | string | null;
	event_registration?: EventRegistration | string | null;
	question?: EventCustomRegistrationQuestion | string | null;
	value?: string | null;
	question_name?: string | null;
}

export interface EventCustomRegistrationQuestion {
	/** @required */
	id: string;
	sort?: number | null;
	/** @description Unique key for this field. Can be used to prefill form fields. `?{key}}=orange` @required */
	name: string;
	/** @description What type of form input? @required */
	type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'hidden';
	/** @description Any other helpful instructions for the user? These show below the input. */
	help?: string | null;
	/** @description Require the user to complete this field to register. */
	required?: boolean | null;
	/** @description Add choices for radio or select fields. Each choice should have a text (label) and a value. */
	choices?: Array<{ text: string; value: string }> | null;
	event?: Event | string | null;
	/** @description Label shown to the end user filling out the form @required */
	label: string;
}

export interface EventEmail {
	/** @required */
	id: string;
	status?: 'draft' | 'scheduled' | 'sent';
	sort?: number | null;
	event?: Event | string | null;
	/** @description When should this reminder go out? */
	scheduled_at?: string | null;
	custom_message?: string | null;
	type?: 'reminder' | 'feedback' | null;
	email_template?: EmailTemplate | string | null;
}

export interface EventFeedback {
	/** @required */
	id: string;
	timestamp?: string | null;
	people?: People | string | null;
	event?: Event | string | null;
	comments?: string | null;
	rating?: number | null;
}

export interface EventGlobals {
	/** @required */
	id: string;
	google_tag_manager_id?: string | null;
	/** @description Used for title of the site and meta tags. */
	title?: string | null;
	brand_color?: string | null;
	/** @description Description for the site. Used for meta description tag as well. */
	description?: string | null;
	site_public_url?: string | null;
	/** @description When enabled, shows brief pop-up messages (toasts) indicating recent event registrations by other users. This feature creates social proof, potentially encouraging more sign-ups and improving conversion rates. */
	show_social_proof_messages?: boolean;
	plausible_domain?: string | null;
	font_family_display?: string | null;
	font_family_sans?: string | null;
	font_family_mono?: string | null;
	scripts_head?: string | null;
	gray_color?: string | null;
	logo_on_light?: DirectusFile | string | null;
	logo_on_dark?: DirectusFile | string | null;
	/** @description A unique URL that triggers an automatic rebuild and deployment of your site when accessed. Use this to integrate with hosting services like Netlify or Vercel or to manually initiate builds. */
	build_hook_url?: string | null;
	favicon?: DirectusFile | string | null;
	/** @description Build your own webinar platform at rabbit speed. */
	footer_tagline?: string | null;
	footer_links?: Array<{ label: string; url: string; open_in_new_window: boolean }> | null;
	social_links?: Array<{
		service:
			| 'facebook'
			| 'instagram'
			| 'linkedin'
			| 'twitter'
			| 'vimeo'
			| 'youtube'
			| 'github'
			| 'discord'
			| 'docker';
		url: string;
	}> | null;
	global_content?: Record<string, any> | null;
	directus_url?: string | null;
}

export interface EventHost {
	/** @required */
	id: string;
	sort?: number | null;
	event?: Event | string | null;
	user?: DirectusUser | string | null;
}

export interface EventRegistration {
	/** @required */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	event?: Event | string | null;
	people?: People | string | null;
	sort?: number | null;
	test?: string[] | null;
	custom_registration_answers?: EventCustomRegistrationAnswer[] | string[];
}

export interface Event {
	/** @required */
	id: string;
	status?: 'draft' | 'active' | 'past';
	sort?: number | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	/** @description Name of the event. @required */
	title: string;
	/** @required */
	slug: string;
	/** @description When does this event start? @required */
	start_at: string;
	/** @description When does this event end? */
	end_at?: string | null;
	/** @description Short description of the event. Used in SEO meta description. */
	description?: string | null;
	featured_image?: DirectusFile | string | null;
	timezone?: string | null;
	location?: 'whereby' | 'youtube' | 'other' | null;
	location_url?: string | null;
	location_youtube?: string | null;
	recording_url?: string | null;
	content?: string | null;
	location_whereby?: any | null;
	custom_registration_questions?: EventCustomRegistrationQuestion[] | string[];
	emails?: EventEmail[] | string[];
	feedback?: EventFeedback[] | string[];
	registrants?: EventRegistration[] | string[];
	hosts?: EventHost[] | string[];
}

export interface OtpCode {
	/** @required */
	id: string;
	created_at?: string | null;
	people?: People | string | null;
	expires_at?: string | null;
	code?: string | null;
	used?: number | null;
}

export interface People {
	/** @description Unique identifier for this user. @required */
	id: string;
	sort?: number | null;
	date_created?: string | null;
	date_updated?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	/** @required */
	email: string;
	job_title?: string | null;
	website?: string | null;
	avatar?: DirectusFile | string | null;
	/** @description Two character country code (ie. `US`, `FR`) */
	country?: string | null;
	ip_address?: string | null;
	phone_number?: string | null;
	password?: string | null;
	session_expires_at?: string | null;
	status?: 'unverified' | 'active' | 'inactive' | 'blocked' | null;
	events?: EventRegistration[] | string[];
	custom_registration_answers?: EventCustomRegistrationAnswer[] | string[];
}

export interface DirectusAccess {
	/** @required */
	id: string;
	role?: DirectusRole | string | null;
	user?: DirectusUser | string | null;
	policy?: DirectusPolicy | string;
	sort?: number | null;
}

export interface DirectusActivity {
	/** @required */
	id: number;
	action?: string;
	user?: DirectusUser | string | null;
	timestamp?: string;
	ip?: string | null;
	user_agent?: string | null;
	collection?: string;
	item?: string;
	comment?: string | null;
	origin?: string | null;
	revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
	/** @required */
	collection: string;
	icon?: string | null;
	note?: string | null;
	display_template?: string | null;
	hidden?: boolean;
	singleton?: boolean;
	translations?: Array<{
		language: string;
		translation: string;
		singular: string;
		plural: string;
	}> | null;
	archive_field?: string | null;
	archive_app_filter?: boolean;
	archive_value?: string | null;
	unarchive_value?: string | null;
	sort_field?: string | null;
	accountability?: 'all' | 'activity' | null | null;
	color?: string | null;
	item_duplication_fields?: any | null;
	sort?: number | null;
	group?: DirectusCollection | string | null;
	collapse?: string;
	preview_url?: string | null;
	versioning?: boolean;
}

export interface DirectusField {
	/** @required */
	id: number;
	collection?: DirectusCollection | string;
	field?: string;
	special?: string[] | null;
	interface?: string | null;
	options?: any | null;
	display?: string | null;
	display_options?: any | null;
	readonly?: boolean;
	hidden?: boolean;
	sort?: number | null;
	width?: string | null;
	translations?: any | null;
	note?: string | null;
	conditions?: any | null;
	required?: boolean | null;
	group?: DirectusField | string | null;
	validation?: any | null;
	validation_message?: string | null;
}

export interface DirectusFile {
	/** @required */
	id: string;
	storage?: string;
	filename_disk?: string | null;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
	folder?: DirectusFolder | string | null;
	uploaded_by?: DirectusUser | string | null;
	created_on?: string;
	modified_by?: DirectusUser | string | null;
	modified_on?: string;
	charset?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
	embed?: string | null;
	description?: string | null;
	location?: string | null;
	tags?: string[] | null;
	metadata?: any | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	tus_id?: string | null;
	tus_data?: any | null;
	uploaded_on?: string | null;
}

export interface DirectusFolder {
	/** @required */
	id: string;
	name?: string;
	parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
	/** @required */
	version: string;
	name?: string;
	timestamp?: string | null;
}

export interface DirectusPermission {
	/** @required */
	id: number;
	collection?: string;
	action?: string;
	permissions?: any | null;
	validation?: any | null;
	presets?: any | null;
	fields?: string[] | null;
	policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
	/** @required */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	ip_access?: string[] | null;
	enforce_tfa?: boolean;
	admin_access?: boolean;
	app_access?: boolean;
	permissions?: DirectusPermission[] | string[];
	users?: DirectusAccess[] | string[];
	roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
	/** @required */
	id: number;
	bookmark?: string | null;
	user?: DirectusUser | string | null;
	role?: DirectusRole | string | null;
	collection?: string | null;
	search?: string | null;
	layout?: string | null;
	layout_query?: any | null;
	layout_options?: any | null;
	refresh_interval?: number | null;
	filter?: any | null;
	icon?: string | null;
	color?: string | null;
}

export interface DirectusRelation {
	/** @required */
	id: number;
	many_collection?: string;
	many_field?: string;
	one_collection?: string | null;
	one_field?: string | null;
	one_collection_field?: string | null;
	one_allowed_collections?: string[] | null;
	junction_field?: string | null;
	sort_field?: string | null;
	one_deselect_action?: string;
}

export interface DirectusRevision {
	/** @required */
	id: number;
	activity?: DirectusActivity | string;
	collection?: string;
	item?: string;
	data?: any | null;
	delta?: any | null;
	parent?: DirectusRevision | string | null;
	version?: DirectusVersion | string | null;
}

export interface DirectusRole {
	/** @required */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	parent?: DirectusRole | string | null;
	children?: DirectusRole[] | string[];
	policies?: DirectusAccess[] | string[];
	users?: DirectusUser[] | string[];
}

export interface DirectusSession {
	/** @required */
	token: string;
	user?: DirectusUser | string | null;
	expires?: string;
	ip?: string | null;
	user_agent?: string | null;
	share?: DirectusShare | string | null;
	origin?: string | null;
	next_token?: string | null;
}

export interface DirectusSettings {
	/** @required */
	id: number;
	project_name?: string;
	project_url?: string | null;
	project_color?: string;
	project_logo?: DirectusFile | string | null;
	public_foreground?: DirectusFile | string | null;
	public_background?: DirectusFile | string | null;
	public_note?: string | null;
	auth_login_attempts?: number | null;
	auth_password_policy?:
		| null
		| `/^.{8,}$/`
		| `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{\';\'?>.<,])(?!.*\\s).*$/`
		| null;
	storage_asset_transform?: 'all' | 'none' | 'presets' | null;
	storage_asset_presets?: Array<{
		key: string;
		fit: 'contain' | 'cover' | 'inside' | 'outside';
		width: number;
		height: number;
		quality: number;
		withoutEnlargement: boolean;
		format: 'auto' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';
		transforms: any;
	}> | null;
	custom_css?: string | null;
	storage_default_folder?: DirectusFolder | string | null;
	basemaps?: Array<{
		name: string;
		type: 'raster' | 'tile' | 'style';
		url: string;
		tileSize: number;
		attribution: string;
	}> | null;
	mapbox_key?: string | null;
	module_bar?: any | null;
	project_descriptor?: string | null;
	default_language?: string;
	custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
	public_favicon?: DirectusFile | string | null;
	default_appearance?: 'auto' | 'light' | 'dark';
	default_theme_light?: string | null;
	theme_light_overrides?: any | null;
	default_theme_dark?: string | null;
	theme_dark_overrides?: any | null;
	report_error_url?: string | null;
	report_bug_url?: string | null;
	report_feature_url?: string | null;
	public_registration?: boolean;
	public_registration_verify_email?: boolean;
	public_registration_role?: DirectusRole | string | null;
	public_registration_email_filter?: any | null;
	command_palette_settings?: Record<string, any> | null;
}

export interface DirectusUser {
	/** @required */
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	password?: string | null;
	location?: string | null;
	title?: string | null;
	description?: string | null;
	tags?: string[] | null;
	avatar?: DirectusFile | string | null;
	language?: string | null;
	tfa_secret?: string | null;
	status?: 'draft' | 'invited' | 'unverified' | 'active' | 'suspended' | 'archived';
	role?: DirectusRole | string | null;
	token?: string | null;
	last_access?: string | null;
	last_page?: string | null;
	provider?: string;
	external_identifier?: string | null;
	auth_data?: any | null;
	email_notifications?: boolean | null;
	appearance?: null | 'auto' | 'light' | 'dark' | null;
	theme_dark?: string | null;
	theme_light?: string | null;
	theme_light_overrides?: any | null;
	theme_dark_overrides?: any | null;
	policies?: DirectusAccess[] | string[];
}

export interface DirectusWebhook {
	/** @required */
	id: number;
	name?: string;
	method?: null;
	url?: string;
	status?: 'active' | 'inactive';
	data?: boolean;
	actions?: string[];
	collections?: string[];
	headers?: Array<{ header: string; value: string }> | null;
	was_active_before_deprecation?: boolean;
	migrated_flow?: DirectusFlow | string | null;
}

export interface DirectusDashboard {
	/** @required */
	id: string;
	name?: string;
	icon?: string;
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	color?: string | null;
	panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
	/** @required */
	id: string;
	dashboard?: DirectusDashboard | string;
	name?: string | null;
	icon?: string | null;
	color?: string | null;
	show_header?: boolean;
	note?: string | null;
	type?: string;
	position_x?: number;
	position_y?: number;
	width?: number;
	height?: number;
	options?: any | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
	/** @required */
	id: number;
	timestamp?: string | null;
	status?: string | null;
	recipient?: DirectusUser | string;
	sender?: DirectusUser | string | null;
	subject?: string;
	message?: string | null;
	collection?: string | null;
	item?: string | null;
}

export interface DirectusShare {
	/** @required */
	id: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	role?: DirectusRole | string | null;
	password?: string | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	times_used?: number | null;
	max_uses?: number | null;
}

export interface DirectusFlow {
	/** @required */
	id: string;
	name?: string;
	icon?: string | null;
	color?: string | null;
	description?: string | null;
	status?: string;
	trigger?: string | null;
	accountability?: string | null;
	options?: any | null;
	operation?: DirectusOperation | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
	/** @required */
	id: string;
	name?: string | null;
	key?: string;
	type?: string;
	position_x?: number;
	position_y?: number;
	options?: any | null;
	resolve?: DirectusOperation | string | null;
	reject?: DirectusOperation | string | null;
	flow?: DirectusFlow | string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
	/** @required */
	id: string;
	/** @required */
	language: string;
	/** @required */
	key: string;
	/** @required */
	value: string;
}

export interface DirectusVersion {
	/** @required */
	id: string;
	key?: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	hash?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusExtension {
	enabled?: boolean;
	/** @required */
	id: string;
	folder?: string;
	source?: string;
	bundle?: string | null;
}

export interface Schema {
	emails: Email[];
	email_templates: EmailTemplate[];
	event_custom_registration_answers: EventCustomRegistrationAnswer[];
	event_custom_registration_questions: EventCustomRegistrationQuestion[];
	event_emails: EventEmail[];
	event_feedback: EventFeedback[];
	event_globals: EventGlobals;
	event_hosts: EventHost[];
	event_registrations: EventRegistration[];
	events: Event[];
	otp_codes: OtpCode[];
	people: People[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollection[];
	directus_fields: DirectusField[];
	directus_files: DirectusFile[];
	directus_folders: DirectusFolder[];
	directus_migrations: DirectusMigration[];
	directus_permissions: DirectusPermission[];
	directus_policies: DirectusPolicy[];
	directus_presets: DirectusPreset[];
	directus_relations: DirectusRelation[];
	directus_revisions: DirectusRevision[];
	directus_roles: DirectusRole[];
	directus_sessions: DirectusSession[];
	directus_settings: DirectusSettings;
	directus_users: DirectusUser[];
	directus_webhooks: DirectusWebhook[];
	directus_dashboards: DirectusDashboard[];
	directus_panels: DirectusPanel[];
	directus_notifications: DirectusNotification[];
	directus_shares: DirectusShare[];
	directus_flows: DirectusFlow[];
	directus_operations: DirectusOperation[];
	directus_translations: DirectusTranslation[];
	directus_versions: DirectusVersion[];
	directus_extensions: DirectusExtension[];
}
