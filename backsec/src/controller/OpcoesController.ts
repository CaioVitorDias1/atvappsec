import { Request, Response } from 'express';
import Opcoes from '../entity/Opcoes';


// Método GET para buscar todas as opções

export const getAllOptions = async (req: Request, res: Response) => {
    try {
        const opcoes = await Opcoes.findAll(); // Recupera todas as opções
        res.status(200).json(opcoes);
    } catch (error) {
        console.error("Erro ao buscar opções:", error);
        res.status(500).json({ error: "Erro ao buscar opções" });
    }
};

// Método POST para criar uma nova opção
export const createOptions = async (req: Request, res: Response) => {
    try {
        const { texto } = req.body; // Recebe o texto da opção do corpo da requisição
        // if (typeof texto !== 'string') {
        //     return res.status(400).json({ error: 'O campo "texto" é obrigatório e deve ser uma string.' });
        // }

        // Cria a nova opção no banco
        const opcao = await Opcoes.create({ texto });
        res.status(201).json(opcao); // Retorna a nova opção criada
    } catch (error) {
        console.error("Erro ao criar opção:", error);
        res.status(500).json({ error: "Erro ao criar opção" });
    }
};

// Método DELETE para excluir uma opção por id
export const removeOptions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtém o id da opção a ser deletada

        // Busca a opção pelo id
        const opcao = await Opcoes.findByPk(id);

      
        await opcao?.destroy
        // Exclui a opção
    
        res.status(200).json({ message: 'Opção excluída com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir opção:", error);
        res.status(500).json({ error: "Erro ao excluir opção" });
    }
};