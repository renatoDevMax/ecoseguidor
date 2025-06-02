"use client";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/recompensados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setShowThankYou(true);
      } else {
        alert(
          "Ocorreu um erro ao salvar seu nome. Por favor, tente novamente."
        );
      }
    } catch (error) {
      alert("Ocorreu um erro ao salvar seu nome. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowClick = () => {
    setIsFollowing(true);
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

          {!showThankYou ? (
            <div className="space-y-6">
              <div className="instagram-container">
                <div className="flex items-center justify-center gap-3">
                  <FaInstagram className="instagram-icon text-[#183263] text-3xl" />
                  {!isFollowing ? (
                    <a
                      href="https://www.instagram.com/ecocleanmatinhos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleFollowClick}
                      className="text-[#183263] text-xl font-semibold hover:text-[#7EC13D] transition-colors duration-300"
                    >
                      Seguir a EcoClean
                    </a>
                  ) : (
                    <span className="text-[#7EC13D] text-xl font-semibold">
                      Obrigado por seguir!
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[#183263] text-lg text-center">
                Você já está seguindo a EcoClean no Instagram?
              </p>

              <div className="flex items-center justify-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => setIsFirstChecked(e.target.checked)}
                  />
                  <div
                    className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-6 after:w-6 after:transition-all peer-checked:bg-[#7EC13D]"
                  ></div>
                </label>
                <span className="text-[#183263] text-sm">
                  Sim, já estou seguindo
                </span>
              </div>

              <div
                className={`transition-all duration-300 ${
                  isFirstChecked
                    ? "opacity-100"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <div className="animate-fadeIn space-y-4 mt-6">
                  <p className="text-[#183263] text-lg text-center">
                    Informe seu Nome
                  </p>

                  <div className="w-full">
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#183263]/20 
                        focus:border-[#7EC13D] focus:outline-none transition-all duration-300
                        text-[#183263] placeholder-[#183263]/50"
                    />
                  </div>

                  <div className="animate-fadeIn mt-6">
                    <button
                      className={`botaoRecompensa ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Salvando..."
                        : "Receber Recompensa EcoClean"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn space-y-6">
              <p className="text-[#183263] text-xl text-center leading-relaxed">
                Obrigado pela sua preferência! <br />
                <span className="font-semibold">
                  Você foi presenteado!
                </span>{" "}
                <br />
                Escolha um produto do carrinho para levar para casa.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
