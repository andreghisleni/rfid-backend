import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRfidAccessLog1634734220795
  implements MigrationInterface
{
  private TableName = 'rfid_access_logs';

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
            name: 'rfid_access_key_id',
            type: 'uuid',
          },
          {
            name: 'blocked_access',
            type: 'boolean',
            default: false,
          },
          {
            name: 'why',
            type: 'varchar',
            isNullable: true,
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
        foreignKeys: [
          {
            name: 'LogRfidAccessKey',
            referencedTableName: 'rfid_access_keys',
            referencedColumnNames: ['id'],
            columnNames: ['rfid_access_key_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TableName);
  }
}
