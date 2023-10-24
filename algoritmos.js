const http = require("http");

function sort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return sort(left).concat(pivot, sort(right));
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const numbers = [];
for (let i = 0; i < 10; i++) {
  numbers.push(Math.floor(Math.random() * 100));
}
const list = sort(numbers);

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Lista de Numeros Ordenados</h1>");
    res.write("<ul>");
    for (const number of list) {
      res.write(`<li>${number}</li>`);
    }
    res.write("</ul>");
    res.end();
  } else if (req.url === "/search") {
    const target = 42;
    const result = binarySearch(list, target);
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (result !== -1) {
      res.write(`O elemento ${target} foi encontrado no index ${result}`);
    } else {
      res.write(`O elemento ${target} nao existe na lista`);
    }
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página não encontrada");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
