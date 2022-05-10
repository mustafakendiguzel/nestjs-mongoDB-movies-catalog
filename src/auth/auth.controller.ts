import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from "@nestjs/jwt";
import { threadId } from 'worker_threads';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dt';

@Controller('auth')
export class AuthController {
  constructor(private  authService: AuthService,private jwtService:JwtService ) {}
  
  @Post('register')

  async registerUser(@Body() createUserDto:CreateUserDto):Promise<User | Object> { //CreateUser or Register
    const user = this.authService.createUser(createUserDto.name, createUserDto.password, createUserDto.email, createUserDto.role)
    return user
  }

  @Post('login')
  async loginUser(@Body() loginUserDto:LoginUserDto): Promise<User | Object> {
    const user = await  this.authService.login(loginUserDto.email)
    if(!user) throw new UnauthorizedException('User does not exist')
    const match = await bcrypt.compare(loginUserDto.password,user.password)
    if(!match) throw new UnauthorizedException('Password not match')
    return this.jwtSign(user.userId,user.name,user.email,user.role)
  }
  async jwtSign(userId:string,name:string,email:string,role:string): Promise<any> {
    return this.jwtService.sign({userId,name,email,role})
  }
}