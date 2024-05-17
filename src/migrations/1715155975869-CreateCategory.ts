import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategory1715155975869 implements MigrationInterface {
  name = 'CreateCategory1715155975869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field" character varying NOT NULL, "description" character varying, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "projectId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_1028c8db872bf5df647b122459b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_1028c8db872bf5df647b122459b"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
