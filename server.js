const { GoogleGenerativeAI } = require("@google/generative-ai");
const http = require('http');
const fs = require('fs');

const API_KEY = "API_KEY"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function runGenerativeModel(destination, numberOfDays) {
  const prompt = `Plan a trip to ${destination} for ${numberOfDays} days`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const textResult = response.text;
  console.log('Server Response:', textResult); // Log the server response
  return textResult;
}

const server = http.createServer((req, res) => {
    if (req.url === '/run-server-script' && req.method === 'GET') {
        // Extract user input from query parameters
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const destination = urlParams.get('destination');
        const numberOfDays = urlParams.get('numberOfDays');

        // Run the generative model and send the response
        runGenerativeModel(destination, numberOfDays)
          .then((result) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(result);
          })
          .catch((error) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            console.error('Error:', error);
          });
    } else {
        // Serve the HTML file (input.html)
        fs.readFile('input.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
