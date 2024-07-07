import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiQuery} from "@nestjs/swagger";

@Controller("api")
export class AppController {
	constructor(
		private readonly appService: AppService,
	) {
	}

	@ApiQuery({
		name: "term",
		type: String,
		description: "Параметр не обязателен",
		required: false
	})
	@Get("accumulate")
    Accumulate(@Query("query") query: string): any {
		return this.appService.Accumulate(query);
	}
}
