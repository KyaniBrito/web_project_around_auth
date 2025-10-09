# Tripleten web_project_around_auth

Este projeto consiste em uma aplicação web construída em **React, com Rotas protegidas, autenticação de usuários, CRUD de cartões, e popups interativos para adicionar, editar e remover informações**.
O objetivo principal é permitir que usuários autenticados possam gerenciar seus próprios cards, curtir/descurtir conteúdos e atualizar seu perfil, tudo dentro de uma interface responsiva e intuitiva.

O projeto segue as boas práticas de desenvolvimento, incluindo uso de Context API, componentização clara, tratamento de erros em requisições assíncronas e controle de estado via hooks.

---

## Funcionalidades

- Registro e login de usuários com autenticação via JWT
- Proteção de rotas, garantindo acesso apenas a usuários autenticados
- Exibição de informações do usuário (nome, ocupação e avatar)
- Edição de perfil e avatar via popups
- Criação de novos cards com título e imagem
- Exclusão de cards com confirmação via popup
- Ações de curtir e descurtir cards com atualização em tempo real
- Feedback visual para sucesso e erro nas operações
- Popups fecháveis via ESC ou clique no overlay
- Layout responsivo e intuitivo

## Experiência do Usuário

- Popups centralizados e acessíveis, com mensagens objetivas.
- Layout 100% responsivo para desktop e mobile.
- Interface estilo minimalista e moderno.
- Feedback imediato em todas as interações (envio de formulários, exclusões e atualizações).
- Fluxo de autenticação claro e intuitivo.
- Design voltado à usabilidade e acessibilidade, garantindo que o usuário tenha controle sobre todas as ações realizadas.

---

## Tecnologias

- **React**
- **React Router DOM**
- **Context API**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**

---

## Destaques do Projeto

- Estrutura modularizada em componentes reutilizáveis.
- Uso de props e hooks para gerenciamento de estado e eventos.
- Validação de formulários integrada aos inputs.
- Layout totalmente responsivo e adaptável.
- Interface simples e agradável, inspirada em redes sociais visuais.
- Context API
- Autenticação segura através do controle de acesso por token JWT armazenado em localStorage.
- Requisições assíncronas - todas as operações com a API são feitas com async/await e tratamento de erros.

---

## Repositório no GitHub

https://github.com/KyaniBrito/web_project_around_auth

## Instalação

1. Clone o repositório no terminal:

git clone <URL_DO_REPOSITÓRIO>
cd nome-do-projeto

2. Instale as dependências:

npm install

3. Execute o projeto:

npm start

O projeto será iniciado em http://localhost:3000

---

Desenvolvido por **Kyani Brito** durante o curso de Desenvolvimento Web na [TripleTen](https://tripleten.com/).
