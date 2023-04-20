/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserTodoDetails } from 'src/users/details/todoDetails/createTodo.detail';
import { CreateUserDetail } from 'src/users/details/userDetails/createUser.detail';
import { CreateUserPostDetails } from 'src/users/details/postDetails/createUserPost.details';
import { CreateUserProfileDetails } from 'src/users/details/profileDetails/createUserProfile.details';
import { EditUserDetail } from 'src/users/details/userDetails/editUser.details';
import { EditUserTodoDetails } from 'src/users/details/todoDetails/editUserTodo.details';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get users
  @Get()
  async getUsers(@Query('username') username: string) {
    const users = await this.usersService.getUsers(username);
    return users;
  }

  // Create user
  @Post()
  createUser(@Body() createUserDetail: CreateUserDetail) {
    this.usersService.createUser(createUserDetail);
  }

  // Edit user
  @Put(':id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDetail: EditUserDetail,
  ) {
    await this.usersService.editUser(id, editUserDetail);
  }

  // Delete user
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  // Profile

  // Create a user profile
  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDetails: CreateUserProfileDetails,
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDetails);
  }

  // Post

  // Create a post
  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDetails: CreateUserPostDetails,
  ) {
    return this.usersService.createUserPost(id, createUserPostDetails);
  }

  // 'TODO

  // Create a todo
  @Post(':id/todos')
  createUserTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserTodoDetails: CreateUserTodoDetails,
  ) {
    return this.usersService.createUserTodo(id, createUserTodoDetails);
  }

  // Edit a todo
  @Put(':id/todos/:todoid')
  editUserTodo(
    @Param('id', ParseIntPipe) id: number,
    @Param('todoid', ParseIntPipe) todoid: number,
    @Body() editUserTodoDetails: EditUserTodoDetails,
  ) {
    return this.usersService.editUserTodo(id, todoid, editUserTodoDetails);
  }

  // Delete a todo
  @Delete(':id/todos/:todoid')
  deleteUserTodo(
    @Param('id', ParseIntPipe) id: number,
    @Param('todoid', ParseIntPipe) todoid: number,
  ) {
    return this.usersService.deleteUserTodo(id, todoid);
  }
}
