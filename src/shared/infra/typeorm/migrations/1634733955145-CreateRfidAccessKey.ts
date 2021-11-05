import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRfidAccessKey1634733955145
  implements MigrationInterface
{
  private TableName = 'rfid_access_keys';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'uid',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'blocked',
            type: 'boolean',
            default: false,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TableName);
  }
}
