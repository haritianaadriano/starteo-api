import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1712919145081 implements MigrationInterface {
  name = 'UpdateUser1712919145081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`,
    );
  }
}
