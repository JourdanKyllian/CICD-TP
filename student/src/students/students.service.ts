import { Injectable, NotFoundException } from '@nestjs/common';

// 1. Le Modèle de données strict demandé dans la consigne
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
  // PAS DE BASE DE DONNÉES : Stockage en mémoire
  private students: Student[] = [];
  private currentId = 1;

  constructor() {
    // On appelle le reset au démarrage pour avoir nos 5 étudiants
    this.resetData(); 
  }

  // 2. La fonction de reset exigée (cruciale pour les tests plus tard)
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

  // --- Fonctions CRUD (On mettra la logique de l'Étape 4 ici juste après) ---
  create(createStudentDto: any) { return 'This action adds a new student'; }
  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.students.find(s => s.id === id);
    if (!student) throw new NotFoundException(`Étudiant ${id} non trouvé`);
    return student;
  }
  update(id: number, updateStudentDto: any) { return `This action updates a #${id} student`; }
  remove(id: number) { return `This action removes a #${id} student`; }
}
