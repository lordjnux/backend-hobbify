import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from './roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      console.log('Required Roles:', requiredRoles);
    console.log('User Roles:', user.roles);

      if (!user || !user.roles) {
        throw new ForbiddenException('You do not have permission to access1');
      }
  
      const hasRole = () =>
        requiredRoles.some((role) => user.roles.includes(role));

      console.log(user.roles);
  
      if (!hasRole()) {
      throw new ForbiddenException('You do not have permission to access');
    }

    return true;
    }
  }