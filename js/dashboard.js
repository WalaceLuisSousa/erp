document.addEventListener('DOMContentLoaded', () => {
    // Atualizando contadores
    document.getElementById('totalProducts').textContent = JSON.parse(localStorage.getItem('products')).length || 0;
    document.getElementById('totalClients').textContent = JSON.parse(localStorage.getItem('clients')).length || 0;
    document.getElementById('monthlySales').textContent = `R$ ${Math.random() * 10000}.00`; // Simulação de vendas

    // Configuração do gráfico de produtos
    const ctxProduct = document.getElementById('productChart').getContext('2d');
    const productChart = new Chart(ctxProduct, {
        type: 'bar',
        data: {
            labels: ['Produto A', 'Produto B', 'Produto C'], // Exemplos
            datasets: [{
                label: 'Quantidade',
                data: [12, 19, 3], // Exemplos de dados
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
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

    // Configuração do gráfico de clientes
    const ctxClient = document.getElementById('clientChart').getContext('2d');
    const clientChart = new Chart(ctxClient, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março'], // Exemplos
            datasets: [{
                label: 'Clientes Ativos',
                data: [10, 15, 8], // Exemplos de dados
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1
            }]
        }
    });

    // Preencher tabela com produtos
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${product}</td><td>${new Date().toLocaleDateString()}</td>`; // Data atual como exemplo
        productTableBody.appendChild(row);
    });
});
