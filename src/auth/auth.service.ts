import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/schema/user.schema";
import {bcrypt} from 'bcrypt'
import { from, Observable, of } from "rxjs";

@Injectable({})
export class AuthService {
  constructor(private readonly jwtService:JwtService) {}

  generateJWT(user:User): Promise<string> {
    return this.jwtService.signAsync({user});
  }

  hashPassword(password:string): Observable<string> {
    return from<string>(bcrypt.hash(password,10))
  }

  comparePassword(newPassword:string,passwordHash:string): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword,passwordHash))
   
  }
}
