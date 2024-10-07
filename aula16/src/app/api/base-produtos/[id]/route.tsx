import { TipoProduto } from "@/types";
import { promises as fs} from "fs"
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{id:number}}){
    
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    const produto = produtos.find( p => p.id == params.id );

    return NextResponse.json(produto);
}

export async function DELETE(request:Request,{params}:{params:{id:number}}){
    
    //Recuperando a lista para ser manipulada
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    //Encontrando o id do objeto para ser removido com findIndex!
    const idProduto = produtos.findIndex( p => p.id == params.id );
    //Utilizar o método splice para remover este objeto da lista, utilizando o indice encontrado
    produtos.splice(idProduto,1);

    //Precisamos devolver a lista para o arquivo base .json();

    //1 - Convertendo a lista em STRING
    const fileUpdate = JSON.stringify(produtos);
    //2 - Escrevendo no arquivo através do caminho especificado.
    await fs.writeFile(process.cwd() + '/src/data/base.json', fileUpdate);

    return NextResponse.json({msg:"Produto removido com sucesso"});
}
