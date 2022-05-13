import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CreateMoviesDto } from "src/auth/dto/create-user.dto";
import { Movies } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { createMovieDTO } from "../dto/createMovie.dt";
import { MoviesService } from "./movies.service";


@Controller('movies') 

export class MoviesController {
  constructor(private moviesService:MoviesService,private moviesService2:UserService) {}

  @Post('createMovie')

  async createMovieUser(
    @Body() createUserDto: createMovieDTO,
  ): Promise<Movies | Object> {
    //CreateUser or Register
    const user = this.moviesService.createMovie(
      createUserDto.movieId,
      createUserDto.name,
      createUserDto.title,
      createUserDto.star,
      createUserDto.description
      
     
    );

    return user;
  }

  @Get()
  async getUsers(): Promise<Movies[]> {    // Return All Users
    
    return this.moviesService.getAllMovies();
  }


  @Get(':movieId')
  async getUser(@Param('movieId') movieId:string): Promise<Object | Movies> {   // Return Users by name
    const user = await this.moviesService.getUserById(movieId)
    if(!user) return {msg:"Movie not found",status:"error"};
    return user 
  }

  @Delete(':movieId') 
  async deleteUser(@Param('movieId') movieId:string):Promise<Movies> {
    return this.moviesService.deleteUser(movieId)
  }
  
  @Patch(':movieId')
  async updateUser(@Param('movieId') movieId: string, @Body() updateMoviesDto: createMovieDTO): Promise<Movies | Object> {
 
    return this.moviesService.updateUser(movieId, updateMoviesDto);
  }

}

