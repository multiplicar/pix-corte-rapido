
import { Servico } from '@/contexts/AppContext';

export const servicos: Servico[] = [
  {
    id: 1,
    nome: 'Corte Clássico',
    descricao: 'Corte tradicional com tesoura ou máquina, finalizado com produtos de qualidade.',
    preco: 45.00,
    duracao: 30,
    imagem: 'https://images.unsplash.com/photo-1635273051837-a0f3d89aa3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: 2,
    nome: 'Barba Completa',
    descricao: 'Modelagem e aparação da barba com toalha quente, óleos e finalização especial.',
    preco: 35.00,
    duracao: 30,
    imagem: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    nome: 'Combo Corte + Barba',
    descricao: 'O pacote completo: corte de cabelo e tratamento de barba com condições especiais.',
    preco: 70.00,
    duracao: 60,
    imagem: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 4,
    nome: 'Degradê',
    descricao: 'Corte moderno com transição de comprimento, perfeito para um visual contemporâneo.',
    preco: 50.00,
    duracao: 45,
    imagem: 'https://images.unsplash.com/photo-1565772838887-4b924193b328?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 5,
    nome: 'Cabelo + Barba + Sombrancelha',
    descricao: 'Pacote completo incluindo alinhamento de sobrancelha para um visual impecável.',
    preco: 85.00,
    duracao: 75,
    imagem: 'https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80'
  },
  {
    id: 6,
    nome: 'Coloração',
    descricao: 'Serviço de pintura com produtos de alta qualidade e acabamento profissional.',
    preco: 60.00,
    duracao: 60,
    imagem: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
  },
];
