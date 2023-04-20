/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { Todo } from 'src/typeorm/entities/Todo';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  CreateUserTodoParams,
  EditUserParams,
  EditUserTodoParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // Get users
  async getUsers(username: string) {
    return await this.userRepository.find({
      where: { username: username },
      relations: ['profile', 'posts', 'todos'],
    });
  }

  // Create user
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  // Edit user
  editUser(id: number, userDetails: EditUserParams) {
    return this.userRepository.update(
      { id },
      {
        ...userDetails,
      },
    );
  }

  // Delete user
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  // Search users by name
  // async searchUserByName(username: string): Promise<User[]> {
  //   return await this.userRepository.find({
  //     where: { username: username },
  //   });
  // }

  // Create user profile
  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        `User ${id} not found cannot create profile`,
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  // Create a user post
  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        `User ${id} does not exist cannot create a post`,
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

  // Create a user todo
  async createUserTodo(
    id: number,
    createUserTodoDetails: CreateUserTodoParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        `User ${id} does not exist cannot create a todo`,
        HttpStatus.BAD_REQUEST,
      );
    const newTodo = this.todoRepository.create({
      ...createUserTodoDetails,
      user,
    });
    return this.todoRepository.save(newTodo);
  }

  // Edit a user todo
  async editUserTodo(
    id: number,
    todoid: number,
    editUserTodoDetails: EditUserTodoParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        `User ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const todo = await this.todoRepository.findOneBy({ id: todoid });
    if (!todo)
      throw new HttpException(
        `Todo ${todoid} does not exist cannot edit`,
        HttpStatus.BAD_REQUEST,
      );
    return this.todoRepository.update(
      { id: todoid },
      { ...editUserTodoDetails },
    );
  }

  // Delete a user todo
  async deleteUserTodo(id: number, todoid: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        `User ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const todo = await this.todoRepository.findOneBy({ id: todoid });
    if (!todo)
      throw new HttpException(
        `Todo ${todoid} does not exist cannot edit`,
        HttpStatus.BAD_REQUEST,
      );
    return this.todoRepository.delete({ id: todoid });
  }
}
