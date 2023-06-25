export default function fnMascaredOnlyNumber(value : string){
    let val = ''
    if(value) {
        val = value.replace(/\D/g,"")
    }    
    return String(val)
}