import knex from "knex";

const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: "cars_orm",
        user: "postgres",
        password: "postgres",
    },
});

export default knexInstance;
