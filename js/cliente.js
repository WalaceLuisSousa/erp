class Client {
    constructor(name, birthday, email, telefone, endereco) {
        this.name = name;
        this.birthday = birthday;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
    
    getFormattedBirthday() {
        return new Date(this.birthday).toLocaleDateString();
    }
}



function addClient() {
    const clientName = document.getElementById('clientName').value;
    const clientBirthday = document.getElementById('clientBirthday').value;

    if (clientName && clientBirthday) {
        const newClient = new Client(clientName, clientBirthday);
        const clientList = document.getElementById('clientList');
        const li = document.createElement('li');
        li.textContent = `${newClient.name} - Aniversário: ${newClient.getFormattedBirthday()}`;
        clientList.appendChild(li);
        document.getElementById('clientName').value = '';
        document.getElementById('clientBirthday').value = '';

        // Armazenar no localStorage
        saveToLocalStorage('clients', newClient);
    } else {
        alert("Por favor, insira o nome e a data de aniversário do cliente.");
    }
}

function saveToLocalStorage(key, value) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(value);
    localStorage.setItem(key, JSON.stringify(items));
}

function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.forEach(clientData => {
        const client = new Client(clientData.name, clientData.birthday);
        const li = document.createElement('li');
        li.textContent = `${client.name} - Aniversário: ${client.getFormattedBirthday()}`;
        document.getElementById('clientList').appendChild(li);
    });
}

// Carregar clientes ao abrir a página
document.addEventListener('DOMContentLoaded', loadClients);
