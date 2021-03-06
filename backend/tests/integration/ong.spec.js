const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
 
    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAD",
            email: "contato@apad.com.br",
            whatsapp: "6199911111",
            city: "Brasília",
            uf: "DF"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        console.log(response.body);
    });

    afterAll( async () => {
        await connection.destroy();
    });
});