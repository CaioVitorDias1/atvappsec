import { useNavigate } from "react-router-dom";


function App() {

  const navigate = useNavigate()

  function alterardados(){
    navigate("/alterar")
  }

  function alteracao() {
    navigate("/alterarpref")
  }

  return (
    <div className="App">
     <button onClick={alterardados}>alterar dados</button>
     <button className="botaoalterar" onClick={alteracao}>alterar permissoes</button>
     <h1>Serviço 1</h1>
    </div>
  );
}

export default App;
