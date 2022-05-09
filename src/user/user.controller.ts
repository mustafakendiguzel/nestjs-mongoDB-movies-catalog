import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':userId')
  async getUser(@Param('userId') userId:string): Promise<User> {   // Return Users by name
    return this.userService.getUserById(userId)
  }

  @Get()
  async getUsers(): Promise<User[]> {    // Return All Users
    return this.userService.getAllUsers();
  }

  @Post()
  
  async createUser(@Body() createUserDto:CreateUserDto):Promise<User> {     // Create User with createUserDto Properties
    return this.userService.createUser(createUserDto.name,createUserDto.password,createUserDto.email)
  }
  @Patch(':userId')

  async updateUser(@Param('userId') userId:string,@Body() updateUserDto:UpdateUserDto):Promise<User> {  // Update user with UpdateUserDto properties
    return this.userService.updateUser(userId,updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId:string):Promise<User> {
    return this.userService.deleteUser(userId)
  }
}