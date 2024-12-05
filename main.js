document.addEventListener("DOMContentLoaded", () => {
    // Referência ao elemento canvas do gráfico
    const ctx4 = document.getElementById("chart1").getContext("2d");

    // Inicialização básica do gráfico vazio
    const chart4 = new Chart(ctx4, {
        type: "pie",
        data: {
            labels: [], // Inicialmente vazio
            datasets: [{
                label: "Dados",
                data: [], // Inicialmente vazio
                backgroundColor: ["#5056BF", "#65A6FA", "#6D74F2", "#9B57CC", "#00CADC"],
                borderColor: "#FFFFFF",
                borderWidth: 2
            }]
        }
    });

    // Função para carregar os dados da API e atualizar o gráfico
    function carregarDadosGrafico() {
        fetch('https://parseapi.back4app.com/parse/classes/academia', {
            headers: {
                'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc', // ID da aplicação
                'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9'  // Chave da API
            }
        })
        .then(response => response.json())
        .then(data => {
            const labels = [];
            const data_chart = [];

            // Adicionando os dados recebidos ao gráfico
            const resultados = data.results || data;
            resultados.forEach(item => {
                labels.push(item.Ano_Nascimento);
                data_chart.push(parseInt(item.data_ano, 10));
            });

            // Atualizando os dados do gráfico
            chart4.data.labels = labels;
            chart4.data.datasets[0].data = data_chart;
            chart4.update(); // Atualiza o gráfico
        })
        .catch(error => {
            console.error("Erro ao carregar dados do gráfico:", error);
        });
    }

    // Carregar dados ao iniciar
    carregarDadosGrafico();

    // Atualizar gráfico após operações de CRUD
    document.getElementById('dadosForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const Ano_Nascimento = document.getElementById('Ano_Nascimento').value;
        const Sexo = document.getElementById('Sexo').value;

        fetch('https://parseapi.back4app.com/parse/classes/DadosEscolares', {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'KJysEo3tS2iG6pVFrydAlvJxPq6ardyKA1aKx0Sc', // ID da aplicação
                'X-Parse-REST-API-Key': 'f72kkTjOebFsMwoDeiODU8nN42kERFrocwS7WWd9'  // Chave da API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Data_Nascimento : Data_Nascimento, Sexo: Sexo })
        })
        .then(() => {
            alert("Dados adicionados com sucesso!");
            carregarDadosGrafico(); // Recarregar gráfico
        })
        .catch(error => {
            console.error("Erro ao adicionar dados:", error);
        });
    });

    // Adicione eventos semelhantes para 'editarForm' e 'deletarForm'
});
