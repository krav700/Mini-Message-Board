#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 30 ),
    message VARCHAR ( 255 ),
    time_sent TIMESTAMP
);

INSERT INTO messages (username, message, time_sent)
VALUES
    ('Amando', 'Hi, there!', '2026-05-09 12:16:30'),
    ('Charles', 'Hello, World!', '2026-05-09 12:15:00');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();