import { ContainerList, ContainerItem, ContainerAvatar } from './styles'
import { clientStore, layoutStore } from '../../../store/index'

export default function CompanyList() {
    
    const client = clientStore(state => state)
    const layout = layoutStore(state => state)
        
    const fnEdit = (i : number) => {
        console.log('--- i ->', i)
        // const {id, _id, name, cnpj, inscEst} = company.list[i]
        // company.fnOnChangeCompany('_id', _id)
        // company.fnOnChangeCompany('id', id)
        // company.fnOnChangeCompany('name', name)
        // company.fnOnChangeCompany('cnpj', cnpj? cnpj : '')
        // company.fnOnChangeCompany('cnpj', inscEst? inscEst : '')
    }
        
    return (                        
        <ContainerList>
            <div style={{bottom:'10px', right:'10px', position:'absolute', width:'45px', height:'45px', borderRadius:'100%', backgroundColor:'#08623F'}}>
                <button 
                    onClick={() => {
                        layout.fnOnChangeLayout('isVisibleForm', true);
                    }} 
                    style={{backgroundColor:'transparent', width:'100%', height:'100%', borderRadius:'100%', color:'white', fontSize:'25px'}}>
                    +
                </button>
            </div>
            <p style={{textAlign:'center', padding:'10px'}}>
                Aqui ficarão empresas fornecedoras, exemplo Distribuido de Gás, Compra de parafusos
            </p>
            {/* {
                client.companies.length > 0 &&
                client.companies.map((res : any, i : number) => {
                    return (
                        <ContainerItem key={i} onClick={() => fnEdit(i)}>
                            <ContainerAvatar>
                                {res.avatar? <img src={res?.avatar} /> : <label></label>}
                                </ContainerAvatar>
                                <span>{res?.RAZAO_SOCIAL}</span>
                            </ContainerItem>
                    )
                })
            } */}
        </ContainerList>
    )
}