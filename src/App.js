import './App.css';
import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

const CustomTypography = styled(Typography)`
  font-size: ${(props) => props.fontSize}em;
`;

function App() {

  const [quotes, setQuotes] = useState([])
  const [selectedQuote, setSelectedQuote] = useState([])
  const [randomColor, setRandomColor] = useState("")

  useEffect(() => {
    initialFetch()
  }, [])

  const initialFetch = async () => {
    try {
      let result = await fetch('https://raw.githubusercontent.com/HariPrasaanth/random-quotes/main/quotes.json')
      const data = await result.json()
      setQuotes(data.quotes)
      await generateRandomQuote(data.quotes, data.quotes.length)
    }
    catch (error) {
      console.log(error)
    }
  }

  const generateRandomQuote = async (quoteArr, max) => {
    let randomNumber = Math.floor(Math.random() * max)
    setSelectedQuote(quoteArr[randomNumber])
    generateRandomColor()
  }

  const generateRandomColor = () => {
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)
    setRandomColor(`rgb(${red}, ${green}, ${blue})`)
  }

  return (
    <Grid container className='App-header' style={{ backgroundColor: randomColor }}>
      <Grid item xs={10} sm={8} md={5} className='container' >
        <Grid container className='quoteContainer' rowSpacing={2}>
          <Grid item xs={12}>
            <CustomTypography className='quote' fontSize="1.3" style={{ color: randomColor }}>{selectedQuote.quote}</CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Grid container style={{ justifyContent: "flex-end" }}>
              <Grid item>
                <CustomTypography className='quote' fontSize="0.7" style={{ color: randomColor }}>- {selectedQuote.author}</CustomTypography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container style={{ justifyContent: "center" }}>
              <Grid item>
                <Button variant="contained" size="small" style={{ backgroundColor: randomColor}} onClick={() => generateRandomQuote(quotes, quotes.length)}>New Quote</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
