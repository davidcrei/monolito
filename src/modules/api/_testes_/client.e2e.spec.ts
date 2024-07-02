
import {app,sequelize} from '../express'
import request from "supertest";
describe("E2E test for cliente",()=>{

    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
    afterAll(async () => {
        await sequelize.close();
      });

      it("should create a client", async () => {
        const response = await request(app).post("/client").send({
          id: "1",
          name: "Jao da Silva",
          document: "215251",
          email: "joao@email.com",
          street: "rua um",
          number: "1",
          complement: "casa1",
          city: "Sao Paulo",
          state: "SP",
          zipCode: "04312214",
        });
    
        expect(response.status).toBe(200);
       // expect(response.body.name).toBe("Jao da Silva");
       console.log(response.body);
      });     

});
