# 🚗 Prova Técnica - Desenvolvedor(a) Júnior Fullstack

Desafio técnico para vaga de **Desenvolvedor(a) Fullstack Júnior**, com foco em React no front-end e Node.js/Express no back-end, utilizando PostgreSQL como banco de dados relacional.

*Link do Protótipo*: https://www.figma.com/design/5w4nhnYaQGVNRbjaXZUT5X/Prot%C3%B3tipo-Desafio-T%C3%A9cnico-FullStack?node-id=0-1&t=CYM7XqC5V4HrfnBQ-1

![image](https://github.com/user-attachments/assets/4400622f-bbc8-48a0-b669-29d2b9588c4e)

---

## 📌 Objetivo

Desenvolver uma aplicação fullstack com as seguintes funcionalidades:

- Autenticação com **JWT**
- Dashboard com dados de veículos
- CRUD completo de veículos
- Front-end com **React**
- Back-end com **Express + Node.js**
- Banco de dados **PostgreSQL**

---

## 🖥️ Telas do Protótipo

### 1. Login

- Tela com campos de **email** e **senha**
- Autenticação utilizando **JWT**
- Após o login, redireciona para o **Dashboard**

### 2. Dashboard

- Exibe três cards com informações:
  - 🚗 Total de veículos cadastrados
  - ✅ Total de veículos ativos
  - 💤 Total de veículos inativos
- Menu de navegação com as opções:
  - Dashboard
  - Relatórios *(apenas visual, sem funcionalidade nesta prova)*

### 3. Modal de Cadastro de Veículo

- Modal para criação de novo veículo contendo os campos:
  - Nome do veículo
  - Placa

---

## ⚙️ Funcionalidades Esperadas (Back-end)

O candidato deve implementar as seguintes rotas utilizando **Express**:

- Cadastrar um novo veículo
- Listar todos os veículos
- Editar os dados de um veículo
- Arquivar um veículo (status: inativo)
- Desarquivar um veículo (status: ativo)
- Remover um veículo

Banco de dados recomendado: **PostgreSQL**.

---

## 🎨 Funcionalidades Esperadas (Front-end)

- Tela de Login com autenticação via JWT
- Tela de Dashboard com cards informativos
- Tabela listando os veículos cadastrados com as seguintes colunas:
  - Nome do veículo
  - Placa
  - Status
  - Ações: **Editar**, **Arquivar/Desarquivar**, **Excluir**
- Modal de cadastro de veículo

---

## 💡 Diferenciais (não obrigatórios)

- Utilização de **TypeScript**
- Utilização de **Next.js**
- Validação de formulários com bibliotecas como `react-hook-form`
- Utilização de validação utilziando o `zod`
- Boas práticas de responsividade

---

## 🛠️ Tecnologias Recomendadas

### Front-end
- React
- Axios ou Fetch API
- Styled Components, Tailwind ou CSS Modules

### Back-end
- Node.js
- Express
- PostgreSQL (com `pg` ou ORM como Sequelize/Prisma/TypeORM)

---

## ✅ Critérios de Avaliação

- Organização do código
- Clareza e estrutura do projeto
- Boas práticas de desenvolvimento
- Funcionamento das rotas e componentes
- Estilo visual básico e funcional

---

## 🚀 Como rodar o projeto localmente
