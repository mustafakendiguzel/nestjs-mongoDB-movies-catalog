import {  Injectable } from "@nestjs/common";
import { Movies, User } from "src/user/schema/user.schema";
import * as bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import { userRepository } from "src/user/user.repository";
import { UserRoles } from "src/user.roles";
import { Role } from "nest-access-control";
import { moviesRepository } from "./movies.repository";
import { createMovieDTO } from "../dto/createMovie.dt";


@Injectable()
export class MoviesService {

  constructor(private readonly moviesRepository:moviesRepository) {}

  async createMovie(userId:string,name:string,title:string,star:number,description:string) :Promise<Movies | Object> {


    return this.moviesRepository.create({
      movieId:uuidv4(),
      name,
      title,
      star,
      description
    })
  }

  async getAllMovies(): Promise<Movies[]> {    
    return this.moviesRepository.find({})
    
  }
  async getUserById(movieId:string): Promise<Movies> {
    return this.moviesRepository.findOne({movieId})
  }
  
  async updateUser(userId: string, movieUpdates: createMovieDTO): Promise<Movies> {   // 
    return this.moviesRepository.findOneAndUpdate({ userId },movieUpdates);
}

  async deleteUser(movieId:string):Promise<Movies> {
    return this.moviesRepository.deleteOne({movieId})

  }
}