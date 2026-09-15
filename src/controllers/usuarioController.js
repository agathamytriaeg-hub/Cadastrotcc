const conexao = require("../config/db");


// ========================================
// CADASTRAR USUÁRIO
// ========================================

const cadastrar = (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }


    // Verificar se o e-mail já existe

    const verificarEmail = `
        SELECT id_usuario
        FROM usuario
        WHERE email = ?
    `;

    conexao.query(
        verificarEmail,
        [email],
        (erro, resultados) => {

            if (erro) {

                console.error(erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao verificar o e-mail."
                });

            }


            if (resultados.length > 0) {

                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Este e-mail já está cadastrado."
                });

            }


            // Cadastrar usuário

            const sql = `
                INSERT INTO usuario
                (nome, email, senha)
                VALUES (?, ?, ?)
            `;

            conexao.query(
                sql,
                [nome, email, senha],
                (erro, resultado) => {

                    if (erro) {

                        console.error(erro);

                        return res.status(500).json({
                            sucesso: false,
                            mensagem: "Erro ao cadastrar usuário."
                        });

                    }

                    console.log(
                        "✅ Usuário cadastrado. ID:",
                        resultado.insertId
                    );

                    return res.json({
                        sucesso: true,
                        mensagem: "Cadastro realizado com sucesso!"
                    });

                }
            );

        }
    );
};



// ========================================
// LOGIN
// ========================================

const login = (req, res) => {

    const { email, senha } = req.body;


    if (!email || !senha) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha o e-mail e a senha."
        });

    }


    // Procurar no banco pelo e-mail E pela senha

    const sql = `
        SELECT id_usuario, nome, email
        FROM usuario
        WHERE email = ? AND senha = ?
    `;


    conexao.query(
        sql,
        [email, senha],
        (erro, resultados) => {

            if (erro) {

                console.error(
                    "❌ Erro no login:",
                    erro
                );

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao consultar o banco de dados."
                });

            }


            // ========================================
            // USUÁRIO NÃO ENCONTRADO
            // ========================================

            if (resultados.length === 0) {

                return res.status(401).json({
                    sucesso: false,
                    mensagem: "E-mail ou senha incorretos."
                });

            }


            // ========================================
            // USUÁRIO ENCONTRADO
            // ========================================

            const usuario = resultados[0];

            console.log(
                "✅ Login realizado:",
                usuario.email
            );


            return res.json({

                sucesso: true,

                mensagem: "Login realizado com sucesso!",

                usuario: {
                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email
                }

            });

        }
    );
};


module.exports = {
    cadastrar,
    login
};