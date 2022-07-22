import { query } from "express";

import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import Tarefas from "../models/tarefas.model";


class TarefasRepository{



    async PegarTodasTarefas(): Promise<Tarefas[]>{
        const query = `
        SELECT uuid, titulo,descricao,entradaDate,saidaDate
        FROM aplication_tarefas
        
        `;

       const {rows} =await db.query<Tarefas>(query);
      
      

        return rows || [];
    }

    async PegarTodasTarefasPeloTituloContendo(titulo: string): Promise<Tarefas[]>{
        const query = `
        SELECT uuid, titulo,descricao,entradaDate,saidaDate
        FROM aplication_tarefas 
        WHERE UPPER(titulo) LIKE UPPER('${titulo}%')
        
        `;

       const {rows} =await db.query<Tarefas>(query);
      
      

        return rows || [];
    }

    async PegarTarefasId(uuid: string): Promise<Tarefas>{
        
        try {

            const query = `
            SELECT uuid, titulo,descricao,entradaDate,saidaDate
            FROM aplication_tarefas
            WHERE uuid = $1
            `;

        const values = [uuid];
        const {rows} = await db.query<Tarefas>(query, values);
        const [tarefa] = rows;
        return tarefa;
            
        } catch (error) {
            console.log(error)
            throw new DatabaseError('Erro na consulta por ID, Passar um ID correcto', error);
         }

    }

   

    async criarTarefas (novatarefa: Tarefas): Promise<string> {
        const script = `
        INSERT INTO aplication_tarefas (
            titulo,
            descricao,entradaDate,saidaDate
        )
        VALUES ($1,$2,$3,$4)
        RETURNING uuid
        
        `;
        const values = [novatarefa.titulo, novatarefa.descricao, novatarefa.entradaDate, novatarefa.saidaDate];

        const {rows} = await db.query<{uuid: string}>(script, values);
        const [newTarefa] = rows;
        return newTarefa.uuid;
    }

    async atualizarTarefa (atualizartarefa:Tarefas): Promise<void>{
        const script = `
        UPDATE aplication_tarefas
        SET 
            titulo = $1,
            descricao = $2,
            entradaDate = $3,
            saidaDate = $4,
            WHERE uuid = $5
        
        `;
        const values = [atualizartarefa.titulo, atualizartarefa.descricao,atualizartarefa.entradaDate,atualizartarefa.saidaDate, atualizartarefa.uuid];
        await db.query(script, values);
       
       
    }
    async apagartarefa (uuid: string): Promise<void> {
        const script = `
        DELETE 
        FROM aplication_tarefas
        WHERE uuid = $1

        `;
        const values = [uuid];
        await db.query(script, values);
    }
       
      
}

export default new TarefasRepository();