import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.bigIncrements('id').primary();
        table.string('name').notNullable();
        table.bigInteger('rent_per_day').notNullable();
        table.string('size').notNullable();
        table.text('profile_picture_url');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}

