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
      const res = await request(app.getHttpServer()).get('/students').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('2. GET /students doit renvoyer tous les étudiants initiaux (5)', async () => {
      const res = await request(app.getHttpServer()).get('/students').expect(200);
      expect(res.body.length).toBe(5);
    });

    it('3. GET /students/1 doit renvoyer Jean Dupont', async () => {
      const res = await request(app.getHttpServer()).get('/students/1').expect(200);
      expect(res.body.firstName).toBe('Jean');
    });

    it('4. GET /students/999 doit renvoyer 404', () => {
      return request(app.getHttpServer()).get('/students/999').expect(404);
    });

    it('5. GET /students/abc doit renvoyer 400', () => {
      return request(app.getHttpServer()).get('/students/abc').expect(400);
    });
  });
  
});
