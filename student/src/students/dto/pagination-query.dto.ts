import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: '1', description: 'Numéro de la page' })
  page?: string;

  @ApiPropertyOptional({ example: '10', description: 'Nombre d\'éléments par page' })
  limit?: string;

  @ApiPropertyOptional({ example: 'grade', description: 'Champ pour le tri (grade, firstName...)' })
  sort?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], description: 'Sens du tri' })
  order?: 'asc' | 'desc';
}