class Client {
    constructor(nome, aniversario, genero) {
        this.nome = nome;
        this.aniversario = aniversario;
        this.genero = genero;
    }
    
    getFormattedBirthday() {
        return new Date(this.aniversario).toLocaleDateString();
    }
}



function addClient(event) {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const clienteAniversario = document.getElementById('clienteAniversario').value;
    const Clientegenero = document.getElementById('Clientegenero').value;

    if (nomeCliente && clienteAniversario && Clientegenero) {
        const newClient = new Client(nomeCliente, clienteAniversario, Clientegenero);
        const clientList = document.getElementById('clientList');
        const li = document.createElement('li');
        li.textContent = `${newClient.name} - Aniversário: ${newClient.getFormattedBirthday()}`;
        clientList.appendChild(li);
        document.getElementById('nomeCliente').value = '';
        document.getElementById('clienteAniversario').value = '';
        document.getElementById('Clientegenero').value = '';
        

        // Armazenar no localStorage
        saveToLocalStorage('clientes', newClient);
    } else {
        alert("Por favor, insira o nome e a data de aniversário do cliente.");
    }
}

function adicionarClienteNaTabela(clientes) {
    const tableBody = document.querySelector(`#table-${clientes} tbody`);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="width: 40%;">${cliente.nome}</td>
        <td style="width: 30%;">R$ ${parseFloat(cliente.aniversario)}</td>
        <td style="width: 30%;">R$ ${parseFloat(cliente.genero)}</td>
        <td style="width: 30%;">
            <button class="botaoDeletar" onclick="deletarProduto('${cliente.nome}', '${produto.categoria}')">Excluir</button>
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
        const li = document.createElement('li');
        li.textContent = `${client.nome} - Aniversário: ${client.getFormattedBirthday()} - Genero: ${client.genero} `;
        document.getElementById('clientList').appendChild(li);
    });
}

// Carregar clientes ao abrir a página
document.addEventListener('DOMContentLoaded', loadClients);