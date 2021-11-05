import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPasswordUpdateTimeInUsers1604087787041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password_update_time',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password_update_time');
  }
}
