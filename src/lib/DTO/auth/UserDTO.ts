


import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class UserDTO {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  userName: string
}