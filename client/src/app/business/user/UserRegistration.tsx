import { useEffect, useRef } from 'react'
import { BoxButton } from './styles'
import { messageStore, userStore } from '../../../store/index'
import { Button, Input, FormDefault} from '../../default/index'
import { fnMascaredCpf, socket, fnMascaredOnlyNumber, fnIsValidEmail, fnIsValidCpf, fnIsValidCep, fnMascaredCell } from '../../../functions/index'

export default function UserRegistration() {
    
    const user = userStore(state => state)
    const message = messageStore(state => state)

    // Ref
    const nameRef : any = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)    
    const cellRef = useRef<HTMLInputElement>(null)
    const rgRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        fnValidPassword()
        fnValidName()
        fnValidEmail()
        fnValidCpf()
        fnValidZipCode()        
    }, [user.password, user.confirmPassword, user.name, user.email, user.cpf, user.zipCode, user.response])
    
    const fnValidPassword = () => {
        let _isEmpty = (user.password || user.confirmPassword) == ''
        let _isLenght = (user.password || user.confirmPassword).length < 6
        let _isEquals = (user.password === user.confirmPassword)
        
        if(_isEmpty) {
            user.fnOnChangeUser('isValidPassword', null)
            user.fnOnChangeUser('isValidConfirmPassword', null)
        } else {
            if(!_isEmpty && _isLenght) {
                user.fnOnChangeUser('isValidPassword', false)
                user.fnOnChangeUser('isValidConfirmPassword', false)
            } else {
                if(!_isEmpty && !_isLenght && _isEquals) {
                    user.fnOnChangeUser('isValidPassword', true)
                    user.fnOnChangeUser('isValidConfirmPassword', true)
                } else {
                    user.fnOnChangeUser('isValidPassword', false)
                    user.fnOnChangeUser('isValidConfirmPassword', false)
                }
            }
        } 
    }

    const fnValidName = () => {
        let _isvalid1  = user.name == ''        
        let _isValid3  = (user.name != '' && user.name?.split(' ').length >= 2 && user.name?.split(' ')[0]?.length > 2 && user.name?.split(' ')[1]?.length >= 2)

        if(_isvalid1) {
            user.fnOnChangeUser('isValidName', null)
        }
        
        if(!_isvalid1 && !_isValid3) {
            user.fnOnChangeUser('isValidName', false)
        }

        if(!_isvalid1 && _isValid3) {
            _isValid3 && user.fnOnChangeUser('isValidName', true)
        }
    }

    const fnValidEmail = () => {
        let _isvalid1  = user.email == ''        
        let _isValid3  = fnIsValidEmail(user.email)

        _isvalid1 && user.fnOnChangeUser('isValidEmail', null)
        
        if(!_isvalid1 && !_isValid3) {
            user.fnOnChangeUser('isValidEmail', false)
        }

        if(!_isvalid1 && _isValid3) {
            _isValid3 && user.fnOnChangeUser('isValidEmail', true)
        }
    }

    const fnValidCpf = () => {
        let _isvalid1  = user.cpf == ''        
        let _isValid3  = fnIsValidCpf(user.cpf)

        _isvalid1 && user.fnOnChangeUser('isValidCpf', null)
        
        if(!_isvalid1 && !_isValid3) {
            user.fnOnChangeUser('isValidCpf', false)
        }

        if(!_isvalid1 && _isValid3) {
            _isValid3 && user.fnOnChangeUser('isValidCpf', true)
        }
    }

    const fnValidZipCode = () => {
        let _isvalid1  = user.zipCode == ''        
        let _isValid3  = fnIsValidCep(user.zipCode)

        _isvalid1 && user.fnOnChangeUser('isValidZipCode', null)
        
        if(!_isvalid1 && !_isValid3) {
            user.fnOnChangeUser('isValidZipCode', false)
        }

        if(!_isvalid1 && _isValid3) {
            _isValid3 && user.fnOnChangeUser('isValidZipCode', true)
        }
    }

    const fnSubmit = (e : any) => {
        e.preventDefault()
        if(user.isValidName == null || !user.isValidName) {
            message.fnError(<span>O Campo <b>[ Nome ]</b> inválido!</span>)
            return;
        }

        if(user.isValidPassword == null || !user.isValidPassword || user.isValidConfirmPassword == null || !user.isValidConfirmPassword) {            
            message.fnError(<span>O Campo <b>[ Senha e Confirma senha ]</b> inválido!</span>)
            return;
        }

        if(user.isValidEmail == null || !user.isValidEmail) {            
            message.fnError(<span>O Campo <b>[ E-mail ]</b> inválido!</span>)
            return;
        }

        if(user?._id) {
            if(user.isValidCpf == null || !user.isValidCpf) {            
                message.fnError(<span>O Campo <b>[ CPF ]</b> inválido!</span>)
                return;
            }
    
            if(user.isValidZipCode == null || !user.isValidZipCode) {            
                message.fnError(<span>O Campo <b>[ CEP ]</b> inválido!</span>)
                return;
            }
    
            if(user.cell == '' || !user.cell) {            
                message.fnError(<span>O Campo <b>[ Celular ]</b> inválido!</span>)
                return;
            }
    
            if(user.rg == '' || !user.rg) {            
                message.fnError(<span>O Campo <b>[ RG ]</b> inválido!</span>)
                return;
            }
        }

        let _obj = {
            _id:        user._id,
            id:         !user.id? user.list.length+1 : user.id,
            name:       user.name.toUpperCase()?.trim(),
            email:      user.email.toLowerCase()?.trim(),
            password:   user.password,
            avatar:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
            cpf:        user.cpf? fnMascaredOnlyNumber(user.cpf) : null,
            rg:         user.rg? parseInt(fnMascaredOnlyNumber(user.rg)) : null,
            rgLocal:    user.rgLocal == ''? user.rgLocal : null ,
            cell:       user.cell? parseInt(fnMascaredOnlyNumber(user.cell)) : null,
            address:    []
        }


        const fnNewUpdateUser = (obj : any) => {
            let _ioMessage = null
            
            !user.id? 
                _ioMessage = user.IO_USER_UPDATE :
                _ioMessage = user.IO_USER_UPDATE

            socket.emit(_ioMessage, {..._obj})
            socket.on(_ioMessage, (res) => {
                if(res.type == 'success') {
                    message.fnSuccess(res.message)
                    socket.emit(user.IO_USER_LIST, '')
                    user.fnResetUser()
                } else {
                    if(res.type == 'error') {
                        console.log('----- error ->', res.error)
                        message.fnError(res.message)
                    } else {                    
                        message.fnInfo(res.message)
                    }
                }
            })
        }
        console.log('Objeto para Inclusão ->', _obj)
        fnNewUpdateUser(_obj)
       
        socket.on(user.IO_USER_LIST, (data) => {
            user.fnOnChangeUser('list', data)
        })
    }

    return (
        <FormDefault>
            <Input 
                label='Nome' 
                value={user.name} 
                fnOnChange={(e) => user.fnOnChangeUser('name', e.target.value)} 
                ref={nameRef} 
                fnOnPress={() => passwordRef.current?.focus()}
                isValidInput={user.isValidName}                 
                autoFocus 
            />

            <Input 
                label='Senha' 
                value={user.password} 
                fnOnChange={(e) => user.fnOnChangeUser('password', e.target.value)} 
                ref={passwordRef} 
                fnOnPress={() => confirmPasswordRef.current?.focus()}   
                isValidInput={user.isValidPassword}         
                type={user.password == ''? 'text' : 'password'}         
                width='48%' 
                placeholder={'Mínimo de 6 caracteres!'} 
            />

            <Input 
                label='Confirmar Senha' 
                value={user.confirmPassword} 
                fnOnChange={(e) => user.fnOnChangeUser('confirmPassword', e.target.value)} 
                ref={confirmPasswordRef}    
                fnOnPress={() => emailRef.current?.focus()}
                isValidInput={user.isValidConfirmPassword}  
                type={user.confirmPassword == ''? 'text' : 'password'}  
                width='48%' 
                placeholder={'Mínimo de 6 caracteres!'} 
            />

            <Input 
                label='E-mail' 
                value={user.email} 
                fnOnChange={(e) => user.fnOnChangeUser('email', e.target.value)} 
                ref={emailRef} 
                fnOnPress={() => cpfRef.current?.focus()} 
                isValidInput={user.isValidEmail} 
            />
            
            <Input 
                label='CPF' 
                value={user.cpf} 
                fnOnChange={(e) => user.fnOnChangeUser('cpf', fnMascaredCpf(e.target.value))}   
                ref={cpfRef} 
                width='48%'    
                fnOnPress={() => rgRef.current?.focus()}
                isValidInput={user.isValidCpf} 
                placeholder={'999.999.999-99'} 
            />

           <Input 
                label='RG' 
                value={user.rg} 
                fnOnChange={(e) => user.fnOnChangeUser('rg', e.target.value)}
                ref={rgRef} 
                width='48%'
                fnOnPress={() => cellRef.current?.focus()} 
                isValidInput={user.isValidRg} 
            />

            <Input 
                label='Telefone' 
                value={user.cell} 
                fnOnChange={(e) => user.fnOnChangeUser('cell', fnMascaredCell(e.target.value))} 
                ref={cellRef} 
                //width='48%'
                fnOnPress={() => nameRef.current?.focus()} 
                isValidInput={user.isValidCell} 
                placeholder={'(99) 99999-9999'} 
            />

            <BoxButton style={{justifyContent:'center'}}>
                <Button className={(message.isLoading) && 'button-disable'} onClick={(e) => fnSubmit(e)}>Salvar</Button>
            </BoxButton>

        </FormDefault>
    )
}