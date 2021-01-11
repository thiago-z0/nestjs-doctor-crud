import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateConstraits1610313426879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('doctor_has_specialties', [
      new TableForeignKey({
        columnNames: ['doctor_id'],
        referencedTableName: 'doctor',
        referencedColumnNames: ['id'],
        name: 'doctor_to_specialty_foreing_key',
      }),
      new TableForeignKey({
        columnNames: ['specialty_id'],
        referencedTableName: 'specialty',
        referencedColumnNames: ['id'],
        name: 'specialty_to_doctor_foreing_key',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('doctor_has_specialties', [
      await this.findFK(
        queryRunner,
        'doctor_has_specialties',
        'doctor_to_specialty_foreing_key',
      ),
      await this.findFK(
        queryRunner,
        'doctor_has_specialties',
        'specialty_to_doctor_foreing_key',
      ),
    ]);
  }

  private async findFK(
    queryRunner: QueryRunner,
    table: string,
    fkName: string,
  ): Promise<TableForeignKey | undefined> {
    return (await queryRunner.getTable(table))!.foreignKeys.find(
      (element) => element.name === fkName,
    );
  }
}
