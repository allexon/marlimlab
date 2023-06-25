export default function fnIsValidCep(cep : string){
    let _isValid = false
    let regex = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/
    _isValid = regex.test(cep)           
    return _isValid
}


