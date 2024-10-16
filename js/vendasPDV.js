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
    console.log(`${produto.nome} adicionado`);
}

function retirarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        const produtoRemovido = carrinho.pop(); // Remove o último produto

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        listarCarrinhoNaDiv();
        mostrarModal(`${produtoRemovido.nome} removido do carrinho com sucesso!`);
        console.log(`${produtoRemovido.nome} removido`);
    } else {
        console.error('O carrinho está vazio');
        mostrarModal('O carrinho está vazio');
    }
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

    let i = 0;

    carrinho.forEach(produto => {
        const cardCarrinho = document.createElement('div');
        cardCarrinho.classList.add('card_carrinho');
        cardCarrinho.id = i;

        cardCarrinho.innerHTML = `
            <p>ID: ${i}</p>
            <h2 class="titulo_produto">${produto.nome}</h2>
            <p class="preco_produto">R$ ${parseFloat(produto.valor).toFixed(2)}</p>
            <h2 class="categoria_produto">Categoria: ${produto.categoria}</h2>
            <button class="botaoCancelar" onclick="retirarCarrinho(${i})">Remover</button>
        `;
        
        produtosCarrinhoDiv.appendChild(cardCarrinho); 
        i++;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    listarProdutosNaDiv();
    listarCarrinhoNaDiv(); 

    const usuarioLogado = localStorage.getItem('usuarioLogado');

    console.log(`Usuário logado: ${usuarioLogado}`);

document.getElementById('mostrarUsuario').textContent = usuarioLogado || "Usuário não logado";
});
