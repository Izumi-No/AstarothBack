import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/persistence/persistence.module';
import { HTTPModule } from './infrastructure/http/http.module';

@Module({
  imports: [DatabaseModule, HTTPModule],
})
export class AppModule {}
