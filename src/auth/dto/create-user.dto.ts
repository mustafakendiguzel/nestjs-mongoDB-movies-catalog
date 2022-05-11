import { Role } from "nest-access-control";
import { UserRoles } from "src/user.roles";

export class CreateMoviesDto {
  name: string;
  title:string;
  description:string;
}

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role:UserRoles;
  favMovies: CreateMoviesDto;

};