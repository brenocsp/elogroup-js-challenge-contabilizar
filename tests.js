// Funções para testes do código desenvolvido em ServiceWorker.js
// A resposta do teste deve ser vista no menu console da ferramenta de desenvolvimento do browser

const executarTestes = () => {
    test_eCpfValido();
    test_recuperarSaldosPorConta();
    test_recuperarLancamentosPorCpf();
    test_recuperarMaiorMenorLancamentos();
    test_recuperarMaioresSaldos();
    test_recuperarMaioresMedias();
}

const lancamentosTeste = [   
    { cpf: '29025181023', valor: 1000 }, { cpf: '29025181023', valor: -200.55 }, { cpf: '29025181023', valor: 10 },
    { cpf: '41641397063', valor: 1000 }, { cpf: '41641397063', valor: 1302.3 }, { cpf: '41641397063', valor: 50 },
    { cpf: '74685591046', valor: -100 }, { cpf: '74685591046', valor: -1000.5 }, { cpf: '74685591046', valor: -5 },
    { cpf: '75279343013', valor: 90.5 }, { cpf: '75279343013', valor: 1200.45 },
    { cpf: '17942987035', valor: 1100 } 
];

const test_eCpfValido = () => {
    cpfInvalidos = ['12345678901', '12345678911', '11111111111', '99999999999', '17942987031'];
    for (let cpf of cpfInvalidos) {
        if (eCpfValido(cpf) != false) {
            return console.log('❌ eCpfValido');
        }
    }

    cpfValidos = ['29025181023', '41641397063', '74685591046', '75279343013', '33336755018'];
    for (let cpf of cpfValidos) {
        if (eCpfValido(cpf) != true) {
            return console.log('❌ eCpfValido');
        }
    }

    return console.log('✔️ eCpfValido');
}

const test_recuperarSaldosPorConta = () => {
    const saldosCorretos = [   
        { cpf: '29025181023', valor:   809.45 },
        { cpf: '41641397063', valor:  2352.30 },
        { cpf: '74685591046', valor: -1105.50 },
        { cpf: '75279343013', valor:  1290.95 },
        { cpf: '17942987035', valor:     1100 } 
    ];

    if (JSON.stringify(recuperarSaldosPorConta(lancamentosTeste)) != JSON.stringify(saldosCorretos)) {
        return console.log('❌ recuperarSaldosPorConta');
    }

    return console.log('✔️ recuperarSaldosPorConta');
}

const test_recuperarLancamentosPorCpf = () => {
    const cpf1 = '29025181023';
    const lancamentoCpf1 = [{ cpf: '29025181023', valor: 1000 }, { cpf: '29025181023', valor: -200.55 }, { cpf: '29025181023', valor: 10 }];

    const cpf2 = '17942987035';
    const lancamentoCpf2 = [{ cpf: '17942987035', valor: 1100 } ];

    if (JSON.stringify(recuperarLancamentosPorCpf(cpf1, lancamentosTeste)) != JSON.stringify(lancamentoCpf1)) {
        return console.log('❌ recuperarLancamentosPorCpf');
    }

    if (JSON.stringify(recuperarLancamentosPorCpf(cpf2, lancamentosTeste)) != JSON.stringify(lancamentoCpf2)) {
        return console.log('❌ recuperarLancamentosPorCpf');
    }

    // Caso em que se passa um CPF inexistente
    if (JSON.stringify(recuperarLancamentosPorCpf('cpfInexistente', lancamentosTeste)) != JSON.stringify([])) {
        return console.log('❌ recuperarLancamentosPorCpf');
    }

    return console.log('✔️ recuperarLancamentosPorCpf');
}

const test_recuperarMaiorMenorLancamentos = () => {
    const resultadosEsperados = [
        [{ cpf: '29025181023', valor: -200.55 }, { cpf: '29025181023', valor: 1000 }],
        [{ cpf: '41641397063', valor: 50 },      { cpf: '41641397063', valor: 1302.3 }],
        [{ cpf: '74685591046', valor: -1000.5 }, { cpf: '74685591046', valor: -5 }],
        [{ cpf: '75279343013', valor: 90.5    }, { cpf: '75279343013', valor: 1200.45 }],
        [{ cpf: '17942987035', valor: 1100 },    { cpf: '17942987035', valor: 1100 }]
    ];

    for (let resultado of resultadosEsperados) {
        if (JSON.stringify(recuperarMaiorMenorLancamentos(resultado[0].cpf, lancamentosTeste)) != JSON.stringify(resultado)) {
            return console.log('❌ recuperarMaiorMenorLancamentos');
        }
    }

    // Caso em que se passa um CPF inexistente
    if (JSON.stringify(recuperarMaiorMenorLancamentos('cpfInexistente', lancamentosTeste)) != JSON.stringify([])) {
        return console.log('❌ recuperarMaiorMenorLancamentos');
    }

    return console.log('✔️ recuperarMaiorMenorLancamentos');
}

const test_recuperarMaioresSaldos = () => {
    const maioresSaldos = [   
        { cpf: '41641397063', valor:  2352.30 },
        { cpf: '75279343013', valor:  1290.95 },
        { cpf: '17942987035', valor:     1100 } 
    ];

    if (JSON.stringify(recuperarMaioresSaldos(lancamentosTeste)) != JSON.stringify(maioresSaldos)) {
        return console.log('❌ recuperarMaioresSaldos');
    }

    return console.log('✔️ recuperarMaioresSaldos');
}

const test_recuperarMaioresMedias = () => {
    const maioresMedias = [   
        { cpf: '17942987035', valor:  1100 },
        { cpf: '41641397063', valor:  784.1 },
        { cpf: '75279343013', valor:  645.475 } 
    ];

    if (JSON.stringify(recuperarMaioresMedias(lancamentosTeste)) != JSON.stringify(maioresMedias)) {
        return console.log('❌ recuperarMaioresMedias');
    }

    return console.log('✔️ recuperarMaioresMedias');
}
