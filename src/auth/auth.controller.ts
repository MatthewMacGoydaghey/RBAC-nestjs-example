import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from '../lib/DTO/auth/auth.dto';
import { Public } from 'src/lib/DTO/auth/constants';
import { RoleDTO } from '../lib/DTO/auth/role.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService
  ) {}




  @Public()
  @Post('/reg')
  regUser(@Body() body: AuthDTO) {
    return this.AuthService.regUser(body)
  }


  @Public()
  @Post()
  login(@Body() body: AuthDTO) {
    return this.AuthService.login(body)
  }


  @Put(':id')
  grantRole(@Param('id') id: number, @Body() role: RoleDTO) {
    return this.AuthService.grantRole(id, role)
  }
}
