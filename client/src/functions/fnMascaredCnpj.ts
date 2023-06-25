export default function fnMascaredCnpj(value : string){
    let cnpj: any
    cnpj = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/)
    value = !cnpj[2] ? cnpj[1] : cnpj[1] + '.' + cnpj[2] + (cnpj[3] ? '.' : '') + cnpj[3] + (cnpj[4] ? '/' : cnpj[4]) + cnpj[4] + (cnpj[5] ? '-' + cnpj[5] : '')
    
    if(value == '') {
        value = value.replace(/[^0-9]/g, '')
    }
    
    return value
}

