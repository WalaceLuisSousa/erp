class Client {
    constructor(nome, aniversario, genero) {
        this.nome = nome;
        this.aniversario = aniversario;
        this.genero = genero;
    }
    
    getFormattedBirthday() {
        return new Date(this.aniversario).toLocaleDateString('pt-BR');
    }
}

function addClient(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value;
    const clienteAniversario = document.getElementById('clienteAniversario').value;
    const clienteGenero = document.getElementById('Clientegenero').value;

    if (nomeCliente && clienteAniversario && clienteGenero) {
        const newClient = new Client(nomeCliente, clienteAniversario, clienteGenero);
        
        adicionarClienteNaTabela(newClient);
        
        limparFormulario();

        saveToLocalStorage('clientes', newClient);
    } else {
        alert("Por favor, insira o nome e a data de aniversário do cliente.");
    }
}

function adicionarClienteNaTabela(cliente) {
    const tableBody = document.querySelector('#table-cliente tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.getFormattedBirthday()}</td>
        <td>${cliente.genero}</td>
        <td>
            <button onclick="deleteClient('${cliente.nome}')">Excluir</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function saveToLocalStorage(key, value) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(value);
    localStorage.setItem(key, JSON.stringify(items));
}

function loadClients() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.forEach(clientData => {
        const client = new Client(clientData.nome, clientData.aniversario, clientData.genero);
        adicionarClienteNaTabela(client);
    });
}

function deleteClient(nome) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(client => client.nome !== nome);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    location.reload(); // Recarrega a página para atualizar a tabela
}

function limparFormulario() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('clienteAniversario').value = '';
    document.getElementById('Clientegenero').value = '';
}

// Carregar clientes ao abrir a página
document.addEventListener('DOMContentLoaded', loadClients);
