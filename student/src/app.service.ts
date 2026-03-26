import { Injectable } from '@nestjs/common';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  grade: number;
  field: 'informatique' | 'mathématiques' | 'physique' | 'chimie';
}

@Injectable()
export class StudentsService {
  // Stockage en mémoire
  private students: Student[] = [];
  private currentId = 1;

  constructor() {
    // Appelle du reset au démarrage pour avoir nos 5 étudiants
    this.resetData(); 
  }

  // Fonction de reset exigée
  resetData() {
    this.currentId = 6;
    this.students = [
      { id: 1, firstName: 'Jean', lastName: 'Dupont', email: 'jean@test.fr', grade: 15, field: 'informatique' },
      { id: 2, firstName: 'Marie', lastName: 'Curie', email: 'marie@test.fr', grade: 20, field: 'physique' },
      { id: 3, firstName: 'Alan', lastName: 'Turing', email: 'alan@test.fr', grade: 19, field: 'mathématiques' },
      { id: 4, firstName: 'Ada', lastName: 'Lovelace', email: 'ada@test.fr', grade: 18, field: 'informatique' },
      { id: 5, firstName: 'Walter', lastName: 'White', email: 'walter@test.fr', grade: 12, field: 'chimie' },
    ];
  }

  // Fonctions CRUD
  create(createStudentDto: any) { return 'This action adds a new student'; }
  findAll() { return this.students; }
  findOne(id: number) { return `This action returns a #${id} student`; }
  update(id: number, updateStudentDto: any) { return `This action updates a #${id} student`; }
  remove(id: number) { return `This action removes a #${id} student`; }
}