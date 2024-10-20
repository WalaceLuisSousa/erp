function loadUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

const usuarios = loadUsuarios();

document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim(); 
    const password = document.getElementById('password').value.trim(); 

    const usuarios = loadUsuarios();

    const usuarioEncontrado = usuarios.find(usuario => {
        console.log(`USUARIO ARMAZENADO: ${usuario.email}`)
        console.log(`USUARIO DIGITADO: ${username}`)
        console.log(`SENHA ARMAZENADO:${usuario.senha}`)
        console.log(`SENHA DIGITADO: ${password}`)
        console.log(`---------------------------------`)

        return usuario.email === username && usuario.senha === password; 
    });

    if (usuarioEncontrado) {
     
        const usuarioLogado = usuarioEncontrado;

        localStorage.setItem('usuarioLogado', usuarioLogado.tipo);
        alert('Login bem-sucedido!');
        window.location.href = "./Frontend/html/dashboard.html";
        
    } else {
        document.getElementById('message').textContent = 'Nome de usuário ou senha incorretos.';
    }
});
