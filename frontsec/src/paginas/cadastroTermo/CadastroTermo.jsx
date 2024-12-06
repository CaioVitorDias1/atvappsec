import axios from "axios";
import { useState } from "react"

export default function CadastroTermo() {

    const [textoop, setTextoop] = useState("");
    const [opId, setopId] = useState(0)
    const [lista, setLista] = useState([]);
    const [versao, setVersao] = useState("")
    const [obrigatoria, setObrigatoria] = useState(false); 
    const [textao, setTextao] = useState("")

    const handleAddToList = () => {
        console.log("id escolhido: ", opId)
        if (opId.trim() !== "") {
          setLista((prevList) => [...prevList, opId]);
          setopId(""); // Limpa o input após adicionar
        }
      };
    
    let listaa = []

    function criarOp2(){

        console.log(obrigatoria)
        let objetoOp = {
            texto: textoop,
            obrigatorio: obrigatoria
        }
        const response = axios.post("http://localhost:3005/cadastrarOption", objetoOp)
        .then((response) => console.log("deu certo"))

        
    }

    function criarOp(){

        console.log(obrigatoria)
        let objetoOp = {
            texto: textoop,
            obrigatorio: obrigatoria
        }
        const response = axios.post("http://localhost:3004/cadastrarOption", objetoOp)
        .then((response) => console.log("deu certo"))

        criarOp2()
    }

    function colocarId() {
        listaa.includes(opId)
        //setLista(opId)
       
        
    }

    function criarTermo2() {
        //listaId.copyWithin(lista)
        let listaId = lista
        console.log(listaId)
       
        let objetoTermo = {
            listaOpcoes : listaId,
            versao: versao,
            textao: textao
        }
        console.log(objetoTermo.listaOpcoes)
        const response = axios.post("http://localhost:3005/cadastrarTermo", objetoTermo)
        .then((response) => console.log("deu certo"))
    }

    function criarTermo() {
        //listaId.copyWithin(lista)
        let listaId = lista
        console.log(listaId)
       
        let objetoTermo = {
            listaOpcoes : listaId,
            versao: versao,
            textao: textao
        }
        console.log(objetoTermo.listaOpcoes)
        const response = axios.post("http://localhost:3004/cadastrarTermo", objetoTermo)
        .then((response) => console.log("deu certo"))
        criarTermo2()
    }


    return(
        <div>
            <h1>Criar opcao: </h1>
            <p>Texto:</p>
            <input type="text" value={textoop} onChange={(e) => setTextoop(e.target.value)} />

            <label>
            <input type="checkbox" checked={obrigatoria} onChange={(e) => setObrigatoria(e.target.checked)}/>
                Obrigatória?
            </label>
            <button onClick={criarOp}>Criar opcao</button>

          
        


            <h1>Criar termo:</h1>
            <p>Escolha o id da opcao para o termo</p>
            <input type="text" value={opId} onChange={(e) => setopId(e.target.value)} />
            <button onClick={handleAddToList}>escolher id</button>
            <h1>versao: </h1>
            <input type="text" value={versao} onChange={(e) => setVersao(e.target.value)} />
            <h1>Texto do Termo: </h1>
            <input type="text" value={textao} onChange={(e) => setTextao(e.target.value)} />

            <p>...</p>
            <button onClick={criarTermo}> criar termo </button>
        </div>
    )
}