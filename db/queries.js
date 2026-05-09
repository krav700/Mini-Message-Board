const pool = require("./pool.js");

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages;');
    return rows;
}

async function insertMessage(message, username) {
    await pool.query(`INSERT INTO messages (message, username, time_sent) 
        VALUES($1, $2, NOW())`, [
            message,
            username
        ]);
}

async function getMessageById(messageId) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE messages.id = $1', [
        messageId
    ])
    return rows[0];
}

async function deleteAllMessages() {
    await pool.query("DELETE FROM messages");
}

module.exports = {
    getAllMessages,
    insertMessage,
    getMessageById,
    deleteAllMessages
}