import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "../../../../RBAC-nestjs/src/config";



@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number

@Column({unique: true})
userName: string

@Column()
password: string

@Column('text', {array: true})
roles: Role[]
}
