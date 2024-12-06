import { useState } from "react"
import Textao from "../textao/textao"
import App from "../../App"
import CompTermo from "../compTermo"

export default function Home() {

    const [ativarComp, setAtivarComp] = useState(true)

    

    const mostrarComponente = () => {
        setAtivarComp(false)
        console.log("clicou")

        //axios.post("")
    }

    return(
        <div>
                <div>
                    {ativarComp ? (
                        
                        <CompTermo onAccept={mostrarComponente} />

                    ) : (
                            <App/>
                    )}
                </div>
          
        </div>
    )
}