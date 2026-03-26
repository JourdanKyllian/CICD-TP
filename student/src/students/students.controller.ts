import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Put, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentsService.create(data);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new BadRequestException("L'ID doit être un nombre valide");
    return this.studentsService.findOne(numericId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new BadRequestException("L'ID doit être un nombre valide");
    return this.studentsService.update(numericId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new BadRequestException("L'ID doit être un nombre valide");
    return this.studentsService.remove(numericId);
  }

  @Get('stats')
  getStats() {
    return this.studentsService.getStats();
  }

  @Get('search')
  search(@Query('q') q: string) {
    if (!q || q.trim() === '') {
      throw new BadRequestException('Le paramètre de recherche "q" est obligatoire');
    }
    return this.studentsService.search(q);
  }
}
