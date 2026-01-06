import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':userId')
  create(
  @Param('userId', ParseIntPipe) userId: number,
  @Body() dto: CreateTaskDto,
) {
  return this.taskService.createTask(userId, dto);
}


  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')

  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.removeTask(id);
  }
}

