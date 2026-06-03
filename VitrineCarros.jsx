import React, { useState } from 'react';
import { carrosMock } from './dadosCarros';

export default function VitrineCarros() {
  // Estados para os filtros
  const [busca, setBusca] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [cambioSelecionado, setCambioSelecionado] = useState('');

  // Lógica de Filtragem Dinâmica
  const carrosFiltrados = carrosMock.filter((carro) => {
    const correspondeBusca = carro.titulo.toLowerCase().includes(busca.toLowerCase());
    const correspondeMarca = marcaSelecionada === '' || carro.marca === marcaSelecionada;
    const correspondeCambio = cambioSelecionado === '' || carro.cambio === cambioSelecionado;

    return correspondeBusca && correspondeMarca && correspondeCambio;
  });

  // Função para formatar moeda (Real R$)
  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-orange-500 tracking-wider uppercase">⚡ AutoDrive Multimarcas</h1>
          <p className="text-gray-400 mt-2">Encontre o carro dos seus sonhos com as melhores condições.</p>
        </header>

        {/* BARRA DE FILTROS AVANÇADA */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">O que você está procurando?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Input de Texto */}
            <input
              type="text"
              placeholder="Digite o modelo (ex: Civic)..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            {/* Select de Marcas */}
            <select
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
              value={marcaSelecionada}
              onChange={(e) => setMarcaSelecionada(e.target.value)}
            >
              <option value="">Todas as Marcas</option>
              <option value="Honda">Honda</option>
              <option value="Jeep">Jeep</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Volkswagen">Volkswagen</option>
            </select>

            {/* Select de Câmbio */}
            <select
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
              value={cambioSelecionado}
              onChange={(e) => setCambioSelecionado(e.target.value)}
            >
              <option value="">Todos os Câmbios</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
            </select>

            {/* Botão de Limpar Filtros */}
            <button 
              onClick={() => { setBusca(''); setMarcaSelecionada(''); setCambioSelecionado(''); }}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Limpar Filtros
            </button>
          </div>
        </section>

        {/* VITRINE DE CARROS */}
        <main>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold border-l-4 border-orange-500 pl-2">Estoque Disponível</h2>
            <p className="text-gray-400 text-sm">{carrosFiltrados.length} veículos encontrados</p>
          </div>

          {carrosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-800 rounded-xl border border-dashed border-gray-700">
              Nenhum veículo encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {carrosFiltrados.map((carro) => (
                <div key={carro.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-700 hover:border-gray-500 transition duration-300 flex flex-col justify-between group">
                  
                  {/* Container da Imagem */}
                  <div className="relative overflow-hidden h-48 bg-gray-900">
                    <img 
                      src={carro.foto} 
                      alt={carro.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Tags (ex: Novidade) */}
                    {carro.tags.map((tag, idx) => (
                      <span key={idx} className={`absolute top-3 left-3 text-xs font-bold uppercase px-2 py-1 rounded text-white ${tag === 'Vendido' ? 'bg-red-600' : 'bg-green-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Informações do Carro */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-100 line-clamp-1">{carro.titulo}</h3>
                      <p className="text-gray-400 text-sm mt-1">{carro.ano} • {carro.km.toLocaleString()} km</p>
                      
                      <div className="inline-block bg-gray-900 text-xs px-2 py-1 rounded text-gray-300 mt-2 font-medium">
                        ⚙️ {carro.cambio}
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="text-2xl font-black text-orange-500 mb-4">
                        {formatarPreco(carro.preco)}
                      </div>
                      
                      {/* Botão de Ver Detalhes / Chamar no Whats */}
                      <a
                        href={`https://wa.me/5547999999999?text=Olá! Tenho interesse no ${encodeURIComponent(carro.titulo)} anunciado no site.`}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full block text-center font-bold py-2.5 rounded-lg transition duration-200 ${carro.tags.includes('Vendido') ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'}`}
                      >
                        {carro.tags.includes('Vendido') ? 'Indisponível' : 'Ver Detalhes / WhatsApp'}
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}