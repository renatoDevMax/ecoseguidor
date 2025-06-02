import connectDB from "./mongodb";
import Recompensado from "../models/Recompensado";

export async function adicionarNome(nome: string) {
  try {
    await connectDB();

    // Busca o documento único ou cria um novo se não existir
    let recompensado = await Recompensado.findOne();

    if (!recompensado) {
      recompensado = new Recompensado();
    }

    // Adiciona o nome à lista se ainda não existir
    if (!recompensado.nomes.includes(nome)) {
      recompensado.nomes.push(nome);
      await recompensado.save();
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar nome:", error);
    return { success: false, error };
  }
}

export async function obterNomes() {
  try {
    await connectDB();

    const recompensado = await Recompensado.findOne();
    return { success: true, nomes: recompensado?.nomes || [] };
  } catch (error) {
    console.error("Erro ao obter nomes:", error);
    return { success: false, error };
  }
}

export async function verificarNome(nome: string) {
  try {
    await connectDB();

    const recompensado = await Recompensado.findOne();
    return {
      success: true,
      existe: recompensado?.nomes.includes(nome) || false,
    };
  } catch (error) {
    console.error("Erro ao verificar nome:", error);
    return { success: false, error };
  }
}
