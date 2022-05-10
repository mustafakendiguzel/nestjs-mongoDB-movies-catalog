import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schema/user.schema';
import { userRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(private readonly userRepository:userRepository) {}

  async getUserById(userId:string): Promise<User> {
    return this.userRepository.findOne({userId})
  }
  
  async getAllUsers(): Promise<User[]> {    
    return this.userRepository.find({})
    
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {   // 
    return this.userRepository.findOneAndUpdate({ userId },userUpdates);
}

  async deleteUser(userId:string):Promise<User> {
    return this.userRepository.deleteOne({userId})

  }

  

}
