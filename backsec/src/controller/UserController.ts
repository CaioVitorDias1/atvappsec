import app from "../app";
import User from "../entity/User";
import express, { Request, Response } from "express"


app.post("/loginuser", async (req: Request, res: Response) => {
    const usuario = req.body;
    const user:Promise<User> = User.findOne(usuario)
    let userId = (await user).id
  
    if(!user){
      res.status(500).json({error : "nao existe usuario"})
    }
  
    res.status(200).json({userId, message: "user logado"})
  })