document.addEventListener('DOMContentLoaded', () => {
    let produtos = JSON.parse(localStorage.getItem('produtos'));
    
    document.getElementById('totalProducts').textContent = produtos.length || 0;
    document.getElementById('totalClients').textContent = JSON.parse(localStorage.getItem('clientes')).length || 0;
    document.getElementById('monthlySales').textContent = `R$157,00`; 

    let categoriesCount = {
        flv: 0,
        bebidas: 0,
        frios: 0,
        basico: 0
    };
    
    function quantidadeCategorias() {
        produtos.forEach(produto => {
            console.log(produto.categoria);
            if (categoriesCount.hasOwnProperty(produto.categoria)) {
                categoriesCount[produto.categoria]++;
            }
        });
    }
    
    quantidadeCategorias();
    
    const ctxProduct = document.getElementById('productChart').getContext('2d');
    const productChart = new Chart(ctxProduct, {
        type: 'bar',
        data: {
            labels: Object.keys(categoriesCount), 
            datasets: [{
                label: 'Quantidade',
                data: Object.values(categoriesCount),
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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${product}</td><td>${new Date().toLocaleDateString()}</td>`; // Data atual como exemplo
        productTableBody.appendChild(row);
    });
});
