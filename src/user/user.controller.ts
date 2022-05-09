import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {}

  
}
