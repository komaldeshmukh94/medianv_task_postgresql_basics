import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createTask(userId: number, dto: CreateTaskDto) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const task = this.taskRepo.create({
      title: dto.title,
      user,
    });

    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    await this.taskRepo.update(id, dto);
    return this.findOne(id);
  }


  removeTask(id: number) {
    return this.taskRepo.delete(id);
  }
}
