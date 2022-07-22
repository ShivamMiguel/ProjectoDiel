import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import controllers from "../controllers/tarefas.controllers";
import TarefasRepository from "../repositories/tafera.repository";

const TarefasRoute = Router();

TarefasRoute.get(
  "/tarefas",controllers.PegarTarefa);

TarefasRoute.get(
  "/tarefas/:uuid",controllers.PegarIdDaTarefa);

TarefasRoute.post(
  "/tarefas?:titulo",controllers.CriarTarefa);

TarefasRoute.put(
  "/tarefas/:uuid",controllers.AtualizarTarefa);

TarefasRoute.delete(
  "/tarefas/:uuid",controllers.ApagarTarefa);

export default TarefasRoute;
