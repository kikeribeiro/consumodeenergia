// Função para gerar dinamicamente os campos das residências
function gerarCamposResidencias() {
    const numCasas = parseInt(document.getElementById('numCasas').value);
    const residenciasContainer = document.getElementById('residenciasContainer');
    residenciasContainer.innerHTML = ''; // Limpa campos anteriores

    // Gera os campos de leitura para cada residência
    for (let i = 1; i <= numCasas; i++) {
        residenciasContainer.innerHTML += `
            <div class="residencia">
                <h3>Casa ${i}</h3>
                <div class="leituras">
                    <div>
                        <label for="kvhAtual${i}">Leitura atual (KVH):</label>
                        <input type="number" id="kvhAtual${i}" required>
                    </div>
                    <div>
                        <label for="kvhAnterior${i}">Leitura mês anterior (KVH):</label>
                        <input type="number" id="kvhAnterior${i}" required>
                    </div>
                </div>
            </div>
        `;
    }
}

// Função para calcular o consumo de cada casa e exibir os resultados
function calcularConsumo() {
    const kvhOperadora = parseFloat(document.getElementById('kvhOperadora').value);
    const valorOperadora = parseFloat(document.getElementById('valorOperadora').value);
    const numCasas = parseInt(document.getElementById('numCasas').value);

    let consumoTotal = 0;
    let leituras = [];

    // Calcula o consumo de cada casa e armazena em leituras[]
    for (let i = 1; i <= numCasas; i++) {
        const kvhAtual = parseFloat(document.getElementById(`kvhAtual${i}`).value);
        const kvhAnterior = parseFloat(document.getElementById(`kvhAnterior${i}`).value);
        const consumo = kvhAtual - kvhAnterior;

        leituras.push({ atual: kvhAtual, anterior: kvhAnterior, consumo: consumo });
        consumoTotal += consumo;
    }

    // Cálculo da diferença (parcela adicional)
    const parcelaAdicional = kvhOperadora - consumoTotal;
    const diferencaPorCasa = parcelaAdicional / numCasas; // Diferença dividida entre todas as casas

    // Exibe o resultado de cada casa
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '<h2>Resultados</h2>'; // Limpa resultados anteriores

    for (let i = 0; i < leituras.length; i++) {
        const consumo = leituras[i].consumo;
        const percentual = (consumo / consumoTotal) * 100;
        const consumoReais = (valorOperadora / kvhOperadora) * consumo;

        // Cálculo da diferença
        const diffPercentual = (diferencaPorCasa / consumoTotal) * 100;
        const diffReais = (valorOperadora / kvhOperadora) * diferencaPorCasa;
        const totalReais = consumoReais + diffReais;

        // Exibe o resultado da casa
        resultadosDiv.innerHTML += `
        <h3>*Casa ${i + 1}: *</h3>
        <p>Consumo em KVH: ${consumo.toFixed(2)} | Percentual em KVH: ${percentual.toFixed(2)}%</p>
        <p>Consumo em reais: R$ ${consumoReais.toFixed(2)}</p>
        <p>Diferença em KVH para o 100% da casa ${i + 1}: ${diferencaPorCasa.toFixed(2)} kWh</p>
        <p>Diferença em reais para o 100% da casa ${i + 1}: R$ ${diffReais.toFixed(2)}</p>
        <strong>Total a ser pago pela casa ${i + 1}: R$ ${totalReais.toFixed(2)}</strong>
        <p>***************</p>
        `;
    }
}
