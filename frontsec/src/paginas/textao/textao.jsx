import "./textao.css"


export default function Textao({onAccept}) {
   


    return(
        <div className="background">
        <div className="container2">
            <h3>Como utilizamos os seus dados?</h3>
            <p>
                Ao acessar essa aplicação, você aceita que os seguintes dados serão compartilhados entre nossos serviços:
            </p>
            <p> - Nome do usuário</p>
            <p> - Email do usuário</p>
            <p> - Telefone do usuário</p>
            <p> - Histórico de compras dentro do site</p>
            {/* <p>você permite?....</p>
            <input type="checkbox"></input>
            <p>você permite?....</p>
            <input type="checkbox"></input> */}
            <p>Você permite que utilizemos o seu email para enviar novidades e informações acerca de nossos serviços?</p>
            <input type="checkbox"></input>
            <p>Você permite a utilização de seu número de telefone para receber mensagens e promoções sobre nossos serviços?</p>
            <input type="checkbox"></input>
            <p>Você aceita que tenhamos acesso ao histórico de seu navegador para melhor direcionamento de nossos produtos?</p>
            <input type="checkbox"></input>
            <p>Você permite que compartilhemos seu histórico de compras com aplicativos terceiros?</p>
            <input type="checkbox"></input>
            <p>Você permite a utilização dos dados mencionados entre nossos serviços?</p>
            <input type="checkbox"></input>

            <button onClick={onAccept}>Aceitar</button>
        </div>
        </div>
    )
}