import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'
import { Role } from '../enum'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as user

      return user.role ? user.role === 'ADMIN' : false;
  }
}
