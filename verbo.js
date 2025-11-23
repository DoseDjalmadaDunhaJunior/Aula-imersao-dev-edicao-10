// Variável global para armazenar os dados dos vilões.
let dados = [];
// Variável para armazenar o ID do timeout da função de debounce.
let debounceTimeout;
// Seleciona o contêiner onde os cards dos vilões serão renderizados.
const cardContainer = document.getElementById("cardContainer");
// Seleciona o campo de pesquisa no HTML.
const campoPesquisa = document.getElementById("campoPesquisa");

// Adiciona um listener de evento 'keyup' ao campo de pesquisa.
// A função de debounce é chamada para evitar buscas a cada tecla pressionada,
// melhorando a performance ao aguardar o usuário parar de digitar.
if (campoPesquisa) {
    campoPesquisa.addEventListener("keyup", () => {
        // Limpa o timeout anterior para reiniciar a contagem.
        clearTimeout(debounceTimeout);
        // Define um novo timeout para executar a busca após 300ms.
        debounceTimeout = setTimeout(iniciarBusca, 300);
    });
}

// Função assíncrona para carregar os dados do arquivo JSON.
async function carregarDados() {
    try {
        // Faz a requisição para o arquivo 'dados.json'.
        const resp = await fetch("dados.json");
        // Converte a resposta em JSON e armazena na variável 'dados'.
        dados = await resp.json();
        // Renderiza os cards com os dados carregados.
        renderizarCards(dados);
    } catch (e) {
        // Exibe uma mensagem de erro no console caso a requisição falhe.
        console.error("Erro ao carregar os dados dos vilões:", e.message);
    }
}

// Função para renderizar os cards dos vilões no contêiner.
function renderizarCards(dadosParaRenderizar) {
    // Limpa o conteúdo atual do contêiner para evitar duplicatas.
    cardContainer.innerHTML = "";
    // Verifica se há dados para renderizar.
    if (!dadosParaRenderizar || dadosParaRenderizar.length === 0) {
        // Exibe uma mensagem se nenhum resultado for encontrado.
        cardContainer.innerHTML = `<p class="mensagem-nenhum-resultado">Nenhum vilão encontrado. Gotham parece segura... por enquanto.</p>`;
        return; // Encerra a função.
    }
    // Itera sobre cada item dos dados para criar um card.
    dadosParaRenderizar.forEach(item => {
        // Cria um elemento <article> para o card.
        const article = document.createElement("article");
        // Adiciona a classe 'card' para estilização.
        article.classList.add("card");
        // Define o conteúdo HTML do card com os dados do vilão.
        article.innerHTML = `
            <img src="${item.imagem}" alt="Imagem de ${item.nome}" class="card-imagem">
            <div class="card-conteudo">
                <h2 class="card-titulo">${item.nome}</h2>
                <p class="card-ano">Ano de Aparição: ${item.ano}</p>
                <p class="card-descricao">${item.descricao}</p>
                <a href="${item.link}" target="_blank" class="card-link">Saiba Mais</a>
            </div>
        `;
        // Adiciona o card criado ao contêiner.
        cardContainer.appendChild(article);
    });
}

// Função para iniciar a busca de vilões.
function iniciarBusca() {
    // Obtém o termo de busca do campo de pesquisa, em minúsculas.
    const termoBusca = campoPesquisa.value.toLowerCase();
    // Filtra os dados com base no termo de busca.
    const resultados = dados.filter(item =>
        // Compara o nome do vilão.
        item.nome.toLowerCase().includes(termoBusca) ||
        // Compara a descrição.
        item.descricao.toLowerCase().includes(termoBusca) ||
        // Compara o ano de aparição.
        String(item.ano).includes(termoBusca)
    );
    // Renderiza os cards com os resultados da busca.
    renderizarCards(resultados);
}

// Chama a função para carregar os dados assim que o script é executado.
carregarDados();
