export default function fnMascaredCpf(value : string){
    let cpf: any
    cpf = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    value = !cpf[2] ? cpf[1] : cpf[1] + '.' + cpf[2] + (cpf[3] ? '.' : '') + cpf[3] + (cpf[4] ? '-' + cpf[4] : '')
    
    if(value == '') {
        value = value.replace(/[^0-9]/g, '')
    }
    
    return value
}

