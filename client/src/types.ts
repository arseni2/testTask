interface IContact {
	id: number;
	email: string;
	phone: string;
}

interface IUser {
	id: number;
	name: string;
}

interface IStatus {
	id: number;
	name: string;
	color: string;
}

export interface IData {
	id: number;
	status_id: number;
	pipeline_id: number;
	responsible_user_id: number;
	name: string;
	price: number;
	created_by: number;
	created_at: number;
	contact_id: number;
	company_id: number;
	contact: IContact;
	user: IUser;
	status: IStatus;
}