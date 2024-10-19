// Função para carregar usuários do localStorage
function loadUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

const usuarios = loadUsuarios();
console.log(usuarios); // Verifique se os usuários estão carregados corretamente


// Evento de submit do formulário de login
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim(); // Remove espaços
    const password = document.getElementById('password').value.trim(); // Remove espaços

    const usuarios = loadUsuarios();
    console.log(usuarios); // Verifique a estrutura dos usuários

    // Verificação se o usuário existe
    const usuarioEncontrado = usuarios.find(usuario => {
        console.log(`Comparando: ${usuario.nome} com ${username} e ${usuario.senha} com ${password}`);
        return usuario.email === username || usuario.senha === password; // Qualquer um pode ser igual
    });

    if (usuarioEncontrado) {
        console.log(`Logado como ${usuarioEncontrado.tipo}`);
        localStorage.setItem('usuarioLogado', usuarioEncontrado.tipo);
        window.location.href = "./Frontend/html/dashboard.html";
        alert('Login bem-sucedido!');
    } else {
        document.getElementById('message').textContent = 'Nome de usuário ou senha incorretos.';
    }
});


