import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {

    const navigate = useNavigate()

    const per = localStorage.setItem("chave", "false")
 
    const [email, setEmail] = useState("")
    const [sen, setSen] = useState("")

    function handleCadastro(){
        navigate("/cadastro")
    }

   async function handleLogin() {
    try{
        const resposta = await axios.post("http://localhost:3004/loginuser",
            {
                email: email,
                senha: sen
            }
        )

        console.log(resposta)
        let id = toString(resposta.data)
        localStorage.setItem("userid", id)
        let iduser = localStorage.getItem("userid")
        console.log(iduser)
        navigate("/home")
    
    }catch(err){
        console.log(err);
    }
    }

    return (
        <div className="background">
            <div className="container">
                <h1>Entrar</h1>
                <h1>insira o email</h1>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h1>coloque a senha</h1>
                <input type="password" value={sen} onChange={(e) => setSen(e.target.value)} />
                <button onClick={handleLogin}>Entrar</button>
                <button className="botaocadastrar" onClick={handleCadastro}>Cadastrar</button>
            </div>
        </div>
    )
}