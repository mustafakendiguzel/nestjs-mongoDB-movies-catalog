import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MovieDocument, Movies } from 'src/user/schema/user.schema';

@Injectable()
export class moviesRepository {
  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async create(movie: Movies): Promise<Movies | Object> {
    const newUser = new this.movieModel(movie);

    try {
      return await newUser.save();
    } catch (error) {
      console.log(error);
      return { error: { msg: error.message, status: 'error' } };
    }
  }

  async find(userFilterQuery: FilterQuery<Movies>): Promise<Movies[]> {
    return await this.movieModel.find(userFilterQuery);
  }

  async findOne(userFilterQuery: FilterQuery<Movies>): Promise<Movies> {
    return await this.movieModel.findOne(userFilterQuery);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<Movies>,
    movie: Partial<Movies>,
  ): Promise<Movies> {
    return this.movieModel.findOneAndUpdate(userFilterQuery, movie, {
      new: true,
    });
  }

  async deleteOne(userFilterQuery: FilterQuery<Movies>): Promise<Movies> {
    return await this.movieModel.findOneAndDelete(userFilterQuery);
  }
}
