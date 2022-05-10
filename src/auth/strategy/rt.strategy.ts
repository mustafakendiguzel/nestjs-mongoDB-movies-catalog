import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy,ExtractJwt } from "passport-jwt";


@Injectable()
export class  JwtStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret-cat-rt ',
      passReqToCallBack:true,
    });
  }
  async validate(req:Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer','').trim();
    return {
      ...payload,
      refreshToken
    }
  }
}