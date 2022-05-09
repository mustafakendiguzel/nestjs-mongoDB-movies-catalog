import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class userRepository {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
   ) {}

   async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
      return await this.userModel.findOne(userFilterQuery);
   }

   async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
      return await this.userModel.find(userFilterQuery);
   }

   
   async findOneAndUpdate(userFilterQuery: FilterQuery<User>,user: Partial<User>,): Promise<User> {
      return await this.userModel.findOneAndUpdate(userFilterQuery, user);
   }

   async deleteOne(userFilterQuery: FilterQuery<User>): Promise<User> {
      return await this.userModel.findOneAndDelete(userFilterQuery);
   }
}
