import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dt';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | Object> {
    //CreateUser or Register
    const user = this.authService.createUser(
      createUserDto.name,
      createUserDto.password,
      createUserDto.email,
      createUserDto.role,
      createUserDto.favMovies,
    );

    return user;
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User | Object> {
    const user = await this.authService.login(loginUserDto.email);
    if (!user) throw new UnauthorizedException('User does not exist');
    const match = await bcrypt.compare(loginUserDto.password, user.password);
    if (!match) throw new UnauthorizedException('Password not match');
    const jwt = await this.jwtSign(user.userId, user.name);
    response.cookie('jwt', jwt, {
      expires: new Date(Date.now() + 60000),
      httpOnly: true,
    });
    return {
      message: 'Login Success',
    };
  }
  async jwtSign(userId: string, name: string): Promise<any> {
    return this.jwtService.signAsync({ userId, name });
  }
  
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { msg: 'logout success' };
  }
}
