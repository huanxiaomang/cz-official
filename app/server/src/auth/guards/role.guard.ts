import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
import { Observable } from 'rxjs'
import { Role } from '../enum'

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    const userRole = typeof user.role === 'string' ? user.role.toUpperCase() : user.role;
    this.logger.debug(`User role: ${userRole}, Required roles: ${requiredRoles?.join(', ')}`);

    if (!user) {
      this.logger.warn('No user found in request');
      return false;
    }
    if (!user.role) {
      this.logger.warn(`User ${user.userId} has no role assigned`);
      return false;
    }
    // 默认只允许ADMIN
    if (!requiredRoles || requiredRoles.length === 0) {
      const isAdmin = userRole === 'ADMIN';
      this.logger.debug(`Default admin check: ${isAdmin}`);
      return isAdmin;
    }
    // 兼容字符串和枚举的角色判断
    const hasRequiredRole = requiredRoles.map(r => r.toString().toUpperCase()).includes(userRole);
    this.logger.debug(`Role check result: ${hasRequiredRole}`);
    return hasRequiredRole;
  }
}
