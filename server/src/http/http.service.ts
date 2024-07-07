import { Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CustomHttpService implements OnModuleInit {
	private axiosInstance: AxiosInstance;

	onModuleInit() {
		this.axiosInstance = axios.create({
			baseURL: 'https://arc37.amocrm.ru/',
			headers: {
				Authorization: `Bearer ${process.env.accessToken}`,
			},
		});
	}

	get axios() {
		return this.axiosInstance;
	}
}
