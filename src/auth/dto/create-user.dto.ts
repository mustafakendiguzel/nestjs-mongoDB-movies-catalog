export class CreateMoviesDto {
  name: string;
  title:string;
  description:string;
}

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role:string;
  favMovies: CreateMoviesDto;

};