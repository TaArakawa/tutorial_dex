/*
  script.js
  このファイルは、ポケモン図鑑アプリの「データ」を管理し、
  そのデータをもとに「画面を動的に作る」JavaScriptファイルです。
*/

// --- 1. ポケモンデータの準備 (オブジェクトの配列) ---
// 受講生が「ポケモンを増やしたい！」と思ったときは、この配列の中に新しいオブジェクトを追加するだけで画面に反映されます。
const pokemonList = [
  {
    no: "#001",
    name: "フシギダネ",
    type: "くさ / どく",
    description: "たねポケモン"
  },
  {
    no: "#004",
    name: "ヒトカゲ",
    type: "ほのお",
    description: "とかげポケモン"
  },
  {
    no: "#025",
    name: "ピカチュウ",
    type: "でんき",
    description: "ねずみポケモン"
  }
];

// --- 2. HTMLの「入れ物（コンテナ）」を取得 ---
// index.html で定義した <div id="pokemon-container"> を取得しています。
const container = document.getElementById("pokemon-container");

// --- 3. 画面に表示するHTMLを組み立てる変数 ---
// ループ処理の中で作成したHTMLコードをここにどんどんためていきます。
let htmlContent = "";

// --- 4. ポケモンのデータを1匹ずつ処理するループ (forEach) ---
// pokemonList の中身を先頭から順に取り出して、1匹ずつのカードを作成します。
pokemonList.forEach((pokemon) => {
  // バッククォート（`）で囲むことで、複数行のHTMLコードをそのまま文字列として書くことができます（テンプレートリテラル）。
  // ${pokemon.name} のように書くことで、オブジェクトのデータをHTMLの中に埋め込むことができます。
  htmlContent += `
    <div class="pokemon-card">
      <div class="pokemon-no">${pokemon.no}</div>
      <h2 class="pokemon-name">${pokemon.name}</h2>
      <div class="pokemon-type">${pokemon.type}</div>
      <p class="pokemon-description">${pokemon.description}</p>
    </div>
  `;
});

// --- 5. 作成したHTMLをコンテナの中に挿入する ---
// 組み立てた htmlContent を、コンテナ要素の innerHTML に代入することで、ブラウザ画面に反映させます。
container.innerHTML = htmlContent;
