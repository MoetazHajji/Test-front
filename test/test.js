const chai = require('chai')
const request = require('supertest');
const app = require('../api/src/config/server/server').default;
const ProductModel = require('../api/src/components/product/model').default;

chai.should();

let id;
let id01;
let id02;
let userId= '64b94cda925b701feef80ed3';
let prenom = 'hajji';

describe('Product Apis ', ()=> {
        describe("The following tests serve to add new children : POST /porduct", () => {
                it('It should POST a new Child', (done) => {
                        const newProduct = {
                                "name": "wheel",
                                "reference": "1c2x3ws",
                                "description": "lokking for refund",
                                "price": 10,
                                "state": "OLD",
                                "category": "OLD",
                                "quantity": 10,
                                "userId":userId
                        };
                        request(app)
                            .post('/product')
                            .send(newProduct)
                            .expect((res) => {
                                    res.status.should.equal(201);
                                    id=res.body._id;
                                    res.body.should.have.property('name').eq("wheel");
                                    res.body.should.have.property('reference').eq("1c2x3ws");
                                    res.body.should.have.property('description').eq("lokking for refund");
                                    res.body.should.have.property('price').eq(10);
                                    res.body.should.have.property('state').eq("OLD");
                                    res.body.should.have.property('category').eq("OLD");
                                    res.body.should.have.property('quantity').eq(10);
                                    res.body.should.have.property('userId').eq(userId);
                            })
                            .end(done);
                });
        });
});
after(async () => {
        try {
                await ProductModel.collection.drop();
        } catch (error) {
                console.debug('Something went wrong after tests, seems your database doesnt cleaned');
        }
});

