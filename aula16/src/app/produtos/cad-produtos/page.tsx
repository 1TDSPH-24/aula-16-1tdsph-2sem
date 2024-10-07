"use client"

import { TipoProduto } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CadProdutos() {

  const navigate = useRouter();

  //Armazenando o valor de estado dos inputs.
  const [produto, setProduto] = useState<TipoProduto>({
    id:0,
    nome: "",
    preco: 0,
    estoque: 0,
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/base-produtos",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
      });

      if(response.ok){
        //Resetar os campos do form após o produto ter sido cadastrado com sucesso.
        setProduto({id:0,nome:"",preco:0,estoque:0});
        alert("Produto cadastrado com sucesso!");
        //Redirecionando o usuário para a página de PRODUTOS...
        navigate.push("/produtos");
      }else{
        alert("Erro ao cadastrar produto!");
      }

    } catch (error) {
      console.error("Erro ao cadastrar produto: " , error);
    }


  }

  return (
    <div>
        <h1>Cadastro de Produtos</h1>

          <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div>
                  <label htmlFor="idNome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do Produto:</label>
                  <input type="text" name="nome" id="idNome" value={produto.nome} onChange={(e)=> setProduto({...produto,nome:e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome do Produto"/>
                </div>
                <div>
                  <label htmlFor="idPreco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço do Produto:</label>
                  <input type="number" name="preco" id="idPreco" value={produto.preco} onChange={(e)=> setProduto({...produto,preco: parseFloat(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                  <label htmlFor="idEstoque">Estoque do Produto:</label>
                  <input type="number" name="estoque" id="idEstoque" value={produto.estoque} onChange={(e)=> setProduto({...produto,estoque: parseInt(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                  <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                </div>
            </form>
          </div>
 
    </div>
  )
}
