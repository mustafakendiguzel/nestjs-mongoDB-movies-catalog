import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/crud/movies.module';
import { UserService } from './user/user.service';
import { MoviesService } from './movies/crud/movies.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MoviesModule,
    MongooseModule.forRoot('mongodb://localhost/nest_test7', {
      autoCreate: true,
    }),
   
  ],
  controllers:[AppController],
  providers:[AppService,MoviesService]
  
})
export class AppModule {

}
