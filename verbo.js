let dados = [];
let cardContainer = document.querySelector(".card-container");

// Adiciona um listener para o campo de pesquisa.
// Presume-se que exista um <input type="text" id="CampoPesquisa"> no seu HTML.
const campoPesquisa = document.getElementById("CampoPesquisa");
if (campoPesquisa) {
    campoPesquisa.addEventListener("keyup", IniciarBusca);
}

async function carregarDados() {
    try {
        let resp = await fetch("dados.json");
        // Atribui os dados carregados à variável global 'dados'
        dados = await resp.json();
        renderizarCards(dados);
    }
    catch (e) {
        console.error(e.message);
    }
}

function renderizarCards(dadosParaRenderizar) {
    // Limpa o container antes de adicionar novos cards para evitar duplicatas
    cardContainer.innerHTML = "";
    try {
        dadosParaRenderizar.forEach(item => {
            let article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `
                <h2>${item.nome}</h2>
                <p>${item.ano}</p>
                <p>${item.descricao}</p>
                <a href="${item.link}" target="_blank">Saiba Mais</a>
            `;
            cardContainer.appendChild(article);
        });
    }
    catch (e) {
        console.error(e.message);
    }
}

function IniciarBusca() {
    const termoBusca = campoPesquisa.value.toLowerCase();
    const resultados = dados.filter(item =>
        item.nome.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca) ||
        String(item.ano).includes(termoBusca)
    );
    renderizarCards(resultados);
}

carregarDados();