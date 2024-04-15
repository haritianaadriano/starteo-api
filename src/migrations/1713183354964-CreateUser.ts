import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1713183354964 implements MigrationInterface {
  name = 'CreateUser1713183354964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS "user" ' +
        '(id varchar CONSTRAINT user_pk PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
        '"firstname" varchar NOT NULL, ' +
        '"lastname" varchar NOT NULL, ' +
        '"username" varchar NOT NULL, ' +
        '"creationDate" timestamp NOT NULL default now(), ' +
        '"email" varchar NOT NULL, ' +
        '"birthdate" timestamp, ' +
        '"password" varchar NOT NULL)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
