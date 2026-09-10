const botao = document.getElementById("abrirBtn");
const convite = document.getElementById("convite");


// =====================================================
// ABRIR CONVITE
// =====================================================

botao.addEventListener("click", function () {

    convite.scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================================
// GOOGLE APPS SCRIPT
// =====================================================

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwQL1kTCNFEgsBSWzV4qwgqmveQHSYSKXbj0AVKVMmr0hU0Ehn5SQCNikV13eIqE9B0Aw/exec";


// =====================================================
// CONFIRMAR PRESENÇA
// =====================================================

const confirmarBtn = document.getElementById("confirmarBtn");

confirmarBtn.addEventListener("click", function () {

    const nome = prompt("💙 Digite seu nome para confirmar sua presença:");

    if (!nome || nome.trim() === "") {
        return;
    }

    const url =
        URL_SCRIPT +
        "?acao=confirmar" +
        "&nome=" + encodeURIComponent(nome.trim());

    fetch(url)
        .then(response => response.json())
        .then(dados => {

            if (dados.sucesso) {

                alert(
                    "💙 Presença confirmada!\n\n" +
                    "Esperamos você no dia 26 de setembro!"
                );

                carregarConfirmados();

            } else {

                alert("❌ Não foi possível confirmar sua presença.");

            }

        })
        .catch(erro => {

            console.error(erro);

            alert(
                "❌ Ocorreu um erro ao confirmar.\n\n" +
                "Tente novamente."
            );

        });

});


// =====================================================
// CARREGAR LISTA
// =====================================================

function carregarConfirmados() {

    const url = URL_SCRIPT;

    fetch(url)
        .then(response => response.json())
        .then(dados => {

            const lista = document.getElementById("nomesConfirmados");
            const contador = document.getElementById("contadorConfirmados");

            lista.innerHTML = "";

            if (!dados.nomes || dados.nomes.length === 0) {

                contador.textContent =
                    "Ainda não há confirmações.";

                return;
            }

            contador.textContent =
                dados.nomes.length +
                (
                    dados.nomes.length === 1
                        ? " pessoa confirmou presença."
                        : " pessoas confirmaram presença."
                );

            dados.nomes.forEach(function (nome) {

                const item = document.createElement("li");

                item.textContent = nome;

                lista.appendChild(item);

            });

        })
        .catch(erro => {

            console.error(erro);

            document.getElementById("contadorConfirmados").textContent =
                "Não foi possível carregar a lista.";

        });

}


// =====================================================
// CARREGAR LISTA AO ABRIR O SITE
// =====================================================

carregarConfirmados();