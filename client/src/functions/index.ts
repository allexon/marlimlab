import { socket } from './fnSocket'

import fnMascared from './fnMascared'
import fnMascaredCpf from './fnMascaredCpf'
import fnMascaredCnpj from './fnMascaredCnpj'
import fnMascaredCep from './fnMascaredCep'
import fnMascaredOnlyNumber from './fnMascaredOnlyNumber'
import fnIsValidEmail from './fnIsValidEmail'
import fnIsValidCpf from './fnIsValidCpf'
import fnIsValidCep from './fnIsValidCep'
import fnMascaredCell from './fnMascaredCell'
import fnSomentNumberAndString from './fnSomentNumberAndString'
import fnFormatBrCoin from './fnFormatBrCoin'
import fnUsdToBrCoin from './fnUsdToBrCoin'
import fnBrToUsdCoin from './fnBrToUsdCoin'

export { 
    fnMascared, fnMascaredCpf, fnMascaredCnpj, 
    fnMascaredCep, fnMascaredOnlyNumber, 
    fnIsValidEmail, fnIsValidCpf, fnIsValidCep, 
    fnMascaredCell, socket, fnSomentNumberAndString,
    fnFormatBrCoin, fnUsdToBrCoin, fnBrToUsdCoin
}