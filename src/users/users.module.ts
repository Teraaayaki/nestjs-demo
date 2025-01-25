import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [], // Import other modules if needed
  controllers: [UsersController], // Declare controllers in this module
  providers: [UsersService], // Declare services/providers
  exports: [UsersService], // Make UsersService available to other modules
})
export class UsersModule {}
