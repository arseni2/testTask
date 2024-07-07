// src/http/http.module.ts

import { Module } from '@nestjs/common';
import { CustomHttpService } from './http.service';

@Module({
	providers: [CustomHttpService],
	exports: [CustomHttpService],
})
export class HttpModule {}
