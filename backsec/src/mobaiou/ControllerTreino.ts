import { Request, Response } from 'express';
import EntidadeTreino from './EntidadeTreino';



export const cadastrarTreino = async (req: Request, res: Response) => {
    try{
        const {nome, nomeExercio, repeticoes} = req.body

        const treinoCriado = await EntidadeTreino.create(
            {
                nome, nomeExercio, repeticoes
            }
            
        )
        res.status(201).json({
            message: "Cadastrou",
            data: treinoCriado
        })
    }catch(erro){
        console.log("deu erro")
    }
}

export const getAllTreino = async (req: Request, res: Response) => {
    try{}catch(erro){
        console.log("deu erro")
    }
}
export const getOneTreino = async (req: Request, res: Response) => {
    try{}catch(erro){
        console.log("deu erro")
    }
}
export const UpdateTreino = async (req: Request, res: Response) => {
    try{}catch(erro){
        console.log("deu erro")
    }
}
export const deletarTreino = async (req: Request, res: Response) => {
    try{}catch(erro){
        console.log("deu erro")
    }
}