import { MigrationInterface, QueryRunner } from "typeorm";

export class addIsActiveDefault1666030463366 implements MigrationInterface {
    name = 'addIsActiveDefault1666030463366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
