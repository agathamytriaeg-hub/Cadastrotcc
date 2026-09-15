const form = document.getElementById("loginForm");

const senha = document.getElementById("senha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mensagem =
    document.getElementById("mensagem");


// ========================================
// MOSTRAR SENHA
// ========================================

mostrarSenha.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.textContent = "🙈";

    } else {

        senha.type = "password";

        mostrarSenha.textContent = "👁";

    }

});


// ========================================
// LOGIN
// ========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const senhaValor =
        senha.value;


    if (!email || !senhaValor) {

        mensagem.textContent =
            "Preencha todos os campos.";

        mensagem.style.color =
            "#c45c3c";

        return;

    }


    try {

        const resposta = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,

                senha: senhaValor

            })

        });


        const dados = await resposta.json();


        // ========================================
        // LOGIN CORRETO
        // ========================================

        if (dados.sucesso) {

            mensagem.textContent =
                "Login realizado com sucesso! 🌱";

            mensagem.style.color =
                "#526b26";

            console.log(
                "Usuário:",
                dados.usuario
            );

        }


        // ========================================
        // LOGIN INCORRETO
        // ========================================

        else {

            mensagem.textContent =
                dados.mensagem;

            mensagem.style.color =
                "#c45c3c";

        }


    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao conectar com o servidor.";

        mensagem.style.color =
            "#c45c3c";

    }

});