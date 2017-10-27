let chai = require('chai'),
    server = require('../server/server'),
    brand
app = null;

chai.use(require('chai-http'));

before(async function () {
    /* Starting db sync and get the express instance before run tests */
    await server.Start();
    app = server.GetApp();
});

describe("Testing brands", () => {
    it("should get all brands", (done) => {
        chai.request(app)
            .get('/brand')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a("Array");
                done();
            });
    });


    it("should get just a single brand", (done) => {
        chai.request(app)
            .get('/brand/1')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a("Object");
                let id = parseInt(res.body.id);
                chai.expect(id).to.equal(1);
                done();
            });
    });

    it("should post a brand", (done) => {
        chai.request(app)
            .post("/brand")            
            .send({ name: "Sony", id: 2 })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                done();
            });
    });


    it("should put a brand", (done) => {
        chai.request(app)
            .put("/brand")            
            .send({ name: "Nintendo" })
            .end((err, res) => {                
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(parseInt(res.body.id)).to.be.greaterThan(0);
                done();
            });
    });

});    