const label_resultado = document.getElementById("painel_resultado")

const calculadora = {
  digitado: [],
  ordem: ['*','/','+','-'],
  acoes: {
    C: () => {
      calculadora.digitado = []
      calculadora.atualizaLabel('0')
    },
    back: () => {
      calculadora.digitado.pop()
      let textoNovo = calculadora.digitado.join('')
      calculadora.atualizaLabel((textoNovo == '') ? '0' : textoNovo)
    },
    '=': () => {
      let array = calculadora.digitado
      let indicesOperacoes = []
      array.forEach((value,key) => {
        //se o valor é igual às operações
        if(calculadora.ordem.indexOf(value) >= 0) {
          indicesOperacoes.push(key)
        }
      });
      //por enquanto, apenas com operações a,b
      if(indicesOperacoes.length == 1){
        let operacao = calculadora.digitado[indicesOperacoes[0]]
        let a = '', b = ''
        for(let i = 0; i < calculadora.digitado.length; i++) {
          if(i < indicesOperacoes[0])
            a += calculadora.digitado[i]
          else if(i != indicesOperacoes[0])
            b += calculadora.digitado[i]
        }
        a = a.replace(',','.')
        b = b.replace(',','.')
        let resultado = calculadora.operacoes[operacao](parseFloat(a),parseFloat(b))
        calculadora.digitado = [resultado.toString().replace('.',',')]
        calculadora.atualizaLabel(resultado.toString().replace('.',','))
        return
      }
      
    }
  },
  operacoes: {
    '+': (a,b) => {
      return a + b
    },
    '-': (a,b) => {
      return a - b
    },
    '/': (a,b) => {
      return a/b
    },
    '*': (a,b) => {
      return a * b
    }
  },
  atualizaLabel: (text) => {
    label_resultado.innerText = text
  }
}

const setValor = (tecla) => {
  let acoes = Object.keys(calculadora.acoes)
  if(acoes.indexOf(tecla) > -1){
    calculadora.acoes[tecla]()
    return
  }

  calculadora.digitado.push(tecla)

  if(label_resultado.innerText == '0') {
    calculadora.atualizaLabel(tecla)
    return
  }
  calculadora.atualizaLabel(label_resultado.innerText + tecla)
}