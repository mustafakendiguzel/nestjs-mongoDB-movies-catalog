import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { userRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository:userRepository) {}

  async getUserById(name:string): Promise<User> {
    return this.userRepository.findOne({name})
  }
  
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({})
  }

  async createUser(name:string,password:string,email:string) :Promise<User> {
    return this.userRepository.create({
      name,
      password,
      email
    })}
  async updateUser(name:string,userUpdates:UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({name},userUpdates)
  }  
}
