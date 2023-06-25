export default function fnDecript(password){
	var decriptPassword = ""
	var l
	var i
	var j=0
	var ch = process.env.DECRIPT_KEY
	console.log(':::::::::::::::::::::::::::::::: chave->', ch)
    
    function Asc(value){
        return value.charCodeAt(0)
    }
    
    function Chr(value){
        return String.fromCharCode(value)
    }
	
	 for (i=0; i<password.length;i++){
		j++
		l=(Asc(password.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50){
			j=1
		}
		if (l<0){
			l+=256
		}
		decriptPassword+=(Chr(l));
	}
    return decriptPassword
}
