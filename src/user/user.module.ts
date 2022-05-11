import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { userRepository } from './user.repository';
import { JwtStrategy } from 'src/auth/strategy/at.strategy';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/user.roles';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),AccessControlModule.forRoles(roles)],
  controllers: [UserController],
  providers: [UserService,userRepository,JwtStrategy],
  exports: [UserService, JwtStrategy]
})
export class UserModule {}
