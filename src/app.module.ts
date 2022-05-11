import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { roles } from './user.roles';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest_test7', {
      autoCreate: true,
    }),
    AccessControlModule.forRoles(roles)
  ],
  controllers:[AppController],
  providers:[AppService]
  
})
export class AppModule {

}
