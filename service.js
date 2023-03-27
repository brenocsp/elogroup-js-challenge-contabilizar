const validarEntradaDeDados = (lancamento) => {
   let mensagens = [];

   const contemApenasNumeros = /^\d+$/.test(lancamento.cpf);
   if (!contemApenasNumeros) {
      mensagens.push('CPF deve conter apenas caracteres numéricos.');
   }

   else if (!eCpfValido(lancamento.cpf)) {
      mensagens.push('Os dígitos verificadores do CPF devem ser válidos.');
   }

   const eNumero = (typeof lancamento.valor == 'number');
   if (!eNumero) {
      mensagens.push('Valor deve ser numérico.');
   }
   
   else if (lancamento.valor > 15000) {
      mensagens.push('Valor não pode ser superior a 15000,00.');
   }

   else if (lancamento.valor < -2000) {
      mensagens.push('Valor não pode ser inferior a -2000,00.');
   }

   if (mensagens.length > 0) {
      return mensagens.join('\r\n');;
   }
   
   return null;
}


const eCpfValido = (cpf) => {
   if (cpf.length != 11) {
      return false;
   }

   // Verifica se o CPF possui todos os dígitos iguais
   if (cpf.split('').every(char => char === cpf[0])) {
      return false;
   }

   // Validação do primeiro dígito:
   let soma = 0;
   for (let i = 0; i < 9; i++) {
      const digito = Number(cpf.charAt(i));
      soma = soma + (digito * (10 - i));
   }

   let digito1Calculado = 11 - (soma % 11);
   if (digito1Calculado > 9) {
      digito1Calculado = 0;
   }

   const digito1Entrada = Number(cpf.charAt(9));

   if (digito1Entrada != digito1Calculado) {
      return false;
   }

   // Validação do segundo dígito:
   soma = 0;
   for (let i = 0; i < 10; i++) {
      const digito = Number(cpf.charAt(i));
      soma = soma + (digito * (11 - i));
   }

   let digito2Calculado = 11 - (soma % 11);
   if (digito2Calculado > 9) {
      digito2Calculado = 0;
   }

   const digito2Entrada = Number(cpf.charAt(10));

   if (digito2Entrada != digito2Calculado) {
      return false;
   }

   return true;
}

const recuperarSaldosPorConta = (lancamentos) => {
   const saldos = lancamentos.reduce((acum, atual) => {
      const lancamento = acum.find(({ cpf }) => cpf === atual.cpf);

      if (lancamento) { 
         lancamento.valor += atual.valor;
      }
      
      else {
         acum.push( {cpf: atual.cpf, valor: atual.valor} );
      }

      return acum;
   }, []);
   
   return saldos;
}

const recuperarLancamentosPorCpf = (cpf, lancamentos) => {
   const saldosDoCpf = lancamentos.filter(obj => {
      return obj.cpf === cpf;
   });

   return saldosDoCpf;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   const lancamentosDoCpf = recuperarLancamentosPorCpf(cpf, lancamentos);

   if (lancamentosDoCpf.length == 0) {
      return [];
   }

   const menorLancamento = lancamentosDoCpf.reduce((acum, atual) => acum.valor < atual.valor ? acum : atual);
   const maiorLancamento = lancamentosDoCpf.reduce((acum, atual) => acum.valor > atual.valor ? acum : atual);

   return [menorLancamento, maiorLancamento];
}

const recuperarMaioresSaldos = (lancamentos) => {
   const saldos = recuperarSaldosPorConta(lancamentos);

   saldos.sort((a,b) => b.valor - a.valor); 

   return saldos.slice(0, 3);
}

const recuperarMaioresMedias = (lancamentos) => {
   const saldos = recuperarSaldosPorConta(lancamentos);

   const mediaDeLancamentos = Object.keys(saldos).map(function(k){
      const item  = saldos[k];
      const lancamentosDoCpf = recuperarLancamentosPorCpf(item.cpf, lancamentos);

      return { cpf: item.cpf, valor: (item.valor/lancamentosDoCpf.length) }
  })
   
  mediaDeLancamentos.sort((a,b) => b.valor - a.valor); 
  
  return mediaDeLancamentos.slice(0, 3);
}