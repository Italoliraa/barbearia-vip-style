/*
  CONFIGURAÇÕES DA BARBEARIA VIP STYLE
  Tudo aqui é EXEMPLO (placeholder). Troque pelos dados reais do cliente, salve e o Live Server atualiza.
*/
window.SITE = {
  name: 'Barbearia Vip Style',
  // WhatsApp: código do país + DDD + número, só dígitos. Ex.: 5581999999999
  whatsapp: '5500000000000',
  phone: '(00) 00000-0000 (exemplo)',
  instagramUser: 'vipstylebarbearia (exemplo)',
  instagramUrl: 'https://www.instagram.com/',
  address: 'Rua Exemplo, 123, Bairro, Cidade/UF (endereço fictício)',
  // Valor do src do iframe do Google Maps (Compartilhar > Incorporar um mapa). Vazio = espaço reservado.
  mapEmbedUrl: '',
  // Barbeiros que aparecem no agendamento (nomes de exemplo)
  barbers: ['Rafa', 'Diego', 'Léo'],
  // Horário de funcionamento. 0 = domingo ... 6 = sábado. null = fechado. Formato [abre, fecha] em 24h.
  hours: {
    0: null,
    1: ['09:00', '19:00'],
    2: ['09:00', '20:00'],
    3: ['09:00', '20:00'],
    4: ['09:00', '20:00'],
    5: ['09:00', '20:00'],
    6: ['08:00', '18:00']
  },
  slotMinutes: 30 // intervalo entre os horários sugeridos
};
