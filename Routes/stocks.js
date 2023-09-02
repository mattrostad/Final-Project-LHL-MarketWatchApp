const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  // once we create a sign up form prob sigUp.ejs
  return res.status(200).send({
    message: "Stock Api", 
    date: new Date()})
});

router.post('/', (req, res) => {
  const payload = req.body
  console.log('payLoad+++', payload)
  return res.status(200).send({
    message: "Stock Api", 
    payload,
    date: new Date()})
});

const Watchlist = require('../models/Watchlist'); // Roy replace with whatever our watchlist route and file will be


// Personalized Watchlist
router.get('/watchlist', async(req, res) => {
  try {
    // Fetch the user's watchlist data from the database (will need to replace with our fetching code)
    const userWatchlist = await Watchlist.find({ userId: req.user.id }); // Authentication middleware might be needed, not sure
    
    // we should ender the watchlist view and pass the watchlist data to it
    res.render('watchlist', { watchlist: userWatchlist });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the watchlist');
  }
});

router.post('/watchlist/add', async(req, res) => {
  try {
    const { userId, stockSymbol } = req.body;

    // Validate input
    if (!userId || !stockSymbol) {
      return res.status(400).send('User ID and stock symbol are required.');
    }

    // to create a new watchlist item and save it to the database
    const newWatchlistItem = new Watchlist({
      userId,
      stockSymbol
    });
    await newWatchlistItem.save();

    res.status(201).send('Stock added to watchlist successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the stock to the watchlist.');
  }
});

router.delete('/watchlist/:stockId', async(req, res) => {
  // Handle removing a stock from the watchlist
  try {
    const stockId = req.params.stockId;

    // Find the watchlist item by stockId and delete it
    const deletedItem = await Watchlist.findByIdAndDelete(stockId);

    if (!deletedItem) {
      return res.status(404).send('Watchlist item not found.');
    }

    res.status(200).send('Stock removed from watchlist successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while removing the stock from the watchlist.');
  }
});

// Real-time Stock Data (assuming we have an external API)
router.get('/stocks/:symbol', async(req, res) => {
  // Fetch real-time stock data for a specific symbol and send it to the client
  try {
    const symbol = req.params.symbol;
    const apiKey = 'your_api_key'; // Replace with our actual API key
    const apiUrl = `https://api.example.com/stocks/${symbol}?apiKey=${apiKey}`; // Replace with the actual API URL

    // Fetch real-time stock data from the external API
    const response = await axios.get(apiUrl);

    // Send the fetched data to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching real-time stock data.');
  }
});

// Historical Data (assumes use of external API)
router.get('/history/:symbol', async(req, res) => {
  // Fetch historical stock data for a specific symbol and send it to the client
  try {
    const symbol = req.params.symbol;
    const apiKey = 'your_api_key'; // Replace with our actual API key
    const apiUrl = `https://api.example.com/history/${symbol}?apiKey=${apiKey}`; // Replace with our actual API URL

    // Fetch historical stock data from the external API
    const response = await axios.get(apiUrl);

    // Send the fetched data to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching historical stock data.');
  }
});

// Performance Comparisons (assumes watchlist comparison feature)
router.get('/compare/:symbols', (req, res) => {
  // Compare performance of stocks based on provided symbols and time frame
  try {
    const symbolList = req.params.symbols.split(','); // Split the symbols into an array
    const apiKey = 'your_api_key'; // Replace with our API key
    const baseUrl = 'https://api.example.com/history'; // Replace with our API URL

    // Fetch historical data for each symbol
    const historicalDataPromises = symbolList.map(symbol => {
      const apiUrl = `${baseUrl}/${symbol}?apiKey=${apiKey}`; // Adjust the URL structure based on our API
      return axios.get(apiUrl);
    });

    // Wait for all requests to complete
    const historicalDataResponses = await Promise.all(historicalDataPromises);

    // Process and calculate performance metrics (e.g., compare stock prices)

    // Send the comparison results to the client
    res.json({ comparisonData: /* Your comparison data here */ });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while comparing stock performance.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
module.exports = router;