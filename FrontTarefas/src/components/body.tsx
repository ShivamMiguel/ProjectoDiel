import axios from "axios";
import { PlusCircle } from "phosphor-react";
import React, { useState } from "react";

function Tarefas() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [entradaDate, setEntradaDate] = useState("");
  const [saidaDate, setSaidaDate] = useState("");

    const handleTitulo = (event: React.ChangeEvent<HTMLInputElement>)=> {
        event.preventDefault()
        setTitulo(event.target.value)
    }
    const handleDescricao = (event: React.ChangeEvent<HTMLInputElement>)=> {
        event.preventDefault()
        setDescricao(event.target.value)
    }
    const handleEntrada = (event: React.ChangeEvent<HTMLInputElement>)=> {
        event.preventDefault()
        setEntradaDate(event.target.value)
        console.log(event.target.value)
    }
    const handleSaida = (event: React.ChangeEvent<HTMLInputElement>)=> {
        event.preventDefault()
        setSaidaDate(event.target.value)
    }

  const handleSubmit = () => {
    axios.post("http://localhost:5000/tarefas", {
      titulo: titulo,
      descricao: descricao,
      entradaDate: entradaDate,
      saidaDate:saidaDate,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" w-full gap-2 bg-slate-300 flex flex-col items-center justify-center h-[200px]"
      >
        <div className="">
          <input
            className="text-black border-b w-[300px] border-black bg-slate-300 mr-4"
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={handleTitulo}
            required
          />
          <input
            className="text-black border-b border-black bg-slate-300 w-[500px]"
            type="text"
            placeholder="Descricão"
            value={descricao}
            onChange={handleDescricao}
            required
          />
        </div>

        <div className="flex">
          <fieldset>data de abertura:</fieldset>
          <input
            className="text-xs pl-5 text-slate-400 border-b mr-4 border-black bg-slate-300 w-[300px]"
            type="Date"
            value={entradaDate}
            onChange={handleEntrada}
            required
          />
          <fieldset>data de entrega:</fieldset>
          <input
            className="text-xs pl-5 text-slate-400 border-b border-black bg-slate-300 w-[270px]"
            type="Date"
            value={saidaDate}
            onChange={handleSaida}
            required
          />
        </div>

        <input
          className=" mt-5 h-[40px] bg-black rounded-sm w-[150px] mr-4px]"
          type="submit"
          value="Cadastrar tarefa"
        />
      </form>
    </div>
  );
}

export default Tarefas;
