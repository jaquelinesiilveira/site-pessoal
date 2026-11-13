/**
 * ==========================================================================
 * ATELIÊ MARFIM — CATÁLOGO DA GALERIA DE TRABALHOS
 * ==========================================================================
 * 
 * COMO EDITAR OU TROCAR FOTOS:
 * 1. Coloque seus arquivos de imagem na pasta "assets/img/"
 * 2. Atualize ou adicione itens na lista abaixo:
 *    - src: caminho relativo da foto (ex.: "assets/img/minha-foto.jpg")
 *    - alt: descrição da imagem para acessibilidade e leitores de tela
 *    - legenda: texto curto exibido abaixo da imagem e no lightbox
 *    - categoria: deve corresponder a um dos filtros:
 *      ["Minimalistas", "Nail art", "Francesinhas", "Alongamento", "Noivas"]
 *    - width / height: dimensões da imagem (evita pulos de layout ao carregar)
 * ==========================================================================
 */

const GALERIA_TRABALHOS = [
  {
    id: 1,
    src: "assets/img/trabalho-01.jpg",
    alt: "Esmaltação em gel nude com delicado filete dourado vertical sobre pedra travertino",
    legenda: "Gel nude com filete dourado",
    categoria: "Minimalistas",
    width: 896,
    height: 1200
  },
  {
    id: 2,
    src: "assets/img/trabalho-02.jpg",
    alt: "Francesinha invertida com traço terracota sobre papel artesanal marfim",
    legenda: "Francesinha invertida em tom terracota",
    categoria: "Francesinhas",
    width: 1024,
    height: 1024
  },
  {
    id: 3,
    src: "assets/img/trabalho-03.jpg",
    alt: "Alongamento em formato amêndoa com acabamento fosco aveludado contra parede de gesso claro",
    legenda: "Alongamento em amêndoa, acabamento fosco",
    categoria: "Alongamento",
    width: 896,
    height: 1200
  },
  {
    id: 4,
    src: "assets/img/trabalho-04.jpg",
    alt: "Composição de nail art geométrica com paleta terrosa e nude",
    legenda: "Nail art geométrica em tons terrosos",
    categoria: "Nail art",
    width: 800,
    height: 950
  },
  {
    id: 5,
    src: "assets/img/trabalho-05.jpg",
    alt: "Esmaltação em gel oliva suave com brilho espelhado sobre linho rústico",
    legenda: "Esmaltação em gel oliva suave",
    categoria: "Minimalistas",
    width: 896,
    height: 1200
  },
  {
    id: 6,
    src: "assets/img/trabalho-06.jpg",
    alt: "Unhas em gel leitoso com acabamento perolado sutil para noivas",
    legenda: "Gel leitoso com acabamento perolado",
    categoria: "Noivas",
    width: 800,
    height: 800
  },
  {
    id: 7,
    src: "assets/img/trabalho-07.jpg",
    alt: "Francesinha ultrafina com ponta branca sobre leito leitoso translúcido",
    legenda: "Francesinha ultrafina sobre base translúcida",
    categoria: "Francesinhas",
    width: 800,
    height: 1000
  },
  {
    id: 8,
    src: "assets/img/trabalho-08.jpg",
    alt: "Alongamento em formato bailarina estruturado com degradê suave baby boomer",
    legenda: "Alongamento bailarina com degradê suave",
    categoria: "Alongamento",
    width: 800,
    height: 1150
  },
  {
    id: 9,
    src: "assets/img/trabalho-09.jpg",
    alt: "Alongamento quadrado suave em tom café com leite brilhante em pele negra",
    legenda: "Alongamento quadrado em tom café com leite",
    categoria: "Alongamento",
    width: 1024,
    height: 1024
  },
  {
    id: 10,
    src: "assets/img/trabalho-10.jpg",
    alt: "Pintura manual com linhas orgânicas e fluidas em contraste suave",
    legenda: "Linhas orgânicas minimalistas em tom terracota",
    categoria: "Minimalistas",
    width: 800,
    height: 1000
  },
  {
    id: 11,
    src: "assets/img/trabalho-11.jpg",
    alt: "Francesinha perolada romântica para cerimônia com acabamento de alta precisão",
    legenda: "Francesinha clássica com ponta perolada",
    categoria: "Noivas",
    width: 800,
    height: 1050
  },
  {
    id: 12,
    src: "assets/img/trabalho-12.jpg",
    alt: "Esmaltação marfim artesanal com ponto gráfico em oliva dessaturado",
    legenda: "Esmaltação marfim com detalhe em oliva suave",
    categoria: "Nail art",
    width: 800,
    height: 900
  }
];

// Exporta globalmente para uso direto sem empacotadores (bundlers)
window.GALERIA_TRABALHOS = GALERIA_TRABALHOS;
