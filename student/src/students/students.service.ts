import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

// Modèle de données
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

  // La fonction de reset exigée
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

  // Fonctions CRUD + LOGIQUE DE VALIDATION
  private validatePayload(data: any, currentStudentId?: number) {
    if (!data.firstName || !data.lastName || !data.email || data.grade === undefined || !data.field) {
      throw new BadRequestException('Tous les champs sont obligatoires');
    }
    if (data.firstName.length < 2 || data.lastName.length < 2) {
      throw new BadRequestException('Prénom et nom : min 2 caractères');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new BadRequestException('Format email invalide');
    }
    if (data.grade < 0 || data.grade > 20) {
      throw new BadRequestException('La note doit être entre 0 et 20');
    }
    const validFields = ['informatique', 'mathématiques', 'physique', 'chimie'];
    if (!validFields.includes(data.field)) {
      throw new BadRequestException('Filière non autorisée');
    }
    const emailExists = this.students.find(s => s.email === data.email && s.id !== currentStudentId);
    if (emailExists) {
      throw new ConflictException('Cet email est déjà pris');
    }
  }

  create(data: any) {
    this.validatePayload(data);
    const newStudent = { ...data, id: this.currentId++ };
    this.students.push(newStudent);
    return newStudent;
  }
  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.students.find(s => s.id === id);
    if (!student) throw new NotFoundException(`Étudiant ${id} non trouvé`);
    return student;
  }
  update(id: number, data: any) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) throw new NotFoundException(`Étudiant ${id} non trouvé`);
    
    this.validatePayload(data, id);
    this.students[index] = { ...data, id };
    return this.students[index];
  }

  remove(id: number) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) throw new NotFoundException(`Étudiant ${id} non trouvé`);
    this.students.splice(index, 1);
    return { message: `Étudiant ${id} supprimé avec succès` };
  }

  // Fonction de statistiques
  getStats() {
    const totalStudents = this.students.length;
    if (totalStudents === 0) return { totalStudents: 0, averageGrade: 0, studentsByField: {}, bestStudent: null };

    const sumGrades = this.students.reduce((acc, s) => acc + s.grade, 0);
    const averageGrade = parseFloat((sumGrades / totalStudents).toFixed(2));

    const studentsByField = this.students.reduce((acc, s) => {
      acc[s.field] = (acc[s.field] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bestStudent = [...this.students].sort((a, b) => b.grade - a.grade)[0].grade;

    return { totalStudents, averageGrade, studentsByField, bestStudent };
  }

  search(q: string) {
    const lowerQ = q.toLowerCase();
    return this.students.filter(s => 
      s.firstName.toLowerCase().includes(lowerQ) || 
      s.lastName.toLowerCase().includes(lowerQ)
    );
  }
}
