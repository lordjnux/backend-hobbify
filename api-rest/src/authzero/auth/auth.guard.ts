import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private AUTH0_DOMAIN: string;
  private AUTH0_CLIENT_ID: string;
  private AUTH0_SECRET: string;
  private AUTH0_CALLBACK_URL: string;
  private BASE_URL: string;
  private PORT: string;

  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httPContext = context.switchToHttp();
    const request = httPContext.getRequest();
    const pathRequested = request.url;
    const method = request.method;
    const body = request.body;
    const params = request.params;
    const query = request.query;
    const oidc = request.oidc;
    const oidcToken = request.oidc.accessToken;

    console.log('Aplico este guard....!');
    console.log('oidc:');
    console.log(JSON.stringify(oidc));
    console.log('oidc-user:');
    console.log(oidc.user);
    console.log('token:', oidcToken);
    console.log(method, pathRequested, params, query, body);
    // console.log(request);

    return true;
  }
}
