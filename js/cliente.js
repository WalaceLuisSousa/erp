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

let editingClientIndex = null;

function addClient(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value;
    const clienteAniversario = document.getElementById('clienteAniversario').value;
    const clienteGenero = document.getElementById('Clientegenero').value;

    if (nomeCliente && clienteAniversario && clienteGenero) {
        const newClient = new Client(nomeCliente, clienteAniversario, clienteGenero);
        
        if (editingClientIndex !== null) {
            updateClient(newClient);
        } else {
            saveToLocalStorage('clientes', newClient);
            adicionarClienteNaTabela(newClient);
        }

        limparFormulario();
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
            <button onclick="editClient('${cliente.nome}')">Editar</button>
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
    clientes.forEach((clientData, index) => {
        const client = new Client(clientData.nome, clientData.aniversario, clientData.genero);
        adicionarClienteNaTabela(client);
    });
}

function deleteClient(nome) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(client => client.nome !== nome);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    location.reload();
}

function editClient(nome) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    editingClientIndex = clientes.findIndex(client => client.nome === nome);
    
    if (editingClientIndex !== -1) {
        const client = clientes[editingClientIndex];
        document.getElementById('nomeCliente').value = client.nome;
        document.getElementById('clienteAniversario').value = client.aniversario;
        document.getElementById('Clientegenero').value = client.genero;
    }
}

function updateClient(updatedClient) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes[editingClientIndex] = updatedClient;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    location.reload();
}

function limparFormulario() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('clienteAniversario').value = '';
    document.getElementById('Clientegenero').value = '';
    editingClientIndex = null;
}

document.addEventListener('DOMContentLoaded', loadClients);
