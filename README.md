# EPTA TECNOLOGIA

## 📌 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados no seu sistema:

1. **Node.js** (versão 18.x ou superior) 
2. **npm** (vem com o Node.js) - Verifique com `npm -v`
3. **PostgreSQL** (versão 14.x ou superior) 
4. **Git** 

---

## 🏗 Estrutura do Projeto

- `backend`: Backend desenvolvido com Node.js, Express.
- `frontend`: Frontend desenvolvido com React.

---

## 🛠 Configuração do Banco de Dados

Antes de rodar o projeto, configure o PostgreSQL com as seguintes credenciais:

- **Usuário:** `postgres`
- **Senha:** `admin`
- **Banco de dados:** `veiculosdb`
- **Porta:** `5432` (padrão)

Se necessário, crie o banco de dados manualmente via terminal:

```sql
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    placa TEXT NOT NULL,
    status TEXT DEFAULT 'ativo'
);

Depois, configure um arquivo .env
PORT=5000
JWT_SECRET=meusegredojwt
DATABASE_URL=postgres://postgres:123456@localhost:5432/veiculosdb


🚀 Passo a passo para rodar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/JailsonFSantos/fullstack-q1.git
cd fullstack-q1

2️⃣ Configurar e rodar o backend
cd backend
npm install
npm start

3️⃣ Configurar e rodar o frontend
Abra outro terminal e execute:
cd frontend
npm install
npm start

Senha para acessar o sistema:
// Usuário fixo para exemplo
email: 'admin@admin.com', senha:'123456'.
