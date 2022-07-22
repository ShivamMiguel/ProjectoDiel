CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS aplication_tarefas(
    uuid uuid DEFAULT uuid_generate_v4(),
    titulo VARCHAR NOT NULL,
    descricao VARCHAR NOT NULL,
    entradaDate DATE NOT NULL,
    saidaDate DATE NOT NULL,
    PRIMARY KEY (uuid)
)

