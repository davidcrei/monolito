import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router();

clientRoute.post("/", async (request: Request, response: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const { id,name,email, address,document,street,number,complement,city,state,zipCode} = request.body;

    const clientDto: AddClientFacadeInputDto = {
      id,
      name,
      email,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    
    };

    await facade.add(clientDto);

    response.status(200).send();
  } catch (error) {
    response.status(400).send(error);
  }
});