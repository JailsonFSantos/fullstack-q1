import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logosistemas1.png';
import loginImagem from '../assets/login.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[1080px] h-[650px] flex rounded-2xl overflow-hidden shadow-lg bg-white">
        
        {/* Lado esquerdo - formulário */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
          <img src={logo} alt="Logo" className="h-12 mb-4" />
          <h2 className="text-gray-700 mb-1">Bem-vindo de volta!</h2>
          <p className="text-gray-500 text-sm mb-6">Insira seus dados.</p>

          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-6">
            Não tem uma conta?{' '}
            <a href="/#" className="text-blue-600 hover:underline">
              Cadastre-se gratuitamente!
            </a>
          </p>
        </div>

        {/* Lado direito */}
        <div className="w-1/2">
            <img src={loginImagem} alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
