import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { AuthGuard } from "@nestjs/passport";

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
 
  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User | Object> {
    if(updateUserDto.password == "") return {msg:"Password cannot be empty",status:"error"}
    if(updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password,10)
    }
    return this.userService.updateUser(userId, updateUserDto);
  }


}