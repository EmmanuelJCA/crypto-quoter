import { useEffect, useState } from "react"

import Form from "./components/Form"
import Quotation from "./components/Quotation"
import Spinner from "./components/Spinner"

import Swal from "sweetalert2"
import styled from "@emotion/styled"
import CryptoImage from './assets/crypto-image.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 10px auto 0 auto;
  display: block;
  @media (min-width: 992px) {
    margin: 100px auto 0 auto;
  }
`

const Heading = styled.h1`
  font-family: 'Lato', san-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 34px;
  @media (min-width: 992px) {
    margin-top: 80px;
    margin-bottom: 80px;
  }

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [coins, setCoins] = useState({})
  const [quotation, setQuotation] = useState({})
  const [binanceQuotation, setBinanceQuotation] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if(Object.keys(coins).length > 0) {

      const { coin, crypto } = coins

      const quoteCrypto = async () => {
        setLoading(true)
        setQuotation({})
        setBinanceQuotation({})

        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`
        const cryptoYaUrl = `https://criptoya.com/api/binancep2p/${crypto}/${coin}/1`

        const [cryptoCompare, cryptoYa] = await Promise.allSettled([fetch(cryptoCompareUrl), fetch(cryptoYaUrl)])
        
        if(cryptoCompare.status === 'fulfilled') {
          const cryptoCompareResponse = cryptoCompare.value
          const cryptoCompareQuotation = await cryptoCompareResponse.json()
          setQuotation(cryptoCompareQuotation.DISPLAY[crypto][coin])
        }
        if(cryptoYa.status === 'fulfilled') {
          const cryptoYaResponse =  cryptoYa.value
          const cryptoYaQuotation = await cryptoYaResponse.json()
          setBinanceQuotation(cryptoYaQuotation.asks.data)
        }

        if(cryptoCompare.status === 'rejected' && cryptoYa.status === 'rejected') {
          return Swal.fire({
            icon: 'error',
            title: 'Error de conexion, intente de nuevo mas tarde',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      
        setLoading(false)
      }

      quoteCrypto()
    }
  },[coins])

  return (
    <Container>
      <Image
        src={CryptoImage}
        alt="Imagen Criptomonedas"
      />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form
          setCoins={setCoins} 
        />
        {loading && <Spinner />}
        {quotation.PRICE && <Quotation quotation={quotation} binanceQuotation={binanceQuotation}/>}
      </div>
    </Container>
  )
}

export default App
