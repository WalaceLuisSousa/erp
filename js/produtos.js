// Classe produto
class Product {
    constructor(nome, valor, categoria) {
        this.nome = nome; // Nome do produto
        this.valor = valor; // Valor do produto
        this.categoria = categoria; // Categoria do produto
    }
}

let produtoEditando = null;

// Função para adicionar um produto à lista
function adicionarProduto() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const valorProduto = document.getElementById('valorProduto').value;
    const categoriaProduto = document.getElementById('categoria').value;

    if (nomeProduto && valorProduto) {
        const produto = new Product(nomeProduto, valorProduto, categoriaProduto);
        if (produtoEditando) {
            updateProduct(produto);
        } else {
            saveToLocalStorage('produtos', produto);
            adicionarProdutoNaTabela(produto);
        }

        resetForm();
    } else {
        alert("Por favor, insira o nome e o valor do produto.");
    }
}

// Função para adicionar o produto à tabela correspondente
function adicionarProdutoNaTabela(produto) {
    const tableBody = document.querySelector(`#table-${produto.categoria} tbody`);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${produto.nome}</td>
        <td>R$ ${parseFloat(produto.valor).toFixed(2)}</td>
        <td>
            <button class="botaoEditar" onclick="editarProduto('${produto.nome}', '${produto.valor}', '${produto.categoria}')">Editar</button>
            <button class="botaoDeletar" onclick="deletarProduto('${produto.nome}', '${produto.categoria}')">Excluir</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Função para salvar produtos no localStorage
function saveToLocalStorage(key, value) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(value);
    localStorage.setItem(key, JSON.stringify(items));
}

// Função para listar produtos armazenados no localStorage
function listarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach(product => {
        adicionarProdutoNaTabela(product);
    });
}

// Função para editar um produto
function editarProduto(nome, valor, categoria) {
    produtoEditando = { nome, valor, categoria };
    document.getElementById('nomeProduto').value = nome;
    document.getElementById('valorProduto').value = valor;
    document.getElementById('categoria').value = categoria;
    document.getElementById('adicionarBtn').textContent = "Atualizar Produto";
}

// Função para atualizar um produto
function updateProduct(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.map(p => {
        if (p.nome === produtoEditando.nome) {
            return produto;
        }
        return p;
    });

    localStorage.setItem('produtos', JSON.stringify(produtos));
    atualizarTabela();
    produtoEditando = null;
    document.getElementById('adicionarBtn').textContent = "Adicionar Produto";
}

// Função para atualizar a tabela
function atualizarTabela() {
    document.querySelectorAll('#tabelasProdutos tbody').forEach(tbody => tbody.innerHTML = '');
    listarProdutos();
}

// Função para deletar um produto
function deletarProduto(nome, categoria) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(produto => produto.nome !== nome);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    atualizarTabela();
}

// Função para resetar o formulário
function resetForm() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';
    produtoEditando = null;
    document.getElementById('adicionarBtn').textContent = "Adicionar Produto";
}

// Carregar produtos do localStorage ao abrir a página
document.addEventListener('DOMContentLoaded', listarProdutos);
