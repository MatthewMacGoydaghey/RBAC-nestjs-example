import { IsString } from "class-validator";
import { Role } from "../../../../RBAC-nestjs/src/config";


export class RoleDTO {
  @IsString()
  roleName: Role
}