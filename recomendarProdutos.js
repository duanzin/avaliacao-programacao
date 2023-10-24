const produtos = [
  { id: 1, nome: "Produto 1" },
  { id: 2, nome: "Produto 2" },
  { id: 3, nome: "Produto 3" },
  { id: 4, nome: "Produto 4" },
  { id: 5, nome: "Produto 5" },
];

const historicoCompras = [
  [1, 2, 3],
  [2, 4, 5],
  [1, 3, 4],
];

const usuario = 1;

function recomendarProdutos(usuario) {
  const comprasDoUsuario = historicoCompras[usuario - 1];

  const contagemProdutos = comprasDoUsuario.reduce((acc, compra) => {
    if (!acc[compra]) {
      acc[compra] = 1;
    } else {
      acc[compra]++;
    }
    return acc;
  }, {});

  const produtosRecomendados = Object.entries(contagemProdutos)
    .sort((a, b) => b[1] - a[1])
    .map(([produtoId]) => Number(produtoId));

  return produtosRecomendados;
}

const produtosRecomendados = recomendarProdutos(usuario);

console.log(`Produtos recomendados para o usuario ${usuario}:`);
const mapaProdutos = {};
for (const produto of produtos) {
  mapaProdutos[produto.id] = produto;
}

for (const produtoId of produtosRecomendados) {
  const produto = mapaProdutos[produtoId];
  console.log(produto.nome);
}
