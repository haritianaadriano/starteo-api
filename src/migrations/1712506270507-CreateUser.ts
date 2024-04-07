import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1712506270507 implements MigrationInterface {
  name = 'CreateUser1712506270507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "email" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
