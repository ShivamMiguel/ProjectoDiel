import { Pool, Client } from 'pg';

const db = "postgres://postgres:928907179@localhost:5432/aplication_tarefas"

const client = new Client(db);
client.connect();


export default client
/*const connectionString = 'localhost';
const port =5432;
const user = "postgres";
const password= "928907179"
 
const db = new Pool({connectionString});*/


