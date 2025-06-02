import { NextResponse } from "next/server";
import { adicionarNome, obterNomes } from "@/lib/recompensados";
import connectDB from "@/lib/mongodb";
import Recompensado from "@/models/Recompensado";

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome) {
      return NextResponse.json(
        { success: false, error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const result = await adicionarNome(nome);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await obterNomes();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome) {
      return NextResponse.json(
        { success: false, error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    await connectDB();
    const recompensado = await Recompensado.findOne();

    if (recompensado) {
      recompensado.nomes = recompensado.nomes.filter((n) => n !== nome);
      await recompensado.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { nomeAntigo, nomeNovo } = await request.json();

    if (!nomeAntigo || !nomeNovo) {
      return NextResponse.json(
        { success: false, error: "Nome antigo e novo são obrigatórios" },
        { status: 400 }
      );
    }

    await connectDB();
    const recompensado = await Recompensado.findOne();

    if (recompensado) {
      const index = recompensado.nomes.indexOf(nomeAntigo);
      if (index !== -1) {
        recompensado.nomes[index] = nomeNovo;
        await recompensado.save();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
