import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { userRepository } from './user.repository';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,userRepository,JwtStrategy]
})
export class UserModule {}
