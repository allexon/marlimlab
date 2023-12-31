export default function formatBrCoin(value: string): string {    
    var valor = value;
    
    valor = valor + '';
    valor = valor.replace(/[\D]+/g,'');
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
  
    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
  
    return `R$ ${valor}`
  }