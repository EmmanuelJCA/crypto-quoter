import { useEffect, useState } from "react"
import Form from "./components/Form"
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
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', san-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: 34px;

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

  useEffect(() => {
    if(Object.keys(coins).length > 0) {
      const { coin, crypto } = coins
      const quoteCrypto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`

        const response = await fetch(url)
        const result = await response.json()

        setQuotation(result.DISPLAY[crypto][coin])
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
      </div>
    </Container>
  )
}

export default App
