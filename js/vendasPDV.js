function listarProdutosNaDiv() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produtosDiv = document.querySelector('.produtos'); 

    produtosDiv.innerHTML = ''; 

    produtos.forEach(produto => {
        const cardProduto = document.createElement('div');
        cardProduto.classList.add('card_produto');
        cardProduto.innerHTML = `
            <h2 class="titulo_produto">${produto.nome}</h2>
            <img src="../imagens/backgroundImg.avif"">
            <p class="preco_produto">R$ ${parseFloat(produto.valor).toFixed(2)}</p>
            <h2 class="preco_produto">Categoria ${produto.categoria}</h2>
            <div class="botoes-container">
                <button class="botaoAdicionar">Adicionar ao Carrinho</button>
            </div>
        `;
        produtosDiv.appendChild(cardProduto); 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    listarProdutosNaDiv();
    listarProdutos();
});
