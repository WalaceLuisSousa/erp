const usuarioAdm = {
    username: 'admin',
    password: 'admin'
};

const usuarioPadrao = {
    username: 'user',
    password: 'user'
};

document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if  (username === usuarioAdm.username && password === usuarioAdm.password) {
        console.log('logado como adm');
        localStorage.setItem('usuarioLogado', 'admin');
        window.location.href = "./Frontend/html/dashboard.html";
        alert('Login bem-sucedido!');
        }
    if (username === usuarioPadrao.username && password === usuarioPadrao.password){
        console.log('logado como user')
        localStorage.setItem('usuarioLogado', 'user');
        window.location.href = "./Frontend/html/dashboard.html";
        alert(`Bem-vindo, ${usuarioLogado}!`);
    }
    else {
        document.getElementById('message').textContent = 'Nome de usuário ou senha incorretos.';
    }
});