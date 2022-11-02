var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "db4",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        usr: {
            type: "varchar",
        },
        content: {
            type: 'varchar',
        },
        time: {
            type: 'timestamp',
        },
    },
})