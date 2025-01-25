import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserEntity, [
  'firstName',
  'middleName',
  'lastName',
  'email',
]) {
  @IsString()
  @ApiProperty({ type: String })
  profilePhoto: string;

  @IsString()
  @ApiProperty({ type: String, nullable: true, required: false })
  bio?: string | null;
}
