import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { userRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { authRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret:'super-secret-cat',
      signOptions:{expiresIn:'1d'}
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, authRepository,UserService,userRepository],
})
export class AuthModule {}
