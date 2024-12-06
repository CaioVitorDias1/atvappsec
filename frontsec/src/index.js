import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './paginas/login/login.jsx';
import Cadastro from './paginas/cadastro/cadatro.jsx';
import Home from './paginas/home/home.jsx'
import Usuario from './paginas/usuario/usuario.jsx';
import Refazer from './paginas/refazer/refazer.jsx';
import CadastroTermo from './paginas/cadastroTermo/CadastroTermo.jsx';
import UpdateTermo from './paginas/cadastroTermo/UpdateTermo.jsx';
import RefazerTermo from './paginas/refazer/refazerTermoo.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/alterar",
    element: <Usuario/>
  },
  {
    path: "/refazer",
    element: <Refazer />
  },
  {
    path: "cadastros",
    element: <CadastroTermo />
  },
  {
    path: "atualizartermo",
    element: <UpdateTermo />
  },
  {
    path: "alterarpref",
    element: <RefazerTermo />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);


