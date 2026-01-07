exports.handler = async (event) => {
  const { base } = event.queryStringParameters;

  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        conversion_rates: data.conversion_rates
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Currency conversion failed" })
    };
  }
};
