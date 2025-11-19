let dados = [];


 async function IniciarBusca(){
    try{
        let resp = await fetch("dados.json");
        let dados = await resp.json();
        console.log(dados);
    }
    catch(e){
        console.error(e);
    }
}