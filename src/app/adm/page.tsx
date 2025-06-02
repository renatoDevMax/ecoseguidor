"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminPage() {
  const [nomes, setNomes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editandoNome, setEditandoNome] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState("");

  useEffect(() => {
    fetchNomes();
  }, []);

  const fetchNomes = async () => {
    try {
      const response = await fetch("/api/recompensados");
      const data = await response.json();

      if (data.success) {
        setNomes(data.nomes);
      } else {
        setError("Erro ao carregar os nomes");
      }
    } catch (error) {
      setError("Erro ao carregar os nomes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"?`)) return;

    try {
      const response = await fetch("/api/recompensados", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();
      if (data.success) {
        fetchNomes();
      } else {
        alert("Erro ao excluir nome");
      }
    } catch (error) {
      alert("Erro ao excluir nome");
    }
  };

  const handleEdit = (nome: string) => {
    setEditandoNome(nome);
    setNovoNome(nome);
  };

  const handleSaveEdit = async () => {
    if (!editandoNome || !novoNome.trim()) return;

    try {
      const response = await fetch("/api/recompensados", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAntigo: editandoNome,
          nomeNovo: novoNome.trim(),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEditandoNome(null);
        fetchNomes();
      } else {
        alert("Erro ao editar nome");
      }
    } catch (error) {
      alert("Erro ao editar nome");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-h-full min-w-full object-cover"
        >
          <source src="/videoFundo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#183263]/80 via-[#7EC13D]/60 to-[#EDF3F9]/70 backdrop-blur-[1px]" />

      {/* Conteúdo */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-[90%] max-w-md border border-white/20">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-[#183263]">Eco</span>
            <span className="text-[#7EC13D]">Clean</span>
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-[#183263] text-center">
                Lista de Recompensados
              </h2>
              <span className="px-3 py-1 bg-[#7EC13D] text-white rounded-full text-sm font-medium">
                {nomes.length}
              </span>
            </div>

            {isLoading ? (
              <p className="text-center text-[#183263]">Carregando...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : nomes.length === 0 ? (
              <p className="text-center text-[#183263]">
                Nenhum nome cadastrado ainda.
              </p>
            ) : (
              <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-2">
                  {nomes.map((nome, index) => (
                    <li
                      key={index}
                      className="p-3 bg-[#EDF3F9] rounded-lg text-[#183263] font-medium flex items-center justify-between gap-2"
                    >
                      {editandoNome === nome ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                            className="flex-1 px-2 py-1 rounded border border-[#183263]/20 focus:border-[#7EC13D] focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-[#7EC13D] text-white rounded hover:bg-[#7EC13D]/90 transition-colors"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditandoNome(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1">{nome}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(nome)}
                              className="p-2 text-[#183263] hover:text-[#7EC13D] transition-colors"
                              title="Editar"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(nome)}
                              className="p-2 text-[#183263] hover:text-red-500 transition-colors"
                              title="Excluir"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
