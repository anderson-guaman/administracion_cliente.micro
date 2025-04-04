import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    ClienteModule, 
    SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
