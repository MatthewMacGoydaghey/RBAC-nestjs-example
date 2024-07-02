import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity()
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  title: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn()
  author: User
}