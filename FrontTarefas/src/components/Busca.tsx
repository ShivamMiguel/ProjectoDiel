import axios from "axios";
import { Article, BellRinging, PencilSimple, Trash } from "phosphor-react";
import { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

type Repository = {
    titulo : string;
    descricao:string;
    uuid : string;
    entradadate: string;
    saidadate:string;
}




const BuscarTarefa =() =>{

    const apagarTarefa =(uuid:string) =>{

        axios.delete(`http://localhost:5000/tarefas/${uuid}`).then(res => {
            if(res.status === 200){
                 const repo = (repositories?.filter(e => e.uuid !== uuid))

                setRepositories(repo)
            }
        })

      

    }

    const fetch = useFetch<Repository[]>('http://localhost:5000/tarefas');

    const [repositories, setRepositories] = useState(fetch.data)

    const [value, setValue] = useState('');

    useEffect(()=>{
    axios.get(`http://localhost:5000/tarefas?titulo=${value}`).then(res=>setRepositories(res.data))
   
    }, [value])

    return (
        <div className=" flex flex-col mt-8
        ">
            <input  placeholder="Buscar tarefas " className=" rounded-2xl pl-5 h-11 ml-[500px] w-[600px] border-b text-white mr-10  bg-black"
             value={value}
             type="text"
             onChange={e => setValue(e.target.value)}
             />
              
                
             
             <div className="mb-5 ml-[135px] flex w-full flex-wrap ">
                {   
                repositories?.map(item => (
                
                          <div className="  bg-black mt-5 ml-4 rounded-md flex flex-col  h-[200px] w-[400px]">
                         <h1 className="flex items-center gap-2 font-bold w-[300px] text-xl border-white  ml-4 mt-2"><BellRinging size={20}  />{item.titulo}</h1>
                         <div className="ml-4 border flex flex-col justify-center w-[300px]">
                            <p className="flex items-center gap-2 mt-5 text-slate-400  text-xs ml-4"><Article size={15}  />{item.descricao}</p>
                            <p className="text-xs text-slate-400 ml-4"><strong className='text-lg'>Inicio :</strong>{item.entradadate}</p>
                            <p className="text-xs text-slate-400 ml-4"><strong className='text-lg'>Termino :</strong>{ item.saidadate}</p>

                         </div>
                        
                        <div className='flex  mt-[20px] ml-4'>
                            <button onClick={e=>apagarTarefa(item.uuid)} className='flex '><Trash size={25} color="#f20707" /></button>
                           
                        </div>
                     
                    </div>
                    
                  
                ))
             }
             
             </div>
             </div>
             

       
    )

}


export default BuscarTarefa;