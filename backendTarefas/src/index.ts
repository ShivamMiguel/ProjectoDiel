
//Doc principal da aplicacão
import express, { NextFunction, Request, Response }  from 'express';
import  cors from 'cors';
import errorHandler from './middlewares/error-handler middleware';


import statusRoute from './routes/status.route';
import TarefasRoute from './routes/tarefas.route';


const app = express();

//configuracão da aplicacão.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//Configuracão das routas
app.use(TarefasRoute);
app.use(statusRoute);





app.get('/status', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).send({ foo: 'bar' });

});

//configuracão dos handler de erros
app.use(errorHandler);




// inicializacão do servidor
const port = 5000
const host = "http://localhost"
app.listen(5000, () => {
    console.log(`server is running in ${host}:${port}`);
   
});