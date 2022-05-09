import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class userRepository {
   constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

   async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
     return await this.userModel.findOne(userFilterQuery);
   }

  async find(userFilterQuery:FilterQuery<User>): Promise<User[]> {
     return await this.userModel.find(userFilterQuery)
  }

  async create(user:User) : Promise<User | Object> {
     const newUser = new this.userModel(user)
      try {
         return await newUser.save()
      } catch (error) {
         console.log(error)
         return {error:{msg:error.message,status:"error"}}
      }
  }

  async findOneAndUpdate(userFilterQuery:FilterQuery<User>,user: Partial<User>): Promise<User> {
     return await this.userModel.findOneAndUpdate(userFilterQuery,user);
  }
  
  async deleteOne(userFilterQuery:FilterQuery<User>):Promise<User> {
     return await this.userModel.findOneAndDelete(userFilterQuery)
  }
  

}
