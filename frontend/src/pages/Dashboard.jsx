import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logosistemas1.png';
import IconVeiculo from '../assets/car.svg';
import IconEditar from '../assets/Frame 428.png';
import IconArquivar from '../assets/Frame 429.png';
import IconExcluir from '../assets/Frame 430.png';
import plus from '../assets/circle-plus.png';
import UserIcon from '../assets/User.png';
import ChevronDownIcon from '../assets/chevronDown.png';
import categorize from '../assets/Categorize.png';

export default function Dashboard() {
  const [veiculos, setVeiculos] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nomeVeiculo, setNomeVeiculo] = useState('');
  const [placaVeiculo, setPlacaVeiculo] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [nomeEdit, setNomeEdit] = useState('');
  const [placaEdit, setPlacaEdit] = useState('');
  const navigate = useNavigate();

  function abrirModalEdicao(veiculo) {
    setVeiculoSelecionado(veiculo);
    setNomeEdit(veiculo.nome);
    setPlacaEdit(veiculo.placa);
    setEditModalOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    api.get('/veiculos')
      .then(res => setVeiculos(res.data))
      .catch(err => console.error('Erro ao buscar veículos:', err));
  }, []);

  const total = veiculos.length;
  const ativos = veiculos.filter(v => v.status === 'ativo').length;
  const inativos = veiculos.filter(v => v.status === 'inativo').length;

  function formatarPlaca(value) {
    const somenteLetrasNumeros = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const limitado = somenteLetrasNumeros.slice(0, 7);
    if (limitado.length > 3) {
      return limitado.slice(0, 3) + '-' + limitado.slice(3);
    }
    return limitado;
  }

  async function criarVeiculo(e) {
    e.preventDefault();
    try {
      await api.post('/veiculos', {
        nome: nomeVeiculo,
        placa: placaVeiculo,
        status: 'ativo'
      });
      const res = await api.get('/veiculos');
      setVeiculos(res.data);
      setModalOpen(false);
      setNomeVeiculo('');
      setPlacaVeiculo('');
    } catch (error) {
      alert('Erro ao criar veículo');
    }
  }

  async function salvarEdicaoVeiculo(e) {
    e.preventDefault();
        try {
            await api.put(`/veiculos/${veiculoSelecionado.id}`, {
            nome: nomeEdit,
            placa: placaEdit,
            });
            const res = await api.get('/veiculos');
            setVeiculos(res.data);
            setEditModalOpen(false);
            setVeiculoSelecionado(null);
        } catch (error) {
            alert('Erro ao atualizar veículo');
        }
  }

  async function arquivarVeiculo(id) {
    try {
        await api.patch(`/veiculos/${id}/arquivar`);
        const res = await api.get('/veiculos');
        setVeiculos(res.data);
    } catch (error) {
        alert('Erro ao arquivar veículo');
    }
  }

  async function desarquivarVeiculo(id) {
    try {
        await api.patch(`/veiculos/${id}/desarquivar`);
        const res = await api.get('/veiculos');
        setVeiculos(res.data);
    } catch (error) {
        alert('Erro ao desarquivar veículo');
    }
  }

  async function excluirVeiculo(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este veículo?");
    if (!confirmacao) return;

    try {
        await api.delete(`/veiculos/${id}`);
        const res = await api.get('/veiculos');
        setVeiculos(res.data);
    } catch (error) {
        alert('Erro ao excluir veículo');
    }
  }

  return (
    <div className="flex h-screen font-sans bg-custom-bg text-gray-800 relative">
      {/* Sidebar */}
      <nav className="w-64 bg-custom-bg text-gray-300 p-8 flex flex-col gap-8 border-r border-gray-500">
        <img 
          src={logo} 
          alt="EPTA Tecnologia" 
          className="w-36 mb-5"
        />
        <div>
          <h6 className="text-gray-500 font-semibold text-xs mb-2 uppercase">Navegação</h6>
          <ul className="space-y-2 text-sm">
            <li className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 font-semibold cursor-pointer text-blue-600 hover:bg-gray-700 hover:text-white transition">
              <img src={categorize} alt="Abrir menu" className="w-6 h-6"/>
              Dashboard
            </li>
            <li className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 font-semibold cursor-not-allowed text-gray-400 opacity-60">
              Relatórios
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Olá <strong className="text-gray-900 font-bold">Ewerton</strong>,
            </p>
            <p className="text-sm text-gray-400">Cadastre e gerencie seus veículos</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Abrir menu do usuário"
              className="flex items-center gap-1 text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <img src={UserIcon} alt="Usuário" className="w-8 h-8 text-gray-400" />
              <img src={ChevronDownIcon} alt="Abrir menu" className="w-5 h-5 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg text-gray-900 z-10 overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Cards */}
        <section className="flex gap-6 mb-8">
          <DashboardCard icon="📦" label="Total" value={total} />
          <DashboardCard icon="✅" label="Ativos" value={ativos} />
          <DashboardCard icon="🟠" label="Inativos" value={inativos} />
        </section>

        {/* Botão cadastrar veículo */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mb-8 shadow-md hover:bg-blue-700 transition"
        >
        <img src={plus} alt="Adicionar" className="w-8 h-8" />
          Cadastrar Veículo
        </button>

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 font-semibold text-left">
              <tr>
                <th className="px-6 py-3">Veículo</th>
                <th className="px-6 py-3">Placa</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map(v => (
                <tr key={v.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{v.nome}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{v.placa}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 font-semibold text-sm ${
                      v.status === 'ativo' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {v.status === 'ativo' ? '🟢' : '🟠'}
                      {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button title="Editar" className="text-gray-500 hover:text-gray-700 transition p-1 rounded" onClick={() => abrirModalEdicao(v)} >
                      <img src={IconEditar} alt="Editar" className="w-10 h-10" />                    
                    </button>
                    {/* Arquivar / Desarquivar */}
                    {v.status === 'ativo' ? (
                        <button
                        title="Arquivar"
                        onClick={() => arquivarVeiculo(v.id)}
                        className="relative"
                        >
                        <img src={IconArquivar} alt="Arquivar" className="w-10 h-10" />
                        </button>
                    ) : (
                        <button
                        title="Desarquivar"
                        onClick={() => desarquivarVeiculo(v.id)}
                        className="relative"
                        >
                        <img src={IconArquivar} alt="Desarquivar" className="w-10 h-10" />
                        </button>
                    )}
                    <button title="Excluir" className="text-red-500 hover:text-red-700 transition p-1 rounded" onClick={() => excluirVeiculo(v.id)}>
                      <img src={IconExcluir} alt="Excluir" className="w-10 h-10" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Cadastrar */}
      {modalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setModalOpen(false)}
          ></div>

          <div className="fixed top-1/2 left-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              onClick={() => setModalOpen(false)}
              aria-label="Fechar modal"
            >
              &#x2715;
            </button>

            <div className="flex items-center gap-2 mb-4">
                <img src={IconVeiculo} alt="Carro" className="w-6 h-6" />
              <h3 className="text-lg font-bold text-gray-900">Cadastrar Novo Veículo</h3>
            </div>

            <form onSubmit={criarVeiculo} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Nome do Veículo</label>
                <input 
                  type="text" 
                  placeholder="Digite o nome do veículo" 
                  value={nomeVeiculo}
                  onChange={e => setNomeVeiculo(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Placa do Veículo</label>
                <input 
                  type="text" 
                  placeholder="Digite a placa do veículo" 
                  value={placaVeiculo}
                  onChange={e => setPlacaVeiculo(formatarPlaca(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Criar Veículo
              </button>
            </form>
          </div>
        </>
      )}
    
     {/* Modal Editar */}
      {editModalOpen && (
        <>
            <div 
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setEditModalOpen(false)}
            ></div>

            <div className="fixed top-1/2 left-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
            <button 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                onClick={() => setEditModalOpen(false)}
                aria-label="Fechar modal"
            >
                &#x2715;
            </button>

            <div className="flex items-center gap-2 mb-4">
                <img src={IconVeiculo} alt="Carro" className="w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">Editar Veículo</h3>
            </div>

            <form onSubmit={salvarEdicaoVeiculo} className="flex flex-col gap-4">
                <div>
                <label className="block mb-1 font-semibold text-gray-700">Nome do Veículo</label>
                <input 
                    type="text"
                    value={nomeEdit}
                    onChange={(e) => setNomeEdit(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <div>
                <label className="block mb-1 font-semibold text-gray-700">Placa do Veículo</label>
                <input 
                    type="text"
                    value={placaEdit}
                    onChange={e => setPlacaEdit(formatarPlaca(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                Salvar
                </button>

                <button 
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                >
                Cancelar
                </button>
            </form>
            </div>
        </>
        )}
    </div>
  );
}

function DashboardCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-5 min-w-[140px] shadow-md flex items-center gap-4">
      <div className="bg-blue-100 rounded-full w-12 h-12 flex justify-center items-center text-2xl">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
