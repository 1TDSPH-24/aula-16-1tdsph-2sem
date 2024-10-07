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
    
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    const idProduto = produtos.findIndex( p => p.id == params.id );

    produtos.splice(idProduto,1);

    //1 - Convertendo a lista em STRING
    const fileUpdate = JSON.stringify(produtos);
    //2 - Escrevendo no arquivo através do caminho especificado.
    await fs.writeFile(process.cwd() + '/src/data/base.json', fileUpdate);

    return NextResponse.json({msg:"Produto Removido com sucesso!"});
}
