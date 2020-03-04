import { PrimaryGeneratedColumn ,CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
