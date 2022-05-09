import {  Injectable } from "@nestjs/common";
import { User } from "src/user/schema/user.schema";
import * as bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import { authRepository } from "./auth.repository";
import { userRepository } from "src/user/user.repository";

@Injectable({})
export class AuthService {

  constructor(private readonly authRepository:authRepository) {}

  async createUser(name:string,password:string,email:string,role:string) :Promise<User | Object> {

    if(!password) return {error:{msg:"Password value should be!",status:"error"}}
    const newPassword = await bcrypt.hash(password, 10);

    return this.authRepository.create({
      userId:uuidv4(),
      name,
      password:newPassword,
      email,
      role      
    })
  }
    
  async login(email:string): Promise<User> {
    return this.authRepository.findByMail({email})
  }
}

