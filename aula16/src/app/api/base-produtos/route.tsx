import { TipoProduto } from "@/types";
import { promises as fs} from "fs"
import { NextResponse } from "next/server";

export async function GET(){
    
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos = JSON.parse(file);

    return NextResponse.json(produtos);
}

export async function POST(request:Request){
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    // const {nome,preco,estoque} = await request.json();
    const produto:TipoProduto = await request.json();

    //Criar um ID no novo OBJETO que será inserido no base.json.
    // const produto = {nome,preco,estoque} as TipoProduto;
    produto.id = ( produtos[produtos.length-1].id + 1);

    console.log(produto);

    //Inserir o novo produto que já possui inclusive ID na lista de produtos:
    produtos.push(produto);

    //Processo de manipulação do arquuivo com promises e process.cwd para colocar a lista no arquivo e atualizar ele.

    //1 - Convertendo a lista em STRING
    const fileUpdate = JSON.stringify(produtos);
    //2 - Escrevendo no arquivo através do caminho especificado.
    await fs.writeFile(process.cwd() + '/src/data/base.json', fileUpdate);

    return NextResponse.json(produto);
}


