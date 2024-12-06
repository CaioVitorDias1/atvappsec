import axios from "axios";
import { useState, useEffect } from "react"
import Textao from "../textao/textao"

export default function Cadastro() {

    const [nome, setNome] = useState("")   
    const [email, setEmail] = useState("")
    const [sen, setSen] = useState("")
    const [telefone, setTelefone] = useState("")
    const [ativarComp, setAtivarComp] = useState()
    const [effect, setEffect] = useState();
    const per = localStorage.getItem("chave");

    useEffect(() => {
        const per = localStorage.getItem("chave");
        setEffect(per)
    }, [])

    const mostrarComponente = () => {
        if(effect === 'false'){
            setAtivarComp(true)
        }
        console.log("clicou")
    }

    async function cadastro2() {
        try{
            const resposta = await axios.post("http://localhost:3005/userCadastro",
                {
                    nome: nome,
                    telefone: telefone,
                    email: email,
                    senha: sen 
                }
            )

            console.log(resposta)
    
        }catch(err){
            console.log(err);
        }
    }

    async function handleCadastro() {
        mostrarComponente()
        try{
            const resposta = await axios.post("http://localhost:3004/userCadastro",
                {
                    nome: nome,
                    telefone: telefone,
                    email: email,
                    senha: sen 
                }
            )

            console.log(resposta)
            window.alert("cadastrado com sucesso")
            cadastro2()
        }catch(err){
            console.log(err);
        }
    } 

    return(
        <div className="background">
            <div className="container3">
                <h1>Cadastro</h1>

                <h1>insira o nome</h1>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <h1>insira o email</h1>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h1>insira o telefone</h1>
                <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <h1>coloque a senha</h1>
                <input type="password" value={sen} onChange={(e) => setSen(e.target.value)} />

                <button onClick={handleCadastro}>Cadastrar</button>

                <div>
                    {ativarComp ? (
                        
                        <Textao onAccept={mostrarComponente} />

                    ) : (
                            <h3>okay</h3>
                    )}
                </div>
            </div>
        </div>
    )
}