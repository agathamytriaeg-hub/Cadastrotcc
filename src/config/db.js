const mysql = require("mysql2");

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

conexao.getConnection((erro, conn) => {

    if (erro) {
        console.error("❌ Erro ao conectar no MySQL:", erro.message);
        return;
    }

    console.log("✅ Banco de dados conectado!");

    conn.release();
});

module.exports = conexao;