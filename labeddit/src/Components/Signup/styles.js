import style from 'styled-components'

export const Container = style.div`
    form {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    input {
        border: 1px solid #999;
        border-radius: 4px;
        height: 38px;
        margin-bottom: 10px;
    }
    
    button {
        border: none;
        border-radius: 4px;
        background-color: #5555;
        padding: 8px;
    }
`