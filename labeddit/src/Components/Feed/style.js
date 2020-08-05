import styled from 'styled-components'

export const Container = styled.div`

    section {
        width: 400px;
        margin: 0 auto;
    }
`

export const Header = styled.header`
    margin-bottom: 32px;
    width: 100vw;
    border-bottom: 1px solid #5555;
    padding: 4px 0;

    input {
        border: 1px solid #999;
        border-radius: 4px;
        height: 30px;
        margin-right: 10px;
    }

    button {
        border: none;
        border-radius: 4px;
        background-color: #5555;
        padding: 8px;
    }
`

export const Post = styled.div`
    display: grid;
    grid-template-columns: .5fr 6fr;
    border: 1px solid #5555;
    border-radius: 4px;
    margin-bottom: 16px;

    div:first-child {
        border-right: 1px solid #5555;
        > span {
            display: block;
            cursor: pointer;
        }
    }
`

export const Comments = styled.div`
    border: 1px solid #5555;
    border-radius: 4px;
    margin-bottom: 16px;
    text-align: right;
    
`