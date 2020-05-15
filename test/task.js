//importing required libraries
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

//Assertion style
chai.should();
//Using chai-http
chai.use(chaiHttp);

describe('Tasks API', () => {
    
    /**
     * Test doctor registration (POST route)
     */
    describe('POST /doctors/register', () => {
        it("It should register a doctor", (done) => {
            const task = {
                name: "Steve",
                email: "steve@gmail.com",
                password: "steve123" 
            }
            chai.request(server)
                .post('/doctors/register')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });
    });

    /**
     * Test doctor login (POST route)
     */
    describe('POST /doctors/login', () => {
        it("Signing In doctor", (done) => {
            const task = {
                email: "steve@gmail.com",
                password: "steve123"
            }
            chai.request(server)
                .post('/doctors/login')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });
    });
});