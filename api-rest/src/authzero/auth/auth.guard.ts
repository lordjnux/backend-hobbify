import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httPContext = context.switchToHttp();
    const request = httPContext.getRequest();
    // const pathRequested = request.url;
    // const method = request.method;
    // const body = request.body;
    // const params = request.params;
    // const query = request.query;
    // const oidc = request.oidc;
    // const oidcToken = request.oidc.accessToken;

    //! PENDING: Sincronizar con equipo de frontend para la config de auth0 allá
    //! variables de 
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // console.log('Aplico este guard....!');
    // console.log('oidc:');
    // console.log(JSON.stringify(oidc));
    // console.log('oidc-user:');
    // console.log(oidc.user);
    // console.log('token:', oidcToken);
    // console.log(method, pathRequested, params, query, body);
    // console.log(request);

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.AUTH0_SECRET);
      console.log('Decoded JWT:', decoded);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
