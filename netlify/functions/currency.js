export async function handler(event) {
  const { base, target, amount } = event.queryStringParameters;

  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.conversion_rates[target];
    const convertedAmount = (amount * rate).toFixed(2);

    return {
      statusCode: 200,
      body: JSON.stringify({
        base,
        target,
        amount,
        rate,
        convertedAmount,
      }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Conversion failed" }),
    };
  }
}
