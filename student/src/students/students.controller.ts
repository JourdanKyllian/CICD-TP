import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { StudentsService, Student } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel étudiant' })
  @ApiResponse({
    status: 201,
    description: 'Étudiant créé avec succès',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer la liste des étudiants (avec tri et pagination)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: '1',
    description: 'Numéro de la page',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: '10',
    description: "Nombre d'éléments par page",
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    example: 'grade',
    description: 'Champ pour le tri (grade, firstName...)',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sens du tri',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des étudiants retournée',
    type: [Student],
  })
  findAll(@Query() query: any) {
    return this.studentsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtenir les statistiques globales' })
  @ApiResponse({ status: 200, description: 'Statistiques calculées' })
  getStats() {
    return this.studentsService.getStats();
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des étudiants par nom ou prénom' })
  @ApiQuery({ name: 'q', required: true, description: 'Terme de recherche' })
  @ApiResponse({ status: 200, type: [Student] })
  search(@Query('q') q: string) {
    return this.studentsService.search(q);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un étudiant par son ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: Student })
  @ApiResponse({ status: 404, description: 'Étudiant non trouvé' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier un étudiant existant' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: Student })
  update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un étudiant' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Message de confirmation' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
