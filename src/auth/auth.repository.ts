import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class authRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  
  async create(user: User): Promise<User | Object> {
    const newUser = new this.userModel(user);

    try {
       return await newUser.save();
    } catch (error) {
       console.log(error);
       return { error: { msg: error.message, status: 'error' } };
    }
 }
 async findByMail(userFilterQuery: FilterQuery<User>): Promise<User> {
  return await this.userModel.findOne(userFilterQuery);
}
 
}