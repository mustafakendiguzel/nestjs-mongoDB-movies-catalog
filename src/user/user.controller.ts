import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':name')
  
  async getUser(@Param('name') name:string): Promise<User> {
    return this.userService.getUserById(name)
  }
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Post()
  
  async createUser(@Body() createUserDto:CreateUserDto):Promise<User> {
    return this.userService.createUser(createUserDto.name,createUserDto.password,createUserDto.email)
  }
  @Patch(':name')

  async updateUser(@Param('name') name:string,@Body() updateUserDto:UpdateUserDto):Promise<User> {
    return this.userService.updateUser(name,updateUserDto);
  }
}