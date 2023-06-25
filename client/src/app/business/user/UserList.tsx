import { useEffect } from 'react'
import { ContainerList, ContainerItem, ContainerAvatar } from './styles'
import { layoutStore, userStore } from '../../../store/index'
import { fnMascaredCpf, fnMascaredCell, socket } from '../../../functions/index'

export default function UserList() {
    
    const layout = layoutStore(state => state)
    const user = userStore(state => state)
    
    useEffect(() => {
        user.fnResetUser()
        fnGetList()
    }, [])

    const fnGetList = async () => {
        socket.emit(user.IO_USER_LIST, '')        
        socket.on(user.IO_USER_LIST, (data : any) => {
            console.log('--- DATA LIST->', data)
            user.fnOnChangeUser('list', data)
        })
    }

    const fnEditUser = (i : number) => {
        let _user = user.list[i]
        console.log('--- USUÁRIO ->', _user)
        if(_user?.name) {
            user.fnOnChangeUser('_id', _user._id)
            user.fnOnChangeUser('id', _user.id)
            user.fnOnChangeUser('name', _user.name)
            user.fnOnChangeUser('password', _user.password)
            user.fnOnChangeUser('confirmPassword', _user.password)
            user.fnOnChangeUser('email', _user.email)
            user.fnOnChangeUser('cpf', _user.cpf? fnMascaredCpf(_user.cpf) : '')
            user.fnOnChangeUser('cep', _user.cep? _user.cep : '' )
            user.fnOnChangeUser('cell', _user.cell? fnMascaredCell(_user.cell) : '')
            user.fnOnChangeUser('rg', _user.rg? _user.rg : '')
            layout.fnOnChangeLayout('isVisibleForm', true)
        }
    }
    
    return (                        
        <ContainerList>
            <div style={{bottom:'10px', right:'10px', position:'absolute', width:'45px', height:'45px', borderRadius:'100%', backgroundColor:'#08623F'}}>
                <button 
                    onClick={() => {
                        let _list = user.list
                        user.fnResetUser();
                        user.fnOnChangeUser('list', _list);
                        layout.fnOnChangeLayout('isVisibleForm', true);
                    }} 
                    style={{backgroundColor:'transparent', width:'100%', height:'100%', borderRadius:'100%', color:'white', fontSize:'25px'}}>
                    +
                </button>
            </div>
            {
                user.list.length > 0 &&
                user.list.map((res : any, i) => {
                    return (
                        <ContainerItem key={i} onClick={() => fnEditUser(i)}>
                            <ContainerAvatar>
                                {res.avatar? <img src={res?.avatar} /> : <label></label>}
                                </ContainerAvatar>
                                <span>{res.name}</span>
                            </ContainerItem>
                    )
                })
            }
        </ContainerList>
    )
}