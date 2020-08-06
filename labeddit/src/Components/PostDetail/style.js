import styled from 'styled-components'

export const ContainerPost = styled.div`
    
    
`

export const Comments = styled.div`
    display: grid;
    grid-template-columns: .5fr 6fr;
    border: 1px solid #5555;
    border-radius: 4px;
    margin-bottom: 16px;
    
    div:first-child {
        border-right: 1px solid #5555;
        > span {
            border: 1px solid #5555;
            display: block;
            cursor: pointer;
            margin-bottom: 4px;
        }
    }
`