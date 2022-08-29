import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from '@trophoria/modules/auth/boundary/auth.resolver';
import { AuthDatabaseService } from '@trophoria/modules/auth/business/auth-database.service';
import { AuthServiceSymbol } from '@trophoria/modules/auth/business/auth.service';
import { LocalStrategy } from '@trophoria/modules/auth/business/strategies/local.strategy';
import { UserModule } from '@trophoria/modules/user/user.module';

/**
 * This module handles user authentication and exports various functions
 * and decorator to protect routes.
 */
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { algorithm: 'ES256', issuer: 'https://trophoria.com' },
    }),
  ],
  providers: [
    { provide: AuthServiceSymbol, useClass: AuthDatabaseService },
    AuthResolver,
    LocalStrategy,
  ],
  exports: [AuthServiceSymbol],
})
export class AuthModule {}