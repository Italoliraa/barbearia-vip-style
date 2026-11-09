/* Preços, cortes e textos. Valores são EXEMPLOS: ajuste para a tabela real da barbearia. */
window.DATA = {
  menu: [
    { cat: 'Cortes', items: [
      { id: 'corte', name: 'Corte na tesoura ou máquina', desc: 'Com acabamento na navalha', price: 45 },
      { id: 'degrade', name: 'Degradê', desc: 'Do baixo ao alto, no seu estilo', price: 50 },
      { id: 'infantil', name: 'Corte infantil', desc: 'Até 10 anos', price: 40 }
    ]},
    { cat: 'Barba', items: [
      { id: 'barba', name: 'Barba completa', desc: 'Toalha quente e navalha', price: 40 },
      { id: 'barba-desenhada', name: 'Barba desenhada', desc: 'Contorno marcado e alinhado', price: 45 },
      { id: 'pezinho', name: 'Pezinho e acabamento', desc: 'Para manter o corte em dia', price: 20 }
    ]},
    { cat: 'Combos', items: [
      { id: 'combo', name: 'Corte + barba', desc: 'O pacote mais pedido', price: 80 },
      { id: 'combo-vip', name: 'Combo VIP', desc: 'Corte, barba, sobrancelha e hidratação', price: 110 }
    ]},
    { cat: 'Extras', items: [
      { id: 'sobrancelha', name: 'Sobrancelha', desc: 'Na navalha', price: 15 },
      { id: 'hidratacao', name: 'Hidratação capilar', desc: 'Brilho e maciez', price: 30 },
      { id: 'pigmentacao', name: 'Pigmentação', desc: 'Cobre falhas na barba ou no cabelo', price: 45 }
    ]}
  ],
  /* Galeria: sem foto, mostra a ilustração. Para usar foto real, preencha img: 'img/nome.jpg' (crie a pasta img). */
  cuts: [
    { name: 'Degradê baixo', tag: 'Laterais curtas e topo texturizado', skin: '#D9A77F', bg: '#DCE3EE', hair: 'fade' },
    { name: 'Pompadour', tag: 'Volume no topo, laterais limpas', skin: '#E6BC98', bg: '#F3D5D1', hair: 'pompa', beard: true },
    { name: 'Corte social', tag: 'Risca lateral e acabamento na navalha', skin: '#B9825F', bg: '#E8DFC8', hair: 'social', beard: true },
    { name: 'Militar', tag: 'Baixo, prático e sempre alinhado', skin: '#8A5A3F', bg: '#CBD6E8', hair: 'buzz' },
    { name: 'Moicano', tag: 'Faixa central e laterais degradê', skin: '#DDB08A', bg: '#E4E8EF', hair: 'mohawk', beard: true },
    { name: 'Cacheado', tag: 'Volume natural, cortado com técnica', skin: '#7A4E36', bg: '#F0DCC0', hair: 'curly' }
  ],
  perks: [
    { title: 'Hora marcada', text: 'Você escolhe o dia e o horário e confirma tudo pelo WhatsApp.' },
    { title: 'Corte e barba juntos', text: 'Combos no mesmo horário para você resolver tudo de uma vez.' },
    { title: 'Ambiente descontraído', text: 'Um lugar para relaxar enquanto o visual é cuidado.' }
  ]
};
