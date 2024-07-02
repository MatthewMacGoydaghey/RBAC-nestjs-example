import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../lib/DTO/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/lib/guards/authGuard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'SECRET_KEY',
    signOptions: {
      expiresIn: '1h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [AuthService]
})
export class AuthModule {}