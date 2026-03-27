import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'Kyllian' })
  firstName: string;
  @ApiProperty({ example: 'Jourdan' })
  lastName: string;
  @ApiProperty({ example: 'kj@test.fr' })
  email: string;
  @ApiProperty({ example: 18 })
  grade: number;
  @ApiProperty({
    example: 'informatique',
    enum: ['informatique', 'mathématiques', 'physique', 'chimie'],
  })
  field: 'informatique' | 'mathématiques' | 'physique' | 'chimie';
}
