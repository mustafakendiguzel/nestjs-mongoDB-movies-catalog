import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { userRepository } from './user.repository';
import {v4 as uuidv4} from 'uuid'
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly userRepository:userRepository) {}

  async getUserById(userId:string): Promise<User> {
    return this.userRepository.findOne({userId})
  }
  
  async getAllUsers(): Promise<User[]> {    
    return this.userRepository.find({})
    
  }

  async createUser(name:string,password:string,email:string) :Promise<User | Object> {
    const newPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      userId:uuidv4(),
      name,
      password:newPassword,
      email
    })}
  async updateUser(userId:string,userUpdates:UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({userId},userUpdates)
  }  

  async deleteUser(userId:string):Promise<User> {
    return this.userRepository.deleteOne({userId})
  }

}
