document.addEventListener('DOMContentLoaded', () => {

    

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    document.getElementById('totalProducts').textContent = produtos.length || 0;
    document.getElementById('totalClients').textContent = JSON.parse(localStorage.getItem('clientes')).length || 0;
    document.getElementById('monthlySales').textContent = `R$157,00`; 

    let categoriesQtd = {
        flv: 0,
        bebidas: 0,
        frios: 0,
        basico: 0
    };
    
    function quantidadeCategorias() {
        produtos.forEach(produto => {
            if (categoriesQtd.hasOwnProperty(produto.categoria)) {
                categoriesQtd[produto.categoria]++;
            }
        });
    }
    
    quantidadeCategorias();
    
    const ctxProduct = document.getElementById('productChart').getContext('2d');
    const productChart = new Chart(ctxProduct, {
        type: 'bar',
        data: {
            labels: Object.keys(categoriesQtd), 
            datasets: [{
                label: 'Quantidade',
                data: Object.values(categoriesQtd),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Preencher tabela com produtos
    const products = JSON.parse(localStorage.getItem('produtos')) || [];
    const productTableBody = document.getElementById('productTableBody');
    const ultimosProdutos = products.slice(-5);

    ultimosProdutos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${produto.nome}</td><td>${new Date().toLocaleDateString()}</td>`;
        productTableBody.appendChild(row);
    });

    const clients = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteTableBody = document.getElementById('clienteTableBody');
    const ultimosClientes = clients.slice(-5);

    ultimosClientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${cliente.nome}</td>`;
        clienteTableBody.appendChild(row);
    });
});
