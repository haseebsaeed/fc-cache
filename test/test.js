const app = require('../src/app');
const supertest = require('supertest');
const expect = require("chai").expect;

const Cache = require('../src/models/cache')

const requestWithSupertest = supertest(app);

describe('Health check', () => {

    it('GET /api/status should return 200', async () => {
        const res = await requestWithSupertest.get(`/api/status`);
        expect(res.status).equal(200);
    });

});

describe('Cache Endpoints', () => {

    //empty cache before every run
    beforeEach(async () => {
        return Cache.deleteMany()
    })

    describe('Get - keys', async () => {
        it('GET /values/:key should return with the value of assigned key', async () => {
            const body = {
                key: "test key",
                value: "test value",
                ttl: 20000
            }
            await requestWithSupertest.put('/').send(body)
            const res = await requestWithSupertest.get(`/values/${body.key}`);
            expect(res.status).equal(200);
            expect(res.body.value).equal(body.value)
        });

        it('GET /values/keys should all keys in the cache', async () => {
            await Cache.create({
                key: "test key1",
                value: "test value",
                ttl: 20000
            })
            await Cache.create({
                key: "test key2",
                value: "test value",
                ttl: 20000
            })
            const res = await requestWithSupertest.get(`/keys`);
            expect(res.status).equal(200);
            expect(res.body.length).equal(2)
        });
    })

    describe('Put - Upsert keys', async () => {
        it('PUT / should insert new keys', async () => {
            const body = {
                key: "test key",
                value: "test value",
                ttl: 20000
            }
            const res = await requestWithSupertest.put('/').send(body)
            const data = await Cache.findOne({ key: body.key })
            expect(res.status).equal(201);
            expect(data.value).equal(body.value)
        });
        it('PUT / should update existing keys', async () => {
            await Cache.create({
                key: "test key",
                value: "test value",
                ttl: 20000
            })
            const updateBody = {
                key: "test key",
                value: "updated value"
            }
            await requestWithSupertest.put('/').send(updateBody)
            const data = await Cache.findOne({ key: updateBody.key })
            expect(res.status).equal(200);
            expect(data.value).equal(updateBody.value)
        });
    })

    describe('Delete - delete keys', async () => {
        it('/keys/ should delete all the existing cache data', async () => {
            await Cache.create({
                key: "test key1",
                value: "test value",
                ttl: 20000
            })
            await Cache.create({
                key: "test key2",
                value: "test value",
                ttl: 20000
            })
            await requestWithSupertest.delete('/keys')
            const count = await await Cache.countDocuments()
            expect(count).equal(0)
        });
        it('/keys/:id should delete cache with the specific key', async () => {
            const body = {
                key: "test key1",
                value: "test value",
                ttl: 20000
            }
            await Cache.create(body)
            await Cache.create({
                key: "test key2",
                value: "test value",
                ttl: 20000
            })
            await requestWithSupertest.delete(`/keys/${body.key}`)
            const count = await await Cache.countDocuments()
            expect(count).equal(1)
        });
    })

});