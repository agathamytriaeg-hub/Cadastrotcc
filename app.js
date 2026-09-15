const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Arquivos HTML, CSS e JS
app.use(
    express.static(
        path.join(__dirname, "src", "public")
    )
);

// Banco de dados
require("./src/config/db");

// Rotas de usuário
const usuarioRoutes =
    require("./src/routes/usuarioRoutes");

app.use("/", usuarioRoutes);

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "src",
            "public",
            "login.html"
        )
    );
});

module.exports = app;