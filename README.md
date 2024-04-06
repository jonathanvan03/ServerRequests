# ServerRequests
 
##### Description:
This script creates a server which accepts POST methods with /echo endpoints. 

make sure node.js is installed 

---
##### Running
JSServer.js is the server script
- In the Server/spec directory, run 'node JSServer.js
- This will host the server locally

- Download and install postman to make a test request. Be sure to set the URL as http://localhost:3000/echo. Also make sure the method is a POST and the body 
a JSON input or plain text. 

The following response codes can be output:
- 200 The post was successful
- 400 There was an error with formatting (JSON file was not formatted correctly)
- 405 Method is not POST or /echo endpoint is not used
- 415 The content type is unsupported, should be application/json or text/plain

HTML messages will be returned upon HTML request. 
Messages will also be printed in the terminal. 