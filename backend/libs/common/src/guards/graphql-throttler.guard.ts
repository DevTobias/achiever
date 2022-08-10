import { ExecutionContext, Injectable } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GraphQLThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    return { req: ctx.req, res: ctx.reply };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(
      this.reflector.get<boolean>('disableThrottler', context.getHandler()),
    );

    return !this.reflector.get<boolean>(
      'disableThrottler',
      context.getHandler(),
    );
  }
}

export const globalGraphQlThrottlerGuard = {
  provide: APP_GUARD,
  useClass: GraphQLThrottlerGuard,
};