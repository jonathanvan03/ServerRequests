const request = require('supertest');
const {serverInstance} = require('./JSServer');

describe('JSServer', () => {

    let consoleOut;

    beforeEach(() => {  // spy on console log four output
        consoleOut = spyOn(console, 'log');
    });

    afterAll(done => { // make sure to close server after tests are completed
        serverInstance.close(done);
    })

    it('should log message if plain text file successfully is successfully posted', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('This is a test')
            .set('Content-Type', 'text/plain')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Plain text posted successfully.')
                done()
            });
    });

    it('should log message if JSON file successfully is successfully posted', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('{"name": "jonathan"}')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Parsed JSON input successfully.')
                done()
            });
    });

    it('should log message if JSON file is unsuccessfully posted due to formatting', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('{name: jonathan}')
            .set('Content-Type', 'application/json')
            .expect(400)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Incorrect formatting of type JSON.')
                done()
            });
    });
    
    it('should log message if empty plain text is successful', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('')
            .set('Content-Type', 'text/plain')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Plain text posted successfully.')
                done()
            });
    });

    it('should log message if empty JSON file is successful', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('{}')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Parsed JSON input successfully.')
                done()
            });
    });

    it('should log message content type is missing', (done) => {
        request(serverInstance)
            .post('/echo')
            .send()
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith("Request is missing Content-Type in header.")
                done()
            });
    });

    it('should log message if /echo is not used as an endpoint', done => {
        request(serverInstance)
            .post('/nonecho') 
            .expect(405, () => {
                setTimeout(() => {
                    expect(console.log).toHaveBeenCalledWith('Method POST or /echo endpoint is only allowed.');
                    done();
                }, 1000); 
            });
    });

    it('should log message if wrong method is used', done => {
    request(serverInstance)
        .get('/echo')
        .expect(405, () => {
            setTimeout(() => {
                expect(console.log).toHaveBeenCalledWith('Method POST or /echo endpoint is only allowed.')
                done()
            }, 1000)
        })
    });

    it('should log message two requests of valid types are successsful', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('This is a test')
            .set('Content-Type', 'text/plain')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Plain text posted successfully.')
            });
        request(serverInstance)
        .post('/echo')
        .send('{"name": "jonathan"}')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(() => {
            expect(consoleOut).toHaveBeenCalledWith('Parsed JSON input successfully.')
            done()
        });
    });

    it('should log message two requests of with one being invalid JSON format to not be successful', (done) => {
        request(serverInstance)
            .post('/echo')
            .send('This is a test')
            .set('Content-Type', 'text/plain')
            .expect(200)
            .end(() => {
                expect(consoleOut).toHaveBeenCalledWith('Plain text posted successfully.')
            });
        request(serverInstance)
        .post('/echo')
        .send('{name: "jonathan"}')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(() => {
            expect(consoleOut).toHaveBeenCalledWith('Incorrect formatting of type JSON.')
            done()
        });
    });
})