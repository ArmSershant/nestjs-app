/* eslint-disable prettier/prettier */
// User
export type CreateUserParams = {
  username: string;
  password: string;
};

export type EditUserParams = {
  username: string;
  password: string;
};

// Profile
export type CreateUserProfileParams = {
  firstname: string;
  lastname: string;
  age: number;
  dob: string;
};

// Post
export type CreateUserPostParams = {
  title: string;
  description: string;
};

// Todo
export type CreateUserTodoParams = {
  title: string;
  isCompleted: boolean;
};

export type EditUserTodoParams = {
  title: string;
  isCompleted: boolean;
};