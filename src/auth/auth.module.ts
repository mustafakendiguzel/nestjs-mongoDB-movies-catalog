import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthController } from './auth.controller';
import { authRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret:'super-secret-cat'
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, authRepository],
})
export class AuthModule {}
