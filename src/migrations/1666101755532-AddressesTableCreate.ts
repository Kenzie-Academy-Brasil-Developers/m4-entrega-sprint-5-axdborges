import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressesTableCreate1666101755532 implements MigrationInterface {
    name = 'AddressesTableCreate1666101755532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(80) NOT NULL, "zipCode" character varying(60) NOT NULL, "number" character varying(80), "city" character varying(60) NOT NULL, "state" character varying(60) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
