import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
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

  @Delete(':userId') 
  async deleteUser(@Param('userId') userId:string):Promise<User> {
    return this.userService.deleteUser(userId)
  }

  @Post()
  
 
  @Patch(':userId')

  async updateUser(@Param('userId') userId:string,@Body() updateUserDto:UpdateUserDto):Promise<User> {  
    return this.userService.updateUser(userId,updateUserDto);   // Update user profile with UpdateUserDto properties
  }




}