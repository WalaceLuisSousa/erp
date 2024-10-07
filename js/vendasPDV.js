function listarProdutosNaDiv() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produtosDiv = document.querySelector('.produtos'); 

    produtosDiv.innerHTML = ''; 

    produtos.forEach(produto => {
        const cardProduto = document.createElement('div');
        cardProduto.classList.add('card_produto');
        cardProduto.innerHTML = `
            <h2 class="titulo_produto">${produto.nome}</h2>
            <img src="../imagens/backgroundImg.avif" alt="${produto.nome}">
            <p class="preco_produto">R$ ${parseFloat(produto.valor).toFixed(2)}</p>
            <h2 class="categoria_produto">${produto.categoria}</h2>
            <div class="botoes-container">
                <button class="botaoAdicionar" data-produto='${JSON.stringify(produto)}'>Adicionar ao Carrinho</button>
            </div>
        `;
        produtosDiv.appendChild(cardProduto); 
    });

    // Adiciona evento de clique aos botões
    const botoesAdicionar = document.querySelectorAll('.botaoAdicionar');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            const produto = JSON.parse(botao.getAttribute('data-produto'));
            adicionarCarrinho(produto);
        });
    });
}

function adicionarCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(produto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    listarCarrinhoNaDiv();

    mostrarModal(`${produto.nome}  adicionado ao carrinho com Sucesso!`);
}

function mostrarModal(mensagem) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    const span = document.getElementsByClassName("close")[0];

    modalMessage.textContent = mensagem;
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}


function listarCarrinhoNaDiv() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosCarrinhoDiv = document.querySelector('.produtosCarrinho'); 

    produtosCarrinhoDiv.innerHTML = ''; 

    if (carrinho.length === 0) {
        produtosCarrinhoDiv.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach(produto => {
        const cardCarrinho = document.createElement('div');
        cardCarrinho.classList.add('card_carrinho');
        cardCarrinho.innerHTML = `
            <h2 class="titulo_produto">${produto.nome}</h2>
            <p class="preco_produto">R$ ${parseFloat(produto.valor).toFixed(2)}</p>
            <h2 class="categoria_produto">Categoria: ${produto.categoria}</h2>
        `;
        produtosCarrinhoDiv.appendChild(cardCarrinho); 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    listarProdutosNaDiv();
    listarCarrinhoNaDiv(); 
});
