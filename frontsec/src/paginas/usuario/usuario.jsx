import axios from "axios";
import React, { useState } from "react";

export default function Usuario() {
    const [nome, setNome] = useState("")   
    const [email, setEmail] = useState("")
    const [sen, setSen] = useState("")
    const [telefone, setTelefone] = useState("")


    async function alterarDados2() {
        try{
            const response = await axios.put(`http://localhost:3005/users/${1}`, {
                nome,
                email,
                telefone,
                sen,
              });

            console.log(response)
        }catch(err){
            console.log(err)
        }
    }

    async function alterarDados() {
        try{
            const response = await axios.put(`http://localhost:3004/users/${1}`, {
                nome,
                email,
                telefone,
                sen,
              });
              alterarDados2()
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }
    async function deletarDados2() {
        try{
            const response = await axios.delete(`http://localhost:3005/userdeletar/${1}`);
            console.log(response)
    
        }catch(err){
            console.log(err)
        }
    }

    async function deletarDados() {
        try{
            const response = await axios.delete(`http://localhost:3004/userdeletar/${1}`);
            console.log(response)
            deletarDados2()
            window.alert("Usuário deletado")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="background">
        <div className="container3">
            <h1>Alterar dados de usuario</h1>
            <div>
                <h3>Nome</h3>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
                <h3>Telefone</h3>
                <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
            <div>
                <h3>Email</h3>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <h3>Senha</h3>
                <input type="password" value={sen} onChange={(e) => setSen(e.target.value)} />
            </div>

            <button onClick={alterarDados}>Alterar</button>
            <button onClick={deletarDados}>Deletar</button>
        </div>
        </div>
    )
}