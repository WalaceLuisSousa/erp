// scripts.js
document.addEventListener('DOMContentLoaded', () => {

    const usuarioLogado = localStorage.getItem('usuarioLogado');

    console.log(`Usuário logado: ${usuarioLogado}`);

    document.getElementById('mostrarUsuario').textContent = usuarioLogado || "Usuário não logado";

    // Recuperar clientes e produtos do localStorage

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const pedidos = [];

    console.log(produtos);
    // Preencher o select de clientes
    const clienteSelect = document.getElementById('clientePedido');
    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });

    // Preencher o select de produtos
    const produtoSelect = document.getElementById('produtoPedido');
    produtos.forEach((produto, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${produto.nome} - R$${produto.preco}`;
        produtoSelect.appendChild(option);
    });

    // Adicionar pedido
    window.adicionarPedido = function () {
        const clienteIndex = document.getElementById('clientePedido').value;
        const produtoIndex = document.getElementById('produtoPedido').value;
        const quantidade = document.getElementById('quantidadePedido').value;

        if (clienteIndex !== '' && produtoIndex !== '' && quantidade > 0) {
            const pedido = {
                cliente: clientes[clienteIndex],
                produto: produtos[produtoIndex],
                quantidade: parseInt(quantidade)
            };
            pedidos.push(pedido);
            atualizarListaPedidos();
        }
    };

    // Atualizar lista de pedidos
    function atualizarListaPedidos() {
        const listaPedidos = document.getElementById('listaPedidos');
        listaPedidos.innerHTML = pedidos.map((pedido, index) => `
            <div class="pedido">
                <span>${pedido.produto.nome} x ${pedido.quantidade}</span>
                <button onclick="removerPedido(${index})">Remover</button>
            </div>
        `).join('');
    }

    // Remover pedido
    window.removerPedido = function (index) {
        pedidos.splice(index, 1);
        atualizarListaPedidos();
    };

    // Fechar pedido e gerar arquivo TXT
    window.fecharPedido = function () {
        if (pedidos.length === 0) {
            alert("Nenhum pedido foi adicionado.");
            return;
        }

        // Obter o nome do cliente do primeiro pedido (assumindo que todos os pedidos são do mesmo cliente)
        const nomeCliente = pedidos[0].cliente.nome;
        let conteudoTxt = `Cliente: ${nomeCliente}\n\nPedidos:\n`;

        // Adicionar os detalhes dos pedidos ao conteúdo do TXT
        pedidos.forEach((pedido, index) => {
            conteudoTxt += `${index + 1}. Produto: ${pedido.produto.nome}, Qtd: ${pedido.quantidade}, Preço: R$${pedido.produto.preco}\n`;
        });

        // Criar o blob com o conteúdo do TXT
        const blob = new Blob([conteudoTxt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Criar um link de download e clicar nele programaticamente
        const link = document.createElement('a');
        link.href = url;
        link.download = `Pedido_${nomeCliente}.txt`;
        document.body.appendChild(link);
        link.click();

        // Remover o link do DOM
        document.body.removeChild(link);

        // Limpar pedidos após fechar o pedido
        pedidos.length = 0;
        atualizarListaPedidos();
    };
});
