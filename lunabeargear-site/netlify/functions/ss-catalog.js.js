exports.handler = async function(event, context) {
    // Luna Bear Gear API Credentials
    const SS_ACCOUNT = '1025504';
    const SS_API_KEY = '2dd7a1d4-5ddd-4f3f-829e-2a0f5c584cb3';
    
    // Encode credentials for S&S Basic Auth format
    const authString = Buffer.from(`${SS_ACCOUNT}:${SS_API_KEY}`).toString('base64');

    try {
        const response = await fetch('https://api.ssactivewear.com/v2/products', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `S&S API responded with status ${response.status}` })
            };
        }
        
        const catalogData = await response.json();
        
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(catalogData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to connect to S&S Activewear API.' })
        };
    }
};