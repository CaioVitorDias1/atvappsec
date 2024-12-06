import React ,{ useState, useEffect } from "react"
import axios from "axios"

interface Termo {
  id: number;
  listaOpcoes: number[];  // IDs das opções
  versao: number;
  textao: string;
  lsitaIds: number[]
}

interface Opcao {
  id: number;
  texto: string;
  obrigatorio: boolean;
  aceita: boolean;
}

export default function CompTermo({ onAccept }: any) {
  const [termo, setTermo] = useState<Termo | null>(null); // Estado para armazenar o termo
  const [opcoes, setOpcoes] = useState<Opcao[]>([]); // Estado para armazenar as opções detalhadas
  const [opcoesAceitas, setOpcoesAceitas] = useState<any>({}); // Estado para armazenar se as opções foram aceitas

  const [error, setError] = useState(""); // Estado para erros durante a requisição

  // Função para buscar o termo com id = 2
  const fetchTermo = async () => {
    try {
      const response = await axios.get("http://localhost:3004/buscartermonovo/1");
      setTermo(response.data); // Salva o termo no estado
      fetchOpcoes(response.data.listaIds); // Busca as opções com os IDs
    } catch (err) {
      console.error("Erro ao buscar o termo:", err);
      setError("Erro ao buscar o termo");
    }
  };

  const fetchOpcoes = async (opcoesIds: number[]) => {
    try {
      console.log("IDs enviados para o backend:", opcoesIds);
  
      // Envia todos os IDs de uma vez
      const response = await axios.get(`http://localhost:3004/variasopcoes/${opcoesIds.join(",")}`);
      console.log("Resposta da API:", response.data);
      
      setOpcoes(response.data); // Salva as opções detalhadas no estado

    } catch (err) {
      console.error("Erro ao buscar as opções no frontend:", err);
      setError("Erro ao buscar as opções");
    }
  
    console.log("Termo ID:", termo?.id);
    console.log("Termo listaOpcoes:", termo?.listaOpcoes);
    console.log("Termo textao:", termo?.textao);
    console.log("Termo versao:", termo?.versao);
  };

  // Função para alternar o estado de aceitação de uma opção
  const aceitarOpcao = (id: number) => {
    setOpcoesAceitas((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // useEffect para carregar os dados ao montar o componente
  useEffect(() => {
    fetchTermo();
    
  }, []);

  const toggleOpcao = (id: number) => {
    setOpcoes((prevOpcoes) =>
      prevOpcoes.map((opcao) =>
        opcao.id === id ? { ...opcao, aceita: !opcao.aceita } : opcao
      )
    );
  };


  const aaceitarOpcao = (id: number) => {
    setOpcoesAceitas((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id], // Alterna o valor atual (true/false)
    }));
  };

  const handleAccept2 = async () => {
    try {
      const opcoesSelecionadas = Object.keys(opcoesAceitas)
        .filter((id) => opcoesAceitas[id]) // IDs com valor `true`
        .map(Number);

        const obrigatorias = opcoes
        .filter((opcao) => opcao.obrigatorio) // Filtra as obrigatórias
        .map((opcao) => opcao.id); // Extrai os IDs

      // Combina IDs de aceites manuais e obrigatórias
      const todasOpcoesAceitas = [...new Set([...opcoesSelecionadas, ...obrigatorias])];

      const data = {
        termoId: termo?.id, // ID do termo
        versao: termo?.versao, // Versão do termo
        opcoesAceitas: todasOpcoesAceitas, // IDs das opções aceitas
        userId: 1, // ID do usuário (se necessário)
      };
  
      const response = await axios.post("http://localhost:3005/registrar", data);
  
      console.log("Aceites registrados com sucesso:", response.data);
     
     
      onAccept()
    } catch (error) {
      console.error("Erro ao registrar aceites:", error);
    
    }
  };

  function chamadora() {
    handleAccept()
    handleAccept2()
  }
  const handleAccept = async () => {
    try {
      const opcoesSelecionadas = Object.keys(opcoesAceitas)
        .filter((id) => opcoesAceitas[id]) // IDs com valor `true`
        .map(Number);

        const obrigatorias = opcoes
        .filter((opcao) => opcao.obrigatorio) // Filtra as obrigatórias
        .map((opcao) => opcao.id); // Extrai os IDs

      // Combina IDs de aceites manuais e obrigatórias
      const todasOpcoesAceitas = [...new Set([...opcoesSelecionadas, ...obrigatorias])];

      const data = {
        termoId: termo?.id, // ID do termo
        versao: termo?.versao, // Versão do termo
        opcoesAceitas: todasOpcoesAceitas, // IDs das opções aceitas
        userId: 1, // ID do usuário (se necessário)
      };
  
      const response = await axios.post("http://localhost:3004/registrar", data);
  
      console.log("Aceites registrados com sucesso:", response.data);
      alert("Opções aceitas com sucesso!");
      handleAccept2()
      onAccept()
    } catch (error) {
      console.error("Erro ao registrar aceites:", error);
      alert("Erro ao registrar as opções aceitas.");
    }
  };

  // Renderiza mensagens de carregamento ou erro
  if (!termo && !error) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
    <h1>Termo: {termo?.textao}</h1>
    <h2>Versão: {termo?.versao}</h2>
    <h3>Opções:</h3>
    <ul>
      {opcoes.map((opcao) => (
        <li key={opcao.id}>
          <span>{opcao.texto}</span>
          {opcao.obrigatorio ? (
            <span style={{ color: "red" }}>
            {" "}
            <strong>(Obrigatória)</strong>
          </span>
          ) : (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={opcoesAceitas[opcao.id] || false} // Usa o estado para controlar o checkbox
                  onChange={() => aaceitarOpcao(opcao.id)} // Atualiza o estado ao clicar
                />
                Aceitar
              </label>
            </div>
          )}
        </li>
      ))}
    </ul>
    <button onClick={handleAccept}>Aceitar</button>
  </div>
  );
}

