import { NextFunction, Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import TarefasRepository from "../repositories/tafera.repository";

const controller ={

   PegarTarefa:  async (req: Request, res: Response, next: NextFunction) => {
    const { titulo } = req.query;
    console.log(req.headers["authorization"]);
    const users =
      typeof titulo === "undefined"
        ? await TarefasRepository.PegarTodasTarefas()
        : await TarefasRepository.PegarTodasTarefasPeloTituloContendo(titulo);
    res.status(StatusCodes.OK).send(users);
  },


  PegarIdDaTarefa: async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await TarefasRepository.PegarTarefasId(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  },

  CriarTarefa: async (req: Request, res: Response, next: NextFunction) => {
    const newTarefa = req.body;
    const uuid = await TarefasRepository.criarTarefas(newTarefa);
    res.status(StatusCodes.CREATED).json({
      newTarefa,
      uuid,
    });
  },

  AtualizarTarefa:async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const atualizartarefa = req.body;
    atualizartarefa.uuid = uuid;
    await TarefasRepository.atualizarTarefa(atualizartarefa);
    res.status(StatusCodes.OK).send({ uuid });
  },

  ApagarTarefa:async (req: Request, res: Response,next:NextFunction) => {
    const uuid = req.params.uuid;
    await TarefasRepository.apagartarefa(uuid);
    res.sendStatus(StatusCodes.OK);
  }


}

export default controller


    



