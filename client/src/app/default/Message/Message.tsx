import React, { useEffect } from 'react'
import { Main, Container, Text } from './styles'
import { messageStore } from '../../../store/index'

export default function Message() {

    const message = messageStore(state => state)
    
    useEffect(() => {
        message.fnOnChangeMessage('fnSuccess', fnSuccess)
        message.fnOnChangeMessage('fnError', fnError)
        message.fnOnChangeMessage('fnInfo', fnInfo)
    }, [])

    const fnSuccess = (value : string) => {
        message.fnOnChangeMessage('visible', true)
        message.fnOnChangeMessage('isLoading', true)
        message.fnOnChangeMessage('className', 'success-up')
        message.fnOnChangeMessage('message', value)

        let _timer1 = setTimeout(() => {
            message.fnOnChangeMessage('className', 'success-down')
        }, 2000)

        let _timer2 = setTimeout(() => {
            clearTimeout(_timer1)
            clearTimeout(_timer2)
            message.fnOnChangeMessage('isLoading', false)
            message.fnOnChangeMessage('visible', false)
            message.fnOnChangeMessage('message', value)
        }, 3000)
    }

    const fnError = (value : React.HTMLAttributes<HTMLSpanElement>) => {
        message.fnOnChangeMessage('visible', true)
        message.fnOnChangeMessage('isLoading', true)
        message.fnOnChangeMessage('className', 'error-up')
        message.fnOnChangeMessage('message', value)

        let _timer1 = setTimeout(() => {
            message.fnOnChangeMessage('className', 'error-down')
        }, 2000)

        let _timer2 = setTimeout(() => {
            clearTimeout(_timer1)
            clearTimeout(_timer2)
            message.fnOnChangeMessage('isLoading', false)
            message.fnOnChangeMessage('visible', false)
            message.fnOnChangeMessage('message', value)
        }, 3000)
    }

    const fnInfo = (value : React.HTMLAttributes<HTMLSpanElement>) => {
        message.fnOnChangeMessage('visible', true)
        message.fnOnChangeMessage('isLoading', true)
        message.fnOnChangeMessage('className', 'info-up')
        message.fnOnChangeMessage('message', value)

        let _timer1 = setTimeout(() => {
            message.fnOnChangeMessage('className', 'info-down')            
        }, 2000)

        let _timer2 = setTimeout(() => {
            clearTimeout(_timer1)
            clearTimeout(_timer2)
            message.fnOnChangeMessage('isLoading', false)
            message.fnOnChangeMessage('visible', false)
            message.fnOnChangeMessage('message', value)
        }, 3000)
    }

    return (
        message.visible &&
        <Main>
            <Container className={message?.className}>                        
                <Text>{message?.message}</Text>
            </Container>
        </Main>
        
    )
}