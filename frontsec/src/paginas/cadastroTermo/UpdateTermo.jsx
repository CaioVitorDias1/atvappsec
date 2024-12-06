import axios from "axios";
import { useState, useEffect } from "react";

const UpdateTermo = () => {
    const [termo, setTermo] = useState(null);
    const [listaOpcoes, setListaOpcoes] = useState([]);
    const [versao, setVersao] = useState("");

    const termoId = 1;
  
    // Busca o termo atual para preencher o formulário
    useEffect(() => {
      const fetchTermo = async () => {
        try {
          const response = await axios.get(`http://localhost:3004/buscartermonovo/${termoId}`);
          setTermo(response.data);
          setListaOpcoes(response.data.listaOpcoes || []);
          setVersao(response.data.versao || "");
        } catch (error) {
          console.error("Erro ao buscar o termo:", error);
        }
      };
  
      fetchTermo();
    }, [termoId]);
  
    const handleUpdate2 = async (e) => {
      e.preventDefault();
  
      try {
        await axios.put(`http://localhost:3005/atualizartermo/${termoId}`, {
          listaOpcoes,
          versao,
        });
  
        alert("Termo atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o termo:", error);
        alert("Erro ao atualizar o termo.");
      }
    };

    // Atualiza o termo
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        await axios.put(`http://localhost:3004/atualizartermo/${termoId}`, {
          listaOpcoes,
          versao,
        });
  
        alert("Termo atualizado com sucesso!");
        handleUpdate2()
      } catch (error) {
        console.error("Erro ao atualizar o termo:", error);
        alert("Erro ao atualizar o termo.");
      }
    };
  
    // Adicionar uma nova opção na lista
    const handleAddOpcao = () => {
      setListaOpcoes([...listaOpcoes, ""]);
    };
  
    // Atualizar uma opção específica
    const handleOpcaoChange = (index, value) => {
      const updatedOpcoes = [...listaOpcoes];
      updatedOpcoes[index] = parseInt(value, 10); // Garantir que seja um número
      setListaOpcoes(updatedOpcoes);
    };
  
    // Remover uma opção da lista
    const handleRemoveOpcao = (index) => {
      const updatedOpcoes = listaOpcoes.filter((_, i) => i !== index);
      setListaOpcoes(updatedOpcoes);
    };
  
    if (!termo) return <p>Carregando termo...</p>;
  
    return (
      <div>
        <h1>Atualizar Termo</h1>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Versão:</label>
            <input
              type="number"
              value={versao}
              onChange={(e) => setVersao(e.target.value)}
            />
          </div>
          <div>
            <label>Lista de Opções:</label>
            {listaOpcoes.map((opcao, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  value={opcao}
                  onChange={(e) => handleOpcaoChange(index, e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveOpcao(index)}>
                  Remover
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddOpcao}>
              Adicionar Opção
            </button>
          </div>
          <button type="submit">Atualizar Termo</button>
        </form>
      </div>
    );
  };
  
  export default UpdateTermo;