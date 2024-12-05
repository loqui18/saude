// Função para calcular a idade com base no ano de nascimento
function calcularIdade(anoNascimento) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
}

// Função para agrupar por faixa etária
function agruparPorFaixaEtaria(usuarios) {
    const faixasEtarias = {
        '18-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-54': 0,
        '55+': 0
    };

    usuarios.forEach(usuario => {
        const idade = calcularIdade(usuario.ano_nascimento);

        if (idade >= 18 && idade <= 24) faixasEtarias['18-24']++;
        else if (idade >= 25 && idade <= 34) faixasEtarias['25-34']++;
        else if (idade >= 35 && idade <= 44) faixasEtarias['35-44']++;
        else if (idade >= 45 && idade <= 54) faixasEtarias['45-54']++;
        else if (idade >= 55) faixasEtarias['55+']++;
    });

    return faixasEtarias;
}

// Função para desenhar o gráfico
function desenharGrafico(faixasEtarias) {
    const ctx = document.getElementById('chart1').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: Object.keys(faixasEtarias), // Faixas etárias como rótulos
            datasets: [{
                label: 'Quantidade de Usuários',
                data: Object.values(faixasEtarias), // Quantidade de usuários por faixa etária
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
}

// Função para adicionar um usuário
document.getElementById('addUsuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const anoNascimento = document.getElementById('anoNascimento').value;
    const tipoPlano = document.getElementById('tipoPlano').value;
    const sexo = document.getElementById('sexo').value;

    const dados = {
        nome_usuario: nomeUsuario,
        ano_nascimento: anoNascimento,
        tipo_plano: tipoPlano,
        sexo: sexo
    };

    fetch('https://parseapi.back4app.com/parse/classes/DadosAcademia11/', {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc',
            'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário adicionado com sucesso:', data);
        alert('Usuário adicionado com sucesso!');
        visualizarUsuarios(); // Atualiza o gráfico após adicionar
    })
    .catch((error) => {
        console.error('Erro ao adicionar usuário:', error);
        alert('Erro ao adicionar usuário.');
    });
});

// Função para editar um usuário
document.getElementById('editUsuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const objectId = document.getElementById('editObjectId').value;
    const nomeUsuario = document.getElementById('editNomeUsuario').value;
    const anoNascimento = document.getElementById('editAnoNascimento').value;
    const tipoPlano = document.getElementById('editTipoPlano').value;
    const sexo = document.getElementById('editSexo').value;

    const dadosAtualizados = {
        nome_usuario: nomeUsuario,
        ano_nascimento: anoNascimento,
        tipo_plano: tipoPlano,
        sexo: sexo
    };

    fetch(`https://parseapi.back4app.com/parse/classes/DadosAcademia11/${objectId}`, {
        method: 'PUT',
        headers: {
            'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc',
            'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário atualizado com sucesso:', data);
        alert('Usuário atualizado com sucesso!');
        visualizarUsuarios(); // Atualiza o gráfico após editar
    })
    .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário.');
    });
});

// Função para deletar um usuário
document.getElementById('deleteUsuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const objectId = document.getElementById('deleteObjectId').value;

    fetch(`https://parseapi.back4app.com/parse/classes/DadosAcademia11/${objectId}`, {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc',
            'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao deletar usuário.');
        }
    })
    .then(data => {
        console.log('Usuário deletado com sucesso:', data);
        alert('Usuário deletado com sucesso!');
        visualizarUsuarios(); // Atualiza o gráfico após deletar
    })
    .catch((error) => {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário.');
    });
});

// Função para visualizar os usuários e criar o gráfico
function visualizarUsuarios() {
    fetch('https://parseapi.back4app.com/parse/classes/DadosAcademia11/', {
        headers: {
            'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc',
            'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9'
        }
    })
    .then(response => response.json())
    .then(data => {
        const usuarios = data.results;
        const faixasEtarias = agruparPorFaixaEtaria(usuarios);
        desenharGrafico(faixasEtarias);
    })
    .catch((error) => {
        console.error('Erro ao visualizar usuários:', error);
        alert('Erro ao visualizar usuários.');
    });
}

// Chamar a função para exibir os gráficos assim que a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    visualizarUsuarios();


});

