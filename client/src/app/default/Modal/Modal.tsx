import { useEffect } from 'react'
import { Main, Container, ButtonCloseModal } from './styles'
import { modalStore } from '../../../store/index'

type Props = {
    width?: string,
    height?: string,
    component?: React.HTMLProps<HTMLButtonElement>
}

/*
-- COMO UTILIZAR --
    - É preciso dar um Open do Component e passar o Component que deseje exebir no modal -
    modal.fnOpen(); 
    modal.fnOnChangeModal('component', <AquiSeuComponent />
    
    - Coloque o  component Modal onde deseje utilizar o mesmo -
    -> <Modal />} />
*/

export default function Modal(props : Props) {

    const modal = modalStore(state => state)

    useEffect(() => {        
        modal.fnOnChangeModal('fnOpen', fnOpen)
        modal.fnOnChangeModal('fnClose', fnClose)
    }, [])

    const fnOpen = () => {
        modal.fnOnChangeModal('animationClassCss', 'in-modal')
        modal.fnOnChangeModal('visible', true)
    }

    const fnClose = () => {
        modal.fnOnChangeModal('animationClassCss', 'out-modal')
        setTimeout(() => {
            modal.fnOnChangeModal('visible', false)
        }, 800)
    }

    return (
        <>
            {
                modal.visible &&                
                <Main>                    
                    <Container height={props.height} className={modal.animationClassCss}>                        
                        <ButtonCloseModal onClick={() => modal.fnClose()}>X</ButtonCloseModal>
                        {modal.component}
                    </Container>
                </Main>
            }
        </>
    )
}