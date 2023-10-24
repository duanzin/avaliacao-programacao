const fs = require("fs");

const arquivo = "numeros.txt";

function Media() {
  fs.readFile(arquivo, "utf8", (err, data) => {
    if (err) {
      console.error(`${err}`);
      return;
    }

    const numeros = data.trim().split("\n").map(Number);

    const soma = numeros.reduce((a, b) => a + b, 0);
    const media = soma / numeros.length;

    console.log(`A média dos números é ${media}`);
  });
}

Media();
