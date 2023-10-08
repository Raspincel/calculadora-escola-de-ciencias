// ------ Preparações ------

const listaDeNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const listaDeAcoesEspeciais = ['apagar', '=','Ac']
const inputDoUsuario = document.querySelector('.input-do-usuario h2')
const outputDoUsuario = document.querySelector('.output-do-usuario h1')
// ------ Símbolos especiais ------
// μ
// ﹡
// ·


// ------ Código ------
function adicionarValor(valor) {
    const naoEhOPrimeiroValorInserido = valoresInseridos.length !== 0
    const valorNaoEhUmNUmero = isNaN(valor)
    const ehUmaAcaoEspecial = listaDeAcoesEspeciais.includes(valor)

    if (valorNaoEhUmNUmero) {
        if (ehUmaAcaoEspecial) {
            realizarAcaoEspecial(valor)
        } else if (naoEhOPrimeiroValorInserido) {
            valoresInseridos.push(valor)
        } 
    } else {
        adicionarNumero(valor)
    }

    atualizarInput()
}

function realizarAcaoEspecial(acao) {
    if (acao === 'apagar') {
        apagarValor()
    } else if (acao === '=') {
        calcularResultado()
    } else if (acao === 'Ac') {
        limparValores()
    }
}

// ------ Operações ------
function calcularResultado() {
    const ultimoValor = valorMaisRecente()

    if (listaDeNumeros.includes(ultimoValor) === false) {
        return;
    }

    const tamanhoDaOperacao = valoresInseridos.length

    let resultado = Number(valoresInseridos[0])

    for (let i = 1; i < tamanhoDaOperacao; i += 2) {
        const operador = valoresInseridos[i]
        const numero2 = Number(valoresInseridos[i + 1])

        if (operador === '+') {
            resultado += numero2
        } else if (operador === '-') {
            resultado -= numero2
        } else if (operador === '﹡') {
            resultado *= numero2
        } else if (operador === '/') {
            resultado /= numero2
        }
    }

    outputDoUsuario.textContent = '= ' + resultado.toString()
}

function apagarValor() {
    const ultimoValor = valorMaisRecente();
    const quantidadeDeCaracteres = ultimoValor.length;

    const ultimoCaractere = ultimoValor[quantidadeDeCaracteres - 1];

    if (listaDeNumeros.includes(ultimoCaractere) === false) {
        valoresInseridos.pop();
        return
    }


    const tamanho = valoresInseridos.length;
    const novoUltimoValor = ultimoValor.slice(0, -1);
    valoresInseridos[tamanho - 1] = novoUltimoValor;
}

function limparValores() {
    valoresInseridos = []
    outputDoUsuario.textContent = '0'
}

// ------ Utilidades ------

function valorMaisRecente() {
    const tamanho = valoresInseridos.length
    const ultimoValor = valoresInseridos[tamanho - 1]

    return ultimoValor
}

function verificarSeEOMesmoNumero() {
    const ultimoNumero = valorMaisRecente()

    if (isNaN(Number(ultimoNumero))) {
        return false
    }

    return true
}

function adicionarNumero(numero) {
    const ehOPrimeiroValorInserido = valoresInseridos.length === 0

    if (ehOPrimeiroValorInserido) {
        valoresInseridos.push(numero)
        return
    }

    if (verificarSeEOMesmoNumero() === false) {
        valoresInseridos.push(numero)
        return
    }
    
    const ultimaPosicao = valoresInseridos.length - 1
    const ultimoNumero = valorMaisRecente()

    valoresInseridos[ultimaPosicao] = ultimoNumero + numero
}

function atualizarInput() {
    inputDoUsuario.textContent = valoresInseridos.join('')
}




// ------- Extra -------
const calcular = document.querySelector('.calcular')
const apagar = document.querySelector('.apagar')
const teclas = document.querySelectorAll('.teclas span')

for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('click', (e)=> {
        if (e.target.className === 'apagar') 
            return;

        adicionarValor(e.target.innerHTML)
    })
}

let valoresInseridos = []

calcular?.addEventListener('click', calcularResultado)
apagar?.addEventListener('click', ()=> { adicionarValor('apagar') })

export default {}