import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address.vo";
import Invoice from "./invoice.entity";
import Product from "./product.entity";

describe("Invoice unit test", () => {
  it("should calculate the invoice total", () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Teste",
      document: "2468",
      address: new Address({
        street: "Rua UM",
        number: "111",
        complement: "complemento",
        city: "São Paulo",
        state: "SP",
        zipCode: "111111",
      }),
      items: [
        new Product({
          id: new Id("1"),
          name: "Produto1",
          price: 20,
        }),
        new Product({
          id: new Id("2"),
          name: "Produto 2",
          price: 30,
        }),
      ],
    });
   expect(invoice.total).toBe(50);
  });
 
});
