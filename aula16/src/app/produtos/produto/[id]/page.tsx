"use client";
import { TipoProduto } from "@/types";
import { useEffect, useState } from "react";

export default function Produto({params}:{params:{id:number}}) {

  const [produto, setProduto] = useState<TipoProduto>()

  useEffect(() => {
      const chamadaApi = async () => {
          const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`);
          const data = await response.json();
          console.log(data);
          setProduto(data);
      }
      chamadaApi();
  }, []);

  return (
    <div>
        <h2>Produto</h2>
        <div>
            <h3>ID: {params.id}</h3>
            <h3>Nome: {produto?.nome}</h3>
            <h3>Preço: {produto?.preco}</h3>
            <h3>Estoque: {produto?.estoque}</h3>

        </div>
    </div>
  )
}
