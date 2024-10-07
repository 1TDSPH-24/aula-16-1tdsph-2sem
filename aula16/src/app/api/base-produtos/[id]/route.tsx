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
    //RECUPERANDO A LISTA PARA SER MANIPULADA
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    //ENCONTRANDO O ID DO OBJETO PARA SER REMOVIDO COM findIdex
    const idProduto = produtos.findIndex( p => p.id == params.id );

    //UTILIZAR O MÉTODO SPLICE PARA REMOVER ESTE OBJETO DA LISTA, UTILIZANDO O INDICE ENCONTRADO:
    produtos.splice(idProduto,1);

    //PRECISAMOS DEVOLVER AS LISTA PARA O ARQUIVO BASE.JSON()
    const fileUpdate = JSON.stringify(produtos);
    await fs.writeFile(process.cwd() + '/src/data/base.json', fileUpdate);


    return NextResponse.json({msg: "Produto removido com sucesso!"});
}
