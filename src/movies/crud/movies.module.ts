import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "src/auth/auth.controller";
import { Movies, MoviesSchema } from "src/user/schema/user.schema";
import { UserController } from "src/user/user.controller";
import { UserModule } from "src/user/user.module";
import { MoviesController } from "./movies.controller";
import { moviesRepository } from "./movies.repository";
import { MoviesService } from "./movies.service";



@Module({
  imports:[MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),UserModule],
  controllers:[MoviesController],
  providers:[moviesRepository,MoviesService],
  exports:[moviesRepository,MoviesService]
  })

export class MoviesModule{}