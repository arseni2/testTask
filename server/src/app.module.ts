import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "./http/http.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		HttpModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
