
export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  tempo: string; // Changed from number to string to match expected type
  imagem: string;
}

export const servicos: Servico[] = [
  {
    id: "1",
    nome: "Corte de Cabelo",
    descricao: "Corte masculino com tesoura ou máquina",
    preco: 35,
    tempo: "30 min", // Changed from number to string with unit
    imagem: "/servicos/corte-cabelo.jpg",
  },
  {
    id: "2",
    nome: "Barba",
    descricao: "Modelagem e acabamento da barba",
    preco: 25,
    tempo: "20 min", // Changed from number to string with unit
    imagem: "/servicos/barba.jpg",
  },
  {
    id: "3",
    nome: "Corte + Barba",
    descricao: "Combo de corte de cabelo e barba",
    preco: 55,
    tempo: "50 min", // Changed from number to string with unit
    imagem: "/servicos/combo.jpg",
  },
  {
    id: "4",
    nome: "Degradê",
    descricao: "Corte degradê com máquina e tesoura",
    preco: 40,
    tempo: "40 min", // Changed from number to string with unit
    imagem: "/servicos/degrade.jpg",
  },
  {
    id: "5",
    nome: "Tingimento",
    descricao: "Coloração e tingimento de cabelo",
    preco: 60,
    tempo: "60 min", // Changed from number to string with unit
    imagem: "/servicos/tingimento.jpg",
  },
  {
    id: "6",
    nome: "Hidratação",
    descricao: "Tratamento e hidratação capilar",
    preco: 45,
    tempo: "45 min", // Changed from number to string with unit
    imagem: "/servicos/hidratacao.jpg",
  },
];
