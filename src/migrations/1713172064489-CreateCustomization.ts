import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomization1713172064489 implements MigrationInterface {
  name = 'CreateCustomization1713172064489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "careerPath" character varying NOT NULL, "description" character varying, "customizationOption" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_ba5caff0f51c654eb61e3546eb" UNIQUE ("userId"), CONSTRAINT "PK_84a03b14b9552682719741f4b14" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customization" ADD CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customization" DROP CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba"`,
    );
    await queryRunner.query(`DROP TABLE "customization"`);
  }
}
