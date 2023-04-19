import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/persistence/persistence.module';
import { HTTPModule } from '@/infrastructure/http/http.module';
import { CryptoModule } from './infrastructure/crypto/crypto.module';

@Module({
  imports: [DatabaseModule, HTTPModule, CryptoModule],
})
export class AppModule {}
