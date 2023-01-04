import styled from "@emotion/styled"

const Container = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 992px) {
        flex-direction: row;
        gap: 1rem;
        margin-top: 30px;
    }
`

const Image = styled.img`
    width: 150px;
    display: block;
    margin-top: 10px;
`

const Text = styled.p`
    font-size: 16px;
    span {
        font-weight: 700;
    }
`

const PriceP = styled.p`
    font-size: 22px;
    span {
        font-weight: 700;
    }
`

const Quotation = ({ quotation, binanceQuotation }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = quotation
    
    return (
        <Container>
            <div>
                <Image 
                    src={`https://cryptocompare.com/${IMAGEURL}`} 
                    alt="Imagen Cripto" 
                />
            </div>
            <div>
                <PriceP>Precio: <span>{PRICE}</span></PriceP>
                <Text>Precio mas alto del dia: <span>{HIGHDAY}</span></Text>
                <Text>Precio mas bajo del dia: <span>{LOWDAY}</span></Text>
                <Text>Variacion ultimas 24h: <span>{CHANGEPCT24HOUR}%</span></Text>
                <Text>Ultima actualizacion: <span>{LASTUPDATE}</span></Text>
                {binanceQuotation.length > 0 ?
                    <Text>En BinanceP2P: <span>{`${binanceQuotation[0].adv.price} ${binanceQuotation[0].adv.fiatSymbol} - ${binanceQuotation[0].adv.price} ${binanceQuotation[binanceQuotation.length-1].adv.fiatSymbol}`}</span></Text> 
                    : <p>Cotizacion en Binance no disponible</p>
                }
            </div>
        </Container>
    )
}

export default Quotation
