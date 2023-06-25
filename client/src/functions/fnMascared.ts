export default function fnMascared(value : string){    
    let _regex = /[a-zA-Z0-9]/g
    let _result = value.replace(_regex, "🔑")
    return _result
}