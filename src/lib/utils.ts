
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function generateFakePixCode(valor: number): string {
  // Na implementação real, isso seria substituído pela integração com Mercado Pago
  return `00020126330014BR.GOV.BCB.PIX0111123456789012520400005303986540${valor.toFixed(2).replace('.', '')}5802BR5913Barber Shop6008Sao Paulo62150511${Math.floor(Math.random() * 10000000000)}6304${Math.floor(Math.random() * 10000)}`;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}

export function timeSlots(): string[] {
  const slots = [];
  for (let hour = 9; hour < 20; hour++) {
    slots.push(`${hour}:00`);
    if (hour < 19) slots.push(`${hour}:30`);
  }
  return slots;
}
