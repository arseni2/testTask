import {Injectable} from '@nestjs/common';
import {CustomHttpService} from "./http/http.service";

@Injectable()
export class AppService {
	constructor(
		private httpService: CustomHttpService
	) {

	}

	private TransformToArray(leads: ILead[], pipelines: IPipeline[], users: IUserResponsible[], contacts: IContact[]): any[] {
		// Create a map for quick lookup of pipelines and users
		const pipelineMap = new Map<number, IPipeline>();
		pipelines.forEach(pipeline => {
			pipelineMap.set(pipeline.id, pipeline);
		});

		const userMap = new Map<number, IUserResponsible>();
		users.forEach(user => {
			userMap.set(user.id, user);
		});

		// Transform each lead into the desired format
		const transformedLeads = leads.map(lead => {
			const pipeline = pipelineMap.get(lead.pipeline_id);
			const user = userMap.get(lead.responsible_user_id);

			const transformedLead: any = {
				id: lead.id,
				status_id: lead.status_id,
				pipeline_id: lead.pipeline_id,
				responsible_user_id: lead.responsible_user_id,
				name: lead.name,
				price: lead.price,
				created_by: lead.created_by,
				created_at: lead.created_at,
				contact_id: lead._embedded.companies.length > 0 ? lead._embedded.companies[0].id : null,
				company_id: lead._embedded.companies.length > 0 ? lead._embedded.companies[0].id : null,
				contact: null,
				user: user ? { id: user.id, name: user.name } : null,
				status: pipeline ? { id: lead.status_id, name: pipeline._embedded.statuses.filter((item) => {
						if(item.id == lead.status_id) return true
					})[0].name, color: pipeline._embedded.statuses.filter((item) => {
					if(item.id == lead.status_id) return true
					})[0].color } : null
			};

			if (lead._embedded.companies.length > 0) {
				const company = contacts.filter((item) => item._embedded.companies[0].id == lead._embedded.companies[0].id)[0]
				if(!company) return
				transformedLead.contact = {
					id: lead._embedded.companies[0].id,
					//name: lead._embedded.companies[0].name,
					email: contacts.filter((item) => item._embedded.companies[0].id == lead._embedded.companies[0].id)[0].custom_fields_values[1].values[0].value,  // Add logic to retrieve email if available
					phone: contacts.filter((item) => item._embedded.companies[0].id == lead._embedded.companies[0].id)[0].custom_fields_values[0].values[0].value   // Add logic to retrieve phone if available
				};
			}

			return transformedLead;
		});

		return transformedLeads;
	}

	async Accumulate(query: string): Promise<any> {
		console.log(query)
		const [leadsResponse, statusesResponse, usersResponse, contactsResponse] = await Promise.all([
			this.httpService.axios.get<IApiResponseLeads>(`/api/v4/leads?query=${query || ""}`),
			this.httpService.axios.get<IApiResponseStatuses>('/api/v4/leads/pipelines'),
			this.httpService.axios.get<IApiResponseResponsibleUsers>('/api/v4/users'),
			this.httpService.axios.get<IApiResponseContact>('/api/v4/contacts')
		]);

		if(!leadsResponse.data) {
			return []
		}
		const leads = leadsResponse.data._embedded.leads;
		const pipelines = statusesResponse.data._embedded.pipelines;
		const users = usersResponse.data._embedded.users;
		const contacts = contactsResponse.data._embedded.contacts;


		return this.TransformToArray(leads, pipelines, users, contacts);
	}

}
