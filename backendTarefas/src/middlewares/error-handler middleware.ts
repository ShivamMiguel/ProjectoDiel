import { StatusCodes } from 'http-status-codes';

import { NextFunction,Request,Response } from 'express';
import DatabaseError from '../models/errors/database.error.model';
import forbiddenError from '../models/errors/forbidden.error.model';


function errorHandler(error: any, req:Request, resp:Response, next:NextFunction){
    if(error instanceof DatabaseError){
        resp.sendStatus(StatusCodes.BAD_REQUEST);
    } else if (error instanceof forbiddenError){

        resp.sendStatus(StatusCodes.FORBIDDEN);
    
    }else {
        resp.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

export default errorHandler;