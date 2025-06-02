import mongoose, { Document } from "mongoose";

interface IRecompensado extends Document {
  nomes: string[];
}

const recompensadoSchema = new mongoose.Schema({
  nomes: {
    type: [String],
    default: [],
  },
});

// Verifica se o modelo já existe antes de criar um novo
const Recompensado =
  mongoose.models.Recompensado ||
  mongoose.model<IRecompensado>("Recompensado", recompensadoSchema);

export default Recompensado;
