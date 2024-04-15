import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1712918756941 implements MigrationInterface {
  name = 'UpdateUser1712918756941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }
}
