import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserEntity {
  @IsString()
  @ApiProperty({ type: String })
  id: UserModel['id'];

  @IsString()
  @ApiProperty({ type: String })
  firstName: UserModel['firstName'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false, nullable: true })
  middleName: UserModel['middleName'];

  @IsString()
  @ApiProperty({ type: String })
  lastName: UserModel['lastName'];

  @IsEmail()
  @ApiProperty({ type: String })
  email: UserModel['email'];
}
