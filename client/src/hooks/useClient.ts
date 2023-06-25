import { useEffect } from 'react'
import { fnSomentNumberAndString, socket } from '../functions/index'
import { clientStore, messageStore, addressStore, layoutStore } from '../store/index'
import ClientCompanyList from '../app/business/client/company/ClientCompanyList'

export default function useClient()  {

  const client = clientStore(state => state)
  const message = messageStore(state => state)
  const address = addressStore(state => state)
  const layout = layoutStore(state => state)

  useEffect(() => {
    return () => {
      fnResetIOs()
    }
  }, [])

  const fnResetIOs = () => {
      setTimeout(() => {
          socket.off(client.IO_CLIENT_NEW_UPDATE)
          socket.off(client.IO_CLIENT_LIST)
      }, 1000)
  }

  const fnGetClientList = async () => {    
    if (!socket.hasListeners(client.IO_CLIENT_LIST)) {
      socket.on(client.IO_CLIENT_LIST, (data : any) => {
        client.fnReset()
        layout.isVisibleForm = false
        client.fnOnChange('list', data)
      })
    }
    socket.emit(client.IO_CLIENT_LIST)
  }

  const fnGetClientFindOne = async (_id : string) => {        
    socket.emit(client.IO_CLIENT_FIND, _id)
    socket.on(client.IO_CLIENT_FIND, (data : any) => {        
        client.fnOnChange('dataRegister', data)
    })
  }

  const fnOnChangeClientDataRegister = (field: string, value: any) => {
    let _dataRegister = client.dataRegister
      //@ts-ignore
      _dataRegister[0][field] = value
       client.fnOnChange('dataRegister', _dataRegister)
  }

  // i: é um indice dinamico
  // Esta Função faz onChange em values da empresa exemplo -> client.dataRegister[0].CLIENTE_EMPRESAS[i][RAZAO_SOCIAL]
  const fnOnChangeClientCompanies = (field: string, value: any, i:number) => {
    let _dataRegister = client.dataRegister
    //@ts-ignore
    _dataRegister[0]['CLIENTE_EMPRESAS'][i][field] = value
    client.fnOnChange('dataRegister', _dataRegister)
}

const fnBackCompanyList = () => {  
  client.fnOnChange('activeComponent', ClientCompanyList)
  client.fnOnChange('activeIdSubMenu', 2);
  client.fnOnChange('title', 'EMPRESAS');
  client.fnOnChange('subTitle', 'Lista de Empresas');
  client.fnOnChange('isOpenClientRegistration', false)
}

  const fnGetClientLogado = async () => {
    // ainda falta ajustar   essa função logado 
    //let _dataRegister = client.list[0]    
    layout.fnOnChangeLayout('isVisibleSidebarContext', false)
    layout.fnOnChangeLayout('isVisibleForm', true)
    client.fnOnChange('activeIdSubMenu', 0)
    client.fnOnChange('activeComponent', 'meus-dados')
    client.fnOnChange('dataRegister', client.dataRegister)
    
    // ajuster este socket quando tiver login cliente
    // //socket.emit(client.IO_CLIENT_FIND, '6403e07106d50a41c416da22')
    // socket.on(client.IO_CLIENT_FIND, (data : any) => {
    //     if(data) {
    //       client.fnOnChange('dataRegister', client.dataRegister > 0? client.dataRegister[0] : null)
    //     }
    // })
  }

  const fnSubmitClient = () => {    
    client.fnOnChange('loading', true)
    client.dataRegister[0].CLIENTE_CPF = fnSomentNumberAndString(client.dataRegister[0].CLIENTE_CPF)
    client.dataRegister[0].CLIENTE_RG = fnSomentNumberAndString(client.dataRegister[0].CLIENTE_RG)
    client.dataRegister[0].CLIENTE_CELULAR = `${fnSomentNumberAndString(client.dataRegister[0].CLIENTE_CELULAR)}`
    client.dataRegister[0].CLIENTE_WHATSAPP = `${fnSomentNumberAndString(client.dataRegister[0].CLIENTE_WHATSAPP)}`
    if(client.dataRegister[0].CLIENTE_EMPRESAS.length > 0) {
      client.dataRegister[0].CLIENTE_EMPRESAS.map(res => {
        res.CNPJ = res.CNPJ.replace(/[^\d]+/g,'');
        res.INSCRICAO_ESTADUAL = res.INSCRICAO_ESTADUAL.replace(/[^\d]+/g,'');
        res.TELEFONE_FIXO_EMPRESA = res.TELEFONE_FIXO_EMPRESA.replace(/[^\d]+/g,'');
        res.CELULAR_WHATZAPP_EMPRESA = res.CELULAR_WHATZAPP_EMPRESA.replace(/[^\d]+/g,'');
      })
    }

    // console.log('--- SUBMIT -->', client.dataRegister[0])

    socket.emit(client.IO_CLIENT_NEW_UPDATE, { ...client.dataRegister[0] })    
    socket.on(client.IO_CLIENT_NEW_UPDATE, (res : any) => {
      if(res.type == 'success') {
          fnGetClientList()
          //@ts-ignore
          message.fnSuccess(res.message)
          client.fnOnChange('loading', false)
          address.fnOnChangeAddress('screenOpen', false)
      } else {
          if(res.type == 'error') {
              console.log('----- error ->', res.error)
              //@ts-ignore
              message.fnError(res.message)
              client.fnOnChange('loading', false)
          } else {                    
              //@ts-ignore
              message.fnInfo(res.message)
              client.fnOnChange('loading', false)  
          }
      }
    })
  }
    
  return {
      fnOnChangeClientDataRegister, fnOnChangeClientCompanies, fnSubmitClient, 
      fnGetClientList, fnGetClientLogado, fnGetClientFindOne, fnBackCompanyList
    }
}
