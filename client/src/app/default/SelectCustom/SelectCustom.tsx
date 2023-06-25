import { Container, Sellect, Label, Value, ButtonClear, Divider, ButtonArrow, DisplayList, List, RowList } from './styles'

type SelectOption = {
    label: string,
    value: any
}

// Este Select Custom falta Conluir conforme este video abaixo
//https://www.youtube.com/watch?v=bAJlYgeovlg

type Props = {
    label?: string,    
    options?: SelectOption[],
    value?: SelectOption
    onChange?: (data: SelectOption) => void,
}

export default function SelectCustom(props : Props) {
    return (
        <Container>
            {
                props.label &&
                <Label>{props.label}</Label>
            }
            <Sellect>
                <Value>Valor</Value>
                <ButtonClear>&times;</ButtonClear>
                <Divider />
                <ButtonArrow />
            </Sellect>
            <DisplayList>
               <List>
                    {props.options?.map(res => (<RowList key={res.value}>{res.label}</RowList>))}
                </List> 
            </DisplayList>
        </Container>
    )
}