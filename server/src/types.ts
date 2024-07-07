// interface EmbeddedWrapperGeneric<Type> {
// 	_embedded: Type;
// }

interface ILink {
	href: string;
}

interface ILinks {
	self: ILink;
}

interface ILead {
	id: number;
	name: string;
	price: number;
	responsible_user_id: number;
	group_id: number;
	status_id: number;
	pipeline_id: number;
	loss_reason_id: number | null;
	created_by: number;
	updated_by: number;
	created_at: number;
	updated_at: number;
	closed_at: number | null;
	closest_task_at: number | null;
	is_deleted: boolean;
	custom_fields_values: any | null; // Replace 'any' with the specific type if known
	score: any | null; // Replace 'any' with the specific type if known
	account_id: number;
	labor_cost: any | null; // Replace 'any' with the specific type if known
	_links: ILinks
	_embedded: {
		tags: Array<any>; // Replace 'any' with the specific type if known
		companies: Array<ICompany>;
	};
}

interface ICompany {
	id: number;
	_links: ILinks
}

interface IStatus {
	id: number;
	name: string;
	sort: number;
	is_editable: boolean;
	pipeline_id: number;
	color: string;
	type: number;
	account_id: number;
	_links: ILinks;
}

interface IPipeline {
	id: number;
	name: string;
	sort: number;
	is_main: boolean;
	is_unsorted_on: boolean;
	is_archive: boolean;
	account_id: number;
	_links: ILinks;
	_embedded: { statuses: Array<IStatus> };
}

//разрешения могут измениться
interface IPermission {
	view?: string;
	edit?: string;
	add?: string;
	delete?: string;
	export?: string;
}

interface IStatusRight {
	entity_type: string;
	pipeline_id: number;
	status_id: number;
	rights: IPermission;
}

interface ICatalogRight {
	catalog_id: number;
	rights: IPermission;
}

interface IRights {
	leads: IPermission;
	contacts: IPermission;
	companies: IPermission;
	tasks: IPermission;
	mail_access: boolean;
	catalog_access: boolean;
	files_access: boolean;
	status_rights: Array<IStatusRight>;
	catalog_rights: Array<ICatalogRight>;
	custom_fields_rights: any | null; // Replace 'any' with specific type if known
	oper_day_reports_view_access: boolean;
	oper_day_user_tracking: boolean;
	is_admin: boolean;
	is_free: boolean;
	is_active: boolean;
	group_id: any | null; // Replace 'any' with specific type if known
	role_id: any | null; // Replace 'any' with specific type if known
}

interface IUserResponsible {
	id: number;
	name: string;
	email: string;
	lang: string;
	rights: IRights;
	_links: ILinks;
}

interface IContact {
	id: number;
	name: string;
	first_name: string;
	last_name: string;
	responsible_user_id: number;
	group_id: number;
	created_by: number;
	updated_by: number;
	created_at: number;
	updated_at: number;
	closest_task_at: number | null;
	is_deleted: boolean;
	is_unsorted: boolean;
	custom_fields_values: CustomFieldValue[];
	account_id: number;
	_links: ILinks;
	_embedded: {
		tags: any[];
		companies: ICompany[];
	};
}

interface CustomFieldValue {
	field_id: number;
	field_name: string;
	field_code: string;
	field_type: string;
	values: {
		value: string;
		enum_id: number;
		enum_code: string;
	}[];
}

//API - Ответы
interface IDefaultApiResponse {
	_page: number;
	_links: ILinks;
}
interface IApiResponseContact extends IDefaultApiResponse {
	_embedded: { contacts: IContact[] };
}
interface IApiResponseResponsibleUsers extends IDefaultApiResponse {
	_embedded: { users: IUserResponsible[] };
	_page_count: number;
	_total_items: number;
}
interface IApiResponseStatuses extends Omit<IDefaultApiResponse, "_page"> {
	_total_items: number;
	_embedded: { pipelines: IPipeline[] }
}
interface IApiResponseLeads extends IDefaultApiResponse {
	_embedded: { leads: ILead[] }
}