/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '0' })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
