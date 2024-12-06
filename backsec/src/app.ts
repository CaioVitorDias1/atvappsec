import express, { Request, Response } from "express"
import sequelize from "./config/databaseconfig"
import User from "./entity/User"
import EntidadeDieta from "./mobaiou/EntidadeDieta"
import EntidadeAlimento from "./mobaiou/EntidadeAlimento"
import cors from "cors"
import Termos from "./entity/termos"
import HistoricoPermi from "./entity/HistoricoPermi"
import Opcoes from "./entity/Opcoes"
import Registro from "./entity/Registro"

import EntidadeTreino from "./mobaiou/EntidadeTreino"
import EntidadeUser from "./mobaiou/EntidadeUser"
import { Sequelize, where } from "sequelize"
import sequelize2 from "./config/backupconfig"

const app = express()

export default app;

app.use(express.json())
app.use(cors())
// app.use("/opcoes" , router)

async function createDefaultAdmin() {
  // Verifica se já existe um usuário admin
  const adminExists = await User.findOne({ where: { nome: "admin" } });

  if (!adminExists) {
    // Cria um usuário admin se não existir
    await User.create({ nome: "admin" , telefone: "123456789", email: "adminemail", senha: "admin"});
    await Opcoes.create({texto: "Você permite a utilização de seu número de telefone para receber mensagens e promoções sobre nossos serviços?", obrigatorio: false})
    await Opcoes.create({texto: "Você permite a utilização dos dados mencionados entre nossos serviços?", obrigatorio: true})

    await Termos.create({listaOpcoes: [1,2,3], versao: 1, listaIds:[1], textao: "TITULO1"})
    await HistoricoPermi.create({idDoUsuario: 1, termosAceitados: [1], versao: 1})

    await EntidadeUser.create({email: "admin", senha: "admin"})
    await EntidadeDieta.create({nome: "dieta1", nomeAlimento: "batata", gramas: "250", horarios: "10:30", validade: "12/05/2024",})
    await EntidadeTreino.create({nome: "treino1", nomeExercicio: "flexao", repeticoes: "15", validade: "12/05/2024",})

    console.log("Usuário admin criado!");
  } else {
    console.log("Usuário admin já existe.");
  }
}



sequelize.sync({force: true}).then(async () => {
  console.log("Banco de dados sincronizado.");
  await createDefaultAdmin(); // Criação do admin
});


// const usuario = {
//   nome: "user",
//   email: "admin",
//   telefone: "123456789",
//   senha: "admin"
// }

// User.create(usuario)
// console.log("user admin criado")
app.get("/", async (req: Request, res: Response) => {
    const users = await User.findAll();
    console.log("buscar users")
    res.json(users)
})

app.get("/users/", async (req: Request, res: Response) => {
  const users = await EntidadeUser.findAll();
  console.log("buscar users")
  res.json(users)
})

app.post("/loginuser", async (req: Request, res: Response) => {
  const usuario = req.body;
  const user:Promise<User> = User.findOne(usuario)
  let userId = (await user).id

  if(!user){
    res.status(500).json({error : "nao existe usuario"})
  }

  res.status(200).json({userId, message: "user logado"})
})

app.post("/user/login", async (req: Request, res: Response) => {
  const { email, senha } = req.body; // Email e senha enviados pelo front-end

  try {
    // Busca o usuário no banco de dados pelo email e senha
    const usuario = await EntidadeUser.findOne({
      where: { email: email, senha: senha },
      
    });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      res.status(401).json({ message: "Email ou senha incorretos" });
    }

    // Simula um token ou mensagem de sucesso
    res.status(200).json({
      message: "Login bem-sucedido",
      usuario
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro interno no servidor",
    });
  }
});
app.post("/userCadastro", async (req: Request, res: Response) => {
    const {nome, telefone, senha, email} = req.body;
    const user = User.create({nome, telefone, senha, email})
    console.log("user cadastrado")
    res.json(user);
})

app.post("/user/cadastrar", async (req: Request, res: Response) => {
  const {email, senha} = req.body;
  const user = await EntidadeUser.create({email, senha})
  console.log("user cadastrado")
  res.json(user);
})

app.delete("/userdeletar/:id",  async (req: Request, res: Response)  => {
  try {
    const { id } = req.params; // Obtém o id da opção a ser deletada

    // Busca a opção pelo id
    const opcao = await User.findByPk(id)

    
    await opcao?.destroy()
    // Exclui a opção

    res.status(200).json({ message: 'Opção excluída com sucesso' });
    console.log("deletou")
} catch (error) {
    console.error("Erro ao excluir opção:", error);
    res.status(500).json({ error: "Erro ao excluir opção" });
}
})

app.put(
  "/user/update/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    try {
      // Busca o usuário pelo ID
      const user = await EntidadeUser.findByPk(id)

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
      }

      // Atualiza os dados
      
      user.email = email || user.email;
      
      user.senha = senha || user.senha;

      await user.save(); // Salva as alterações no banco
      res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
      console.log("funcinou")
    } catch (error) {
      console.log("nao funcionou")
      res
        .status(500)
        .json({ error: "Erro ao atualizar o usuário.", details: error });
    }
  }
);


app.put(
  "/users/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    try {
      // Busca o usuário pelo ID
      const user = await User.findByPk(id)

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
      }

      // Atualiza os dados
      user.nome = nome || user.nome;
      user.email = email || user.email;
      user.telefone = telefone || user.telefone;
      user.senha = senha || user.senha;

      await user.save(); // Salva as alterações no banco
      res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
      console.log("funcinou")
    } catch (error) {
      console.log("nao funcionou")
      res
        .status(500)
        .json({ error: "Erro ao atualizar o usuário.", details: error });
    }
  }
);

app.delete("/user/deletar/:id",  async (req: Request, res: Response)  => {
  try {
    const { id } = req.params; // Obtém o id da opção a ser deletada

    // Busca a opção pelo id
    const opcao = await EntidadeUser.findByPk(id)

    
    await opcao?.destroy()
    // Exclui a opção

    res.status(200).json({ message: 'Opção excluída com sucesso' });
} catch (error) {
    console.error("Erro ao excluir opção:", error);
    res.status(500).json({ error: "Erro ao excluir opção" });
}
})


  app.get('/buscaropcoes', async (req: Request, res: Response) => {
    try {
        const opcoes = await Opcoes.findAll(); // Recupera todas as opções
        res.status(200).json(opcoes);
    } catch (error) {
        console.error("Erro ao buscar opções:", error);
        res.status(500).json({ error: "Erro ao buscar opções" });
    }
})

// Método POST para criar uma nova opção

app.post("/cadastrarOption" , async (req: Request, res: Response) => {
  try{
    const {texto, obrigatorio} = req.body;

    const opcao = await Opcoes.create({texto, obrigatorio})
    res.status(201).json(opcao)
  }catch(error){
    console.log(error)
    res.status(500).json({error: "erro ao criar option"})
  }
})

app.get('/buscaropcao/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("chegou aqui")
  try {
    const opcoes = await Opcoes.findByPk(id);
    console.log("chegou aqui")
    res.json(opcoes);
    console.log("chegou aqui")
  } catch (error) {
    console.log("deu erro")
    console.error("Erro ao buscar termo:", error);
    res.status(500).json({ message: "Erro ao buscar o termo" });
  }
})

// Rota para buscar múltiplas opções com base em uma lista de IDs
app.get('/variasopcoes/:ids', async (req: Request, res: Response) => {
  const { ids } = req.params;

  // Converte a string de IDs separados por vírgula para um array de números
  const idsArray = ids.split(',').map(Number);

  try {
    // Busca todas as opções que correspondem aos IDs fornecidos
    const opcoes = await Opcoes.findAll({
      where: {
        id: idsArray, // Filtra as opções pelo array de IDs
      },
    });

    // Se nenhuma opção for encontrada, retorna erro
    if (opcoes.length === 0) {
      res.status(404).json({ message: 'Nenhuma opção encontrada' });
    }

    // Retorna as opções encontradas
    res.json(opcoes);
  } catch (error) {
    console.error('Erro ao buscar as opções back:', error);
    res.status(500).json({ message: 'Erro ao buscar as opções back' });
  }
});




// Método DELETE para excluir uma opção por id
app.delete("deletarOption",  async (req: Request, res: Response)  => {
  try {
    const { id } = req.params; // Obtém o id da opção a ser deletada

    // Busca a opção pelo id
    const opcao = await Opcoes.findByPk(id);

  
    await opcao?.destroy()
    // Exclui a opção

    res.status(200).json({ message: 'Opção excluída com sucesso' });
} catch (error) {
    console.error("Erro ao excluir opção:", error);
    res.status(500).json({ error: "Erro ao excluir opção" });
}
})


app.post("/cadastrarTermo" , async (req: Request, res: Response) => {
  try{
    const {listaOpcoes, versao, textao} = req.body;

    const termo = await Termos.create({listaOpcoes, versao, textao})
    res.status(201).json(termo)
  }catch(error){
    console.log(error)
    res.status(500).json({error: "erro ao criar termo"})
  }
})

app.get('/buscartermos', async (req: Request, res: Response) => {
  try {
      const termos = await Termos.findAll(); // Recupera todas as opções
      res.status(200).json(termos)
      console.log("chegou aqui1");
  } catch (error) {
      console.error("Erro ao buscar termos:", error);
      res.status(500).json({ error: "Erro ao buscar termos" });
      console.log("chegou aqui2")
  }
})

app.get('/buscartermo/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("chegou aqui")
  try {
    const termo = await Termos.findByPk(id);
    console.log("chegou aqui")
    res.json(termo);
    console.log("chegou aqui")
  } catch (error) {
    console.log("deu erro")
    console.error("Erro ao buscar termo:", error);
    res.status(500).json({ message: "Erro ao buscar o termo" });
  }
})


app.get("/buscartermonovo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const termo = await Termos.findByPk(id);

    if (!termo) {
      res.status(404).json({ message: "Termo não encontrado" });
    }

    // Busca os textos das opções relacionadas
    const textosOpcoes = await termo?.getOpcoesTextos();

    res.json({
      id: termo?.id,
      versao: termo?.versao,
      listaOpcoes: textosOpcoes,
      listaIds: termo?.listaOpcoes, // Retorna os textos ao invés dos IDs
      textao: termo?.textao
    });
  } catch (error) {

    res.status(500).json({ message: "Erro ao buscar o termo" });
  }
});

app.put("/atualizartermo/:id", async (req, res) => {
  const { id } = req.params;
  const { listaOpcoes, versao } = req.body;

  try {
    const termo = await Termos.findByPk(id);

    if (!termo) {
    res.status(404).json({ message: "Termo não encontrado" });
    }

    await termo?.update({ listaOpcoes, versao });
     res.json({ message: "Termo atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar termo:", error);
    res.status(500).json({ message: "Erro ao atualizar o termo" });
  }
});


app.post("/registrar", async (req: Request, res: Response) => {
  const { termoId, versao, opcoesAceitas, userId } = req.body; // Dados enviados do frontend

  // if (!termoId || !versao || !opcoesAceitas || opcoesAceitas.length === 0) {
  //   res.status(400).json({ message: "Dados inválidos" });
  // }
  console.log(termoId, versao, opcoesAceitas, userId)
  try {
    // Cria os registros na tabela Aceites
    // const aceites = await Promise.all(
    //   opcoesAceitas.map(async (opcaoId: number) => {
    //     return Registro.create({
    //       termoId,
    //       versao,
    //       opcaoId,
    //       userId,
    //     });
    //   })
    // );
    const versaoTermo = versao;
    const opcaoId = opcoesAceitas
    const criarRegistro = {
      termoId: termoId,
      versaoTermo: versao,
      opcaoId: opcoesAceitas,
      userId: userId
    }

    const registrar = await Registro.create({
      termoId,
      versao,
      opcoesAceitas,
      userId
    })

    console.log(registrar)
    console.log("2")


    res.status(201).json({ message: "Aceites registrados com sucesso", registrar });
    console.log("registrou opçoes")
  } catch (error) {
  
    res.status(500).json({ message: "Erro ao registrar aceites" });
  }
});


app.post("/treino/cadastrar", async (req: Request, res: Response) => {
  try{
      const {nome, nomeExercicio, repeticoes, validade} = req.body

      const treinoCriado = await EntidadeTreino.create(
          {
              nome, nomeExercicio, repeticoes, validade
          }
          
      )
      res.status(201).json({
          message: "Cadastrou",
          data: treinoCriado
      })

      console.log("deu certo cadastro")
  }catch(erro){
      console.log("deu erro", erro)
  }
})

app.put("/treino/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // ID do treino a ser atualizado
  const { nome, nomeExercicio, repeticoes, validade } = req.body; // Dados para atualização

  try {
    // Busca o treino pelo ID
    const treino = await EntidadeTreino.findByPk(id);

    // Verifica se o treino existe
    if (!treino) {
      res.status(404).json({ message: "Treino não encontrado" });
    }

    // Atualiza os campos fornecidos no corpo da requisição
    await treino?.update({
      nome: nome || treino.nome, // Atualiza se fornecido, senão mantém o valor antigo
      nomeExercicio: nomeExercicio || treino.nomeExercicio,
      repeticoes: repeticoes || treino.repeticoes,
      validade: validade || treino.validade
    });

    res.status(200).json({
      message: "Treino atualizado com sucesso!",
      data: treino,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar treino",
    });
  }
});

app.post('/dieta/cadastrar', async (req: Request, res: Response) => {
  const { nome, validade, nomeAlimento, gramas, horarios } = req.body;
console.log("cadastrando dieta")
  try {
    const novaDieta = await EntidadeDieta.create(
      {  nome, validade, nomeAlimento, gramas, horarios},
  
    );
    console.log("dieta cadastrada")
    res.status(201).json(novaDieta);
  } catch (error) {
    console.error('Erro ao criar dieta:', error);
    res.status(500).json({ error: 'Erro ao criar dieta' });
  }
});

app.put("/dieta/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // ID do treino a ser atualizado
  const { nome, nomeAlimento, gramas, validade, horarios } = req.body; // Dados para atualização

  try {
    // Busca o treino pelo ID
    const dieta = await EntidadeDieta.findByPk(id);

    // Verifica se o treino existe
    if (!dieta) {
      res.status(404).json({ message: "Treino não encontrado" });
    }

    // Atualiza os campos fornecidos no corpo da requisição
    await dieta?.update({
      nome: nome || dieta.nome, // Atualiza se fornecido, senão mantém o valor antigo
      nomeAlimento: nomeAlimento || dieta.nomeAlimento,
      gramas: gramas || dieta.gramas,
      validade: validade || dieta.validade,
      horarios: horarios || dieta.horarios
    });

    res.status(200).json({
      message: "Treino atualizado com sucesso!",
      data: dieta,
    });
  } catch (error) {
    console.error("Erro ao atualizar treino:", error);
    res.status(500).json({
      message: "Erro ao atualizar treino",
    });
  }
});

app.delete("/treino/deletar/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // ID do treino a ser deletado

  try {
    // Busca o treino pelo ID
    const treino = await EntidadeTreino.findByPk(id);

    // Verifica se o treino existe
    if (!treino) {
   res.status(404).json({ message: "Treino não encontrado" });
    }

    // Deleta o treino
    await treino?.destroy();

    res.status(200).json({
      message: "Treino deletado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar treino:", error);

    res.status(500).json({
      message: "Erro ao deletar treino",
    });
  }
});

app.delete("/dieta/deletar/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // ID do treino a ser deletado

  try {
    // Busca o treino pelo ID
    const treino = await EntidadeDieta.findByPk(id);

    // Verifica se o treino existe
    if (!treino) {
   res.status(404).json({ message: "Treino não encontrado" });
    }

    // Deleta o treino
    await treino?.destroy();

    res.status(200).json({
      message: "Treino deletado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar treino:", error);

    res.status(500).json({
      message: "Erro ao deletar treino",
    });
  }
});

app.get("/treino/buscar", async (req: Request, res: Response) => {
  try {
    // Busca todos os treinos no banco
    const treinos = await EntidadeTreino.findAll();

    // Retorna os treinos encontrados
    res.status(200).json(treinos);
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);

    res.status(500).json({
      message: "Erro ao buscar treinos",
    });
  }
});

app.get("/dieta/buscar", async (req: Request, res: Response) => {
  try {
    // Busca todos os treinos no banco
    const treinos = await EntidadeDieta.findAll();

    // Retorna os treinos encontrados
    res.status(200).json(treinos);
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);

    res.status(500).json({
      message: "Erro ao buscar treinos",
    });
  }
});


app.listen(3004, '0.0.0.0', () => {
    console.log("rodando na porta 3004")
})

