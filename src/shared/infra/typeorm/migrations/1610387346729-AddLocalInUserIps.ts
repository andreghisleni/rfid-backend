import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLocalInUserIps1610387346729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_ips',
      new TableColumn({
        name: 'local',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_ips', 'local');
  }
}
