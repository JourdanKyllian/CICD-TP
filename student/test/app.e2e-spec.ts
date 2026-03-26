import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { StudentsService } from './../src/students/students.service';

describe('Students API (e2e)', () => {
  let app: INestApplication;
  let studentsService: StudentsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    studentsService = moduleFixture.get<StudentsService>(StudentsService);
    await app.init();
  });

  // RÉINITIALISATION DE LA BASE DE DONNEES AVANT CHAQUE TEST
  beforeEach(() => {
    studentsService.resetData();
  });

  afterAll(async () => {
    await app.close();
  });

  // TEST DES GET
  describe('Lecture (GET)', () => {
    it('1. GET /students doit renvoyer 200 et un tableau', async () => {
      const res = await request(app.getHttpServer())
        .get('/students')
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('2. GET /students doit renvoyer tous les étudiants initiaux (5)', async () => {
      const res = await request(app.getHttpServer())
        .get('/students')
        .expect(200);
      expect(res.body.length).toBe(5);
    });

    it('3. GET /students/1 doit renvoyer Jean Dupont', async () => {
      const res = await request(app.getHttpServer())
        .get('/students/1')
        .expect(200);
      expect(res.body.firstName).toBe('Jean');
    });

    it('4. GET /students/999 doit renvoyer 404', () => {
      return request(app.getHttpServer()).get('/students/999').expect(404);
    });

    it('5. GET /students/abc doit renvoyer 400', () => {
      return request(app.getHttpServer()).get('/students/abc').expect(400);
    });
  });

  // CRÉATION, MODIF, SUPPR, STATS & SEARCH
  describe('Autres opérations', () => {
    const validStudent = {
      firstName: 'Kyllian',
      lastName: 'Jourdan',
      email: 'kj@test.fr',
      grade: 18,
      field: 'informatique',
    };

    it('6. POST avec données valides doit renvoyer 201 + ID', async () => {
      const res = await request(app.getHttpServer())
        .post('/students')
        .send(validStudent)
        .expect(201);
      expect(res.body.id).toBe(6);
    });

    it('7. POST sans champ obligatoire doit renvoyer 400', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({ firstName: 'Test' })
        .expect(400);
    });

    it('8. POST avec note invalide (25) doit renvoyer 400', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({ ...validStudent, grade: 25 })
        .expect(400);
    });

    it('9. POST avec email déjà existant doit renvoyer 409', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({ ...validStudent, email: 'jean@test.fr' })
        .expect(409);
    });

    it('10. PUT avec données valides doit renvoyer 200', async () => {
      const res = await request(app.getHttpServer())
        .put('/students/1')
        .send(validStudent)
        .expect(200);
      expect(res.body.firstName).toBe('Kyllian');
    });

    it('11. PUT avec ID inexistant doit renvoyer 404', () => {
      return request(app.getHttpServer())
        .put('/students/999')
        .send(validStudent)
        .expect(404);
    });

    it('12. DELETE avec ID valide doit renvoyer 200', () => {
      return request(app.getHttpServer()).delete('/students/1').expect(200);
    });

    it('13. DELETE avec ID inexistant doit renvoyer 404', () => {
      return request(app.getHttpServer()).delete('/students/999').expect(404);
    });

    it('14. GET /students/stats doit renvoyer les propriétés obligatoires', async () => {
      const res = await request(app.getHttpServer())
        .get('/students/stats')
        .expect(200);
      expect(res.body).toHaveProperty('totalStudents');
      expect(res.body).toHaveProperty('averageGrade');
      expect(res.body).toHaveProperty('studentsByField');
      expect(res.body).toHaveProperty('bestStudent');
    });

    it('15. GET /students/search?q=marie doit renvoyer Marie Curie', async () => {
      const res = await request(app.getHttpServer())
        .get('/students/search?q=marie')
        .expect(200);
      expect(res.body[0].firstName).toBe('Marie');
    });

    it('16. GET /students?sort=grade&order=desc doit renvoyer Marie Curie en premier', async () => {
      const res = await request(app.getHttpServer()).get(
        '/students?sort=grade&order=desc',
      );
      expect(res.body[0].firstName).toBe('Marie');
    });

    it('17. GET /students?limit=2 doit renvoyer uniquement 2 étudiants', async () => {
      const res = await request(app.getHttpServer()).get('/students?limit=2');
      expect(res.body.length).toBe(2);
    });

    it('18. POST avec note négative doit renvoyer 400', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({
          firstName: 'A',
          lastName: 'B',
          email: 'a@b.fr',
          grade: -5,
          field: 'info',
        })
        .expect(400);
    });

    it('19. GET /students/search avec caractères spéciaux doit gérer proprement', async () => {
      const res = await request(app.getHttpServer())
        .get('/students/search?q=!!!')
        .expect(200);
      expect(res.body.length).toBe(0);
    });

    it('20. POST avec un email invalide doit échouer', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({
          firstName: 'A',
          lastName: 'B',
          email: 'pas-un-email',
          grade: 10,
          field: 'info',
        })
        .expect(400);
    });
  });
});
