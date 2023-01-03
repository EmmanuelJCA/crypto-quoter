import { useEffect, useState } from "react"
import useSelectCoin from "../hooks/useSelectCoin"
import { coins } from "../data/coins"
import Swal from "sweetalert2"
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

const Form = ({ setCoins }) => {
    const [ cryptos, setCryptos ] = useState([])

    const [ coin, SelectCoins ] = useSelectCoin('Elige tu Moneda', coins)
    const [ crypto, SelectCryptos] = useSelectCoin('Elige tu Criptomoneda', cryptos)

    useEffect(() => {
        const queryApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`

            const response = await fetch(url)
            const result = await response.json()

            const arrayCryptos = result.Data.map( crypto => {
                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                return object
            }) 

            setCryptos(arrayCryptos)
        }
        queryApi()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([coin, crypto].includes('')) {
            return Swal.fire({
                icon: 'error',
                title:'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 1500
            })
        }

        setCoins({coin, crypto})
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <SelectCoins />
            <SelectCryptos />

            <SubmitBtn 
                type="submit" 
                value="Cotizar" 
            />
        </form>
    )
}

export default Form
