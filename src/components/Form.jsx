import useSelectCoin from "../hooks/useSelectCoin"
import { coins } from "../data/coins"
import styled from "@emotion/styled"

const SubmitBtn = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = () => {

    const [ coin, SelectCoins ] = useSelectCoin('Elige tu Moneda', coins)

    return (
        <form>
            <SelectCoins />

            <SubmitBtn 
                type="submit" 
                value="Cotizar" 
            />
        </form>
    )
}

export default Form
