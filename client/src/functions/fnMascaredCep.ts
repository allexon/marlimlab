export default function fnMascaredCep(value : string){
    let cep: any    
    cep = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})/);
    value = !cep[1]? cep[1] : cep[1] + '.' + cep[2] + (cep[2] ? '-' : '') + cep[3]

    if(value == '') {
        value = value.replace(/[^0-9]/g, '')
    }
    
    return value
}

