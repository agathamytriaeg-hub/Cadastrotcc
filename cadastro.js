const form = document.getElementById("cadastroForm");

const mensagem = document.getElementById("mensagem");

const senha = document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mostrarConfirmarSenha =
    document.getElementById("mostrarConfirmarSenha");


// ============================
// MOSTRAR SENHA
// ============================

mostrarSenha.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.textContent = "🙈";

    } else {

        senha.type = "password";

        mostrarSenha.textContent = "👁";

    }

});


// ============================
// MOSTRAR CONFIRMAÇÃO DA SENHA
// ============================

mostrarConfirmarSenha.addEventListener("click", () => {

    if (confirmarSenha.type === "password") {

        confirmarSenha.type = "text";

        mostrarConfirmarSenha.textContent = "🙈";

    } else {

        confirmarSenha.type = "password";

        mostrarConfirmarSenha.textContent = "👁";

    }

});


// ============================
// CADASTRAR
// ============================

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const senhaValor =
        senha.value;

    const confirmarSenhaValor =
        confirmarSenha.value;


    // Verificar campos

    if (!nome || !email || !senhaValor || !confirmarSenhaValor) {

        mensagem.textContent =
            "Preencha todos os campos.";

        mensagem.style.color = "#c45c3c";

        return;

    }


    // Verificar senha

    if (senhaValor !== confirmarSenhaValor) {

        mensagem.textContent =
            "As senhas não são iguais.";

        mensagem.style.color = "#c45c3c";

        return;

    }


    // Verificar tamanho da senha

    if (senhaValor.length < 6) {

        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";

        mensagem.style.color = "#c45c3c";

        return;

    }


    try {

        const resposta = await fetch("/cadastrar", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                nome: nome,

                email: email,

                senha: senhaValor

            })

        });


        const dados = await resposta.json();


        if (dados.sucesso) {

            mensagem.textContent =
                "Cadastro realizado com sucesso! 🌱";

            mensagem.style.color = "#526b26";


            form.reset();


            // Voltar para o login

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);


        } else {

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