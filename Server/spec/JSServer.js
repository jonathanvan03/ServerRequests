// import the http javascript module 
const http = require('http');


// initialize the supported content types
const contentTypes = ['application/json', 'text/plain']

const server = http.createServer((request, res) => {
    if (request.method === 'POST' && request.url ==='/echo') { // Using http post methodin client requests
        if (!request.headers['content-type']) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Missing Content-type header.')
            console.log("Request is missing Content-Type in header.");
            return;
        }

        const contentType = request.headers['content-type'];

        if (!contentTypes.includes(contentType)) { // check that the content type selected is allowed and supported
            res.writeHead(415, {'Content-Type': 'text/plain'});
            res.end(`Content type is not allowed. Must be of type: ${contentTypes.join(', ')}`);
            console.log('Content-Type used is not allowed.')
        }

        let body =''; // initialize the body value
    
        request.on('data', (value) => {
            body += value.toString()
        });

        request.on('end', () => {
            if (contentType === 'text/plain') { // checks JSON input
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(body);
                console.log('Plain text posted successfully.')
            }  else if (contentType === 'application/json') { // checks plain text input
                try { // JSON is parsed properly
                    const parsed = JSON.parse(body);
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(parsed));
                    console.log('Parsed JSON input successfully.'); 
                } catch (errror) { // JSON was not able to be parsed
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    res.write('Invalid format. Must be of JSON format.')
                    res.end('Review JSON input for errors in formatting.');
                    console.log('Incorrect formatting of type JSON.')
                }   
            } else {
                res.writeHead(415, {'Content-Type': 'text/plain'});
                res.end('Content-Type is unsupported. Please use allowed Content-Types.');
                console.log('Content-Type used is not allowed.')
            }
        });
    } else { // endpoint other than /echo is used
        res.writeHead(405, {'Content-Type': 'text/Plain'});
        res.write('Request method not allowed.');
        res.end('Method must be of type POST with /echo endpoint.');
        console.log('Method POST or /echo endpoint is only allowed.')
    }
});

const PORT = process.env.PORT || 3000; // popular convention for fault port for local host
const serverInstance = server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = {server, serverInstance}
