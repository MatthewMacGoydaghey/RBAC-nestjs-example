import { BadRequestException, ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../lib/DTO/auth/user.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from '../lib/DTO/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleDTO } from '../lib/DTO/auth/role.dto';
import { rbacManager } from '../../RBAC-nestjs/src/rbacManager';


@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly UsersRepository: Repository<User>,
    private jwtSerice: JwtService
  ) {}


  async regUser(body: AuthDTO) {
    const {userName, password} = body
    const userExists = await this.UsersRepository.findOneBy({userName: userName})
    if (userExists) {
      throw new BadRequestException({Message: `User ${userName} already exists`})
    }
    const newUser = new User()
    newUser.password = password
    newUser.userName = userName
    newUser.roles = ['user']
    return this.UsersRepository.save(newUser)
  }


  async login(body: AuthDTO) {
    const {userName, password} = body
    const foundUser = await this.UsersRepository.findOneBy({userName: userName})
    if (!foundUser) {
      throw new NotFoundException({Message: `User ${userName} not found`})
    }
    if (!(password === foundUser.password)) {
      throw new ForbiddenException({Message: `Incorrect password`})
    }
    const payload = {
      id: foundUser.id,
      roles: foundUser.roles
    }
    const token = this.jwtSerice.sign(payload)
    return token
  }


  async grantRole(userID: number, role: RoleDTO) {
    const foundUser = await this.findUser(userID)
    foundUser.roles.push(role.roleName)
    const savedUser = await this.UsersRepository.save(foundUser)
    return savedUser
  }


  async findUser(id: number) {
    const foundUser = await this.UsersRepository.findOneBy({id: id})
    if (!foundUser) {
      throw new NotFoundException({message: 'User not found'})
    }
    return foundUser
  }


  async onModuleInit() {

    rbacManager
    .insertRole('user')
    .grantAccess([{
      resource: 'articles',
      actions: [['read', 'any']]
    }])
    .insertRole('editor')
    .grantAccess([{
      resource: 'articles',
      actions: [['read', 'any'], ['create', 'any'], ['update', 'own'], ['delete', 'own']]
    }])
    .insertRole('admin')
    .grantAccess([{
      resource: 'articles',
      actions: [['all', 'any']]
    }, {
      resource: 'users',
      actions: [['all', 'any']]
    }])

    const foundAdmin = await this.UsersRepository.findOneBy({userName: 'admin'})
    if (foundAdmin) {
    console.log(`Admin userName: ${foundAdmin.userName}, password: ${foundAdmin.password}`)
    return
  }
    const newAdmin = new User()
    newAdmin.password = 'admin'
    newAdmin.userName = 'admin'
    newAdmin.roles = ['admin']
    this.UsersRepository.save(newAdmin)
    console.log(`Admin userName: ${newAdmin.userName}, password: ${newAdmin.password}`)
  }
}
