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
  async getUser(@Param('userId') userId:string): Promise<Object | User> {   // Return Users by name
    const user = await this.userService.getUserById(userId)
    if(!user) return {msg:"User not found",status:"error"};
    return user
  }

  @Get()
  async getUsers(): Promise<User[]> {    // Return All Users
    return this.userService.getAllUsers();
  }

  @Post()
  
  async createUser(@Body() createUserDto:CreateUserDto):Promise<User | Object> {
    // Create User with createUserDto Properties
    const user = await this.userService.createUser(createUserDto.name,createUserDto.password,createUserDto.email)
    return user
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