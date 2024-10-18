document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('usuarioLogin').addEventListener('submit', adicionarUsuario);
});

function adicionarUsuario(event) {
    event.preventDefault();

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const emailUsuario = document.getElementById('emailUsuario').value;
    const senhaUsuario = document.getElementById('senhaUsuario').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    if (nomeUsuario && emailUsuario && senhaUsuario && tipoUsuario) {

        const usuario = {
            nome: nomeUsuario,
            email: emailUsuario,
            senha: senhaUsuario,
            tipo: tipoUsuario
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        limparFormulario();

        console.log("Usuário criado");
    } else {
        alert("Usuário não criado. Por favor, preencha todos os campos.");
    }
}


function limparFormulario() {
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('emailUsuario').value = '';
    document.getElementById('senhaUsuario').value = '';
    document.getElementById('senhaConfirmar').value = '';
    document.getElementById('tipoUsuario').value = '';
    editingClientIndex = null;
}