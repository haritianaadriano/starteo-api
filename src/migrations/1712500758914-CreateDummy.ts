import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDummy1712500758914 implements MigrationInterface {
  name = 'CreateDummy1712500758914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dummy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dummy" character varying NOT NULL, CONSTRAINT "PK_8a7fd4e47344e8cfa61be2098af" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dummy"`);
  }
}
