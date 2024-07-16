import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwksClient: jwksRsa.JwksClient;

  constructor() {
    this.jwksClient = jwksRsa({
      jwksUri:
        'https://dev-an01z5v77lpyd1r3.us.auth0.com/.well-known/jwks.json',
    });
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const authHeader = request.headers.authorization;
    console.log('header:', authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    console.log('token:', token);

    return true;

  }

  private async validateToken(token: string): Promise<any> {
    console.log('validateToken...');
    const decodedToken: any = jwt.decode(token, { complete: true });
    console.log('decodedToken:', decodedToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const key = await this.getSigningKey(decodedToken.header.kid);
    return new Promise((resolve, reject) => {
      jwt.verify(token, key, { algorithms: ['RS256'] }, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  private getSigningKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwksClient.getSigningKey(kid, (error, key) => {
        if (error) {
          reject(error);
        } else {
          const signingKey = key.getPublicKey();
          resolve(signingKey);
        }
      });
    });
  }
}
