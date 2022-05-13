import { Injectable, CanActivate, ExecutionContext, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/user.roles';

@Injectable()
export  class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const reqiureRoles = this.reflector.getAllAndOverride<UserRoles[]>('roles',[
      context.getHandler(),
      context.getClass(),
    ]);
    try {
      if(!reqiureRoles) return true
    const {user} = context.switchToHttp().getRequest()
    console.log(user)
    // reqiureRoles.some((role)=> user.role.includes(role));
    return reqiureRoles.some((role)=> user.role?.includes(role))
    } catch (error) {
      return error
    }

  }
}
