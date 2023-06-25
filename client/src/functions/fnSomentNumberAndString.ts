export default function fnSomentNumberAndString(value : string){
    var _value = value
    let _regex = /[^a-z0-9]/gi
    _value = _value.replace(_regex, "")
    return _value
}

