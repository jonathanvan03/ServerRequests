Jonathan Van
332:452:01
Homework 5
Problem 5.4.1 

This script creates a server which accepts POST methods with /echo endpoints. 

make sure node.js is installed 

The files are located in the spec folder. 

JSServer.js is the server script and JSServer.spec.js is the jasmine test file 
Terminating the program and closing the server can be done after running by entering control + c. 

Download and install postman to make a new request. Be sure to set the URL as http://localhost:3000/echo. Also make sure the method is a POST and the body 
a JSON input or plain text. 

The following response codes can be output:
- 200 The post was successful
- 400 There was an error with formatting (JSON file was not formatted correctly)
- 405 Method is not POST or /echo endpoint is not used
- 415 The content type is unsupported, should be application/json or text/plain

To run the jasmine test cases, run npm test. 

The test cases check 
- correct input of JSON and plain text body
- JSON input incorrectly formatted
- log error if wrong method is used
- log error if wrong endpoint is used
- log error if invalid content type is used
- give error when content type is missing 
- correctly POSTS two requests of valid input
- correctly handles two requests with one input being vaild and the other invalid