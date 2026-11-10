const input = document.getElementById("input");
const nomeDiv = document.getElementById("nome");
const partidoDiv = document.getElementById("partido");
const ufDiv = document.getElementById("uf");
const foto = document.getElementById("foto");
const despesas = document.getElementById("despesas");

async function api(nome) {
    if (nome.toLowerCase() === "vorcaro") { 
        nomeDiv.textContent = "Nome: Dani";
        partidoDiv.textContent = "Partido: Banco Master";
        ufDiv.textContent = "UF: Ucrania pq elas sao faceis";
        foto.src = "dani.webp";
        foto.style.display = "block";
        despesas.textContent = "Despesas: Black Horse"

    } else if (nome.toLowerCase() === "lobao" || nome.toLowerCase() === "lobão") { 
        nomeDiv.textContent = "Nome: Lobão";
        partidoDiv.textContent = "Partido: xvideos/MDB";
        ufDiv.textContent = "UF: Maceió rapaz";
        foto.src = "lobao.jpeg";
        foto.style.display = "block";
        despesas.textContent = "Despesas: Ciclofaixa, Ponto do Suco e mulher"
                
    } else {
        const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${nome}&ordem=ASC&ordenarPor=nome`;
        try {
            const resposta = await fetch(url);
            if (!resposta.ok) {
                throw new Error(`Requisição deu erro! ${resposta.status}`);
            }

            const json = await resposta.json();
            
            if (json.dados.length === 0) {
                nomeDiv.textContent = "";
                partidoDiv.textContent = "Nenhum deputado encontrado.";
                ufDiv.textContent = "";
                foto.src = ""; 
                foto.style.display = "none"; 
                despesas.textContent = "";
                return;
            }

            const deputado = json.dados[0];
            if (nome.toLowerCase() === "nikolas" ) {
                nomeDiv.textContent = "Nome: Chupetinha";
                partidoDiv.textContent = "Partido: " + deputado.siglaPartido;
                ufDiv.textContent = "UF: " + deputado.siglaUf;
                    
                foto.src = deputado.urlFoto; 
                foto.alt = "Foto de " + deputado.nome;
                foto.style.display = "block";
                
                let variavel = deputado.id;
                const anoConsulta = 2026; // Ou 2025 para dados já consolidados

                try {
                    // É essencial incluir o cabeçalho 'accept: application/json'
                    const resposta = await fetch(
                        `https://dadosabertos.camara.leg.br/api/v2/deputados/${variavel}/despesas?ano=${anoConsulta}&itens=100&ordem=ASC&ordenarPor=ano`, 
                        {
                            headers: {
                                'accept': 'application/json'
                            }
                        }
                    );

                    const dadosDespesas = await resposta.json();

                    // Log para depuração caso precise inspecionar no F12
                    console.log(`Despesas do ID ${variavel}:`, dadosDespesas);

                    if (dadosDespesas.dados && dadosDespesas.dados.length > 0) {
                        const totalDespesas = dadosDespesas.dados.reduce((total, item) => total + item.valorLiquido, 0);
                        despesas.textContent = `Despesas (${anoConsulta}): ` + totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    } else {
                        despesas.textContent = `Despesas (${anoConsulta}): Sem lançamentos para este ano.`;
                    }
                } catch (erro) {
                    console.error("Erro no fetch:", erro);
                    despesas.textContent = "Erro ao carregar dados.";
                }

                console.log("ID:", deputado.id);
            
            } else {
                nomeDiv.textContent = "Nome: " + deputado.nome;
                partidoDiv.textContent = "Partido: " + deputado.siglaPartido;
                ufDiv.textContent = "UF: " + deputado.siglaUf;
                
                foto.src = deputado.urlFoto; 
                foto.alt = "Foto de " + deputado.nome;
                foto.style.display = "block";
                
                let variavel = deputado.id;
                const anoConsulta = 2026; // Ou 2025 para dados já consolidados

                try {
                    // É essencial incluir o cabeçalho 'accept: application/json'
                    const resposta = await fetch(
                        `https://dadosabertos.camara.leg.br/api/v2/deputados/${variavel}/despesas?ano=${anoConsulta}&itens=100&ordem=ASC&ordenarPor=ano`, 
                        {
                            headers: {
                                'accept': 'application/json'
                            }
                        }
                    );

                    const dadosDespesas = await resposta.json();

                    // Log para depuração caso precise inspecionar no F12
                    console.log(`Despesas do ID ${variavel}:`, dadosDespesas);

                    if (dadosDespesas.dados && dadosDespesas.dados.length > 0) {
                        const totalDespesas = dadosDespesas.dados.reduce((total, item) => total + item.valorLiquido, 0);
                        despesas.textContent = `Despesas (${anoConsulta}): ` + totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    } else {
                        despesas.textContent = `Despesas (${anoConsulta}): Sem lançamentos para este ano.`;
                    }
                } catch (erro) {
                    console.error("Erro no fetch:", erro);
                    despesas.textContent = "Erro ao carregar dados.";
                }

                console.log("ID:", deputado.id);
            }

        } catch (erro){
            console.error("Falha ao buscar", erro);
            nomeDiv.textContent = "";
            partidoDiv.textContent = "Erro ao buscar dados.";
            ufDiv.textContent = "";
            despesas.textContent = "";

            foto.src = "";
            foto.style.display = "none";
        }
    } 
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let valor = event.target.value.trim();
        
        if (valor !== "") {
            api(valor);
        }
        
        event.target.value = "";
    }
});