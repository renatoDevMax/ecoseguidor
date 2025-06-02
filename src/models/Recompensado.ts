import mongoose from "mongoose";

const recompensadoSchema = new mongoose.Schema({
  nomes: {
    type: [String],
    default: [],
  },
});

// Verifica se o modelo já existe antes de criar um novo
const Recompensado =
  mongoose.models.Recompensado ||
  mongoose.model("Recompensado", recompensadoSchema);

export default Recompensado;
