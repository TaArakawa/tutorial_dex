/*
  script.js
  このファイルは、ポケモン図鑑アプリの「データ」を管理し、
  そのデータをもとに「画面を動的に作る」JavaScriptファイルです。
*/

// --- 1. ポケモンデータの準備 (オブジェクトの配列) ---
// db/seeds のデータ（サンムーン時点）を参照して、詳細情報（高さ、重さ、種族値）を追加しました。
const pokemonList = [
  {
    id: 1,
    no: "#001",
    name: "フシギダネ",
    types: ["くさ", "どく"],
    description: "たねポケモン",
    height: 0.7, // 高さ(m)
    weight: 6.9, // 重さ(kg)
    stats: {
      hp: 45,
      attack: 49,
      block: 49,
      concentration: 65, // とくこう
      defence: 65,       // とくぼう
      speed: 45          // すばやさ
    }
  },
  {
    id: 4,
    no: "#004",
    name: "ヒトカゲ",
    types: ["ほのお"],
    description: "とかげポケモン",
    height: 0.6,
    weight: 8.5,
    stats: {
      hp: 39,
      attack: 52,
      block: 43,
      concentration: 60,
      defence: 50,
      speed: 65
    }
  },
  {
    id: 25,
    no: "#025",
    name: "ピカチュウ",
    types: ["でんき"],
    description: "ねずみポケモン",
    height: 0.4,
    weight: 6.0,
    stats: {
      hp: 35,
      attack: 55,
      block: 40,
      concentration: 50,
      defence: 50,
      speed: 90
    }
  }
];

// --- 2. HTMLの「入れ物（コンテナ）」を取得 ---
const container = document.getElementById("pokemon-container");

// --- 3. タイプバッジのHTMLを作る補助用の関数 ---
// タイプの配列（例: ["くさ", "どく"]）を受け取り、バッジのHTMLを作って返します。
function createTypeBadges(types) {
  let badgeHtml = "";
  types.forEach((type) => {
    // styles.css に定義した「type-くさ」や「type-どく」というクラス名を動的に当てはめます。
    badgeHtml += `<span class="pokemon-type type-${type}">${type}</span> `;
  });
  return badgeHtml;
}

// --- 4. 図鑑の一覧画面を表示する関数 ---
function showListView() {
  let htmlContent = "";

  pokemonList.forEach((pokemon) => {
    // カード全体に onclick 属性をつけて、クリックされたら詳細画面 showDetailView を呼ぶようにします。
    htmlContent += `
      <div class="pokemon-card" onclick="showDetailView(${pokemon.id})">
        <div class="pokemon-no">${pokemon.no}</div>
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <div class="pokemon-types">${createTypeBadges(pokemon.types)}</div>
        <p class="pokemon-description">${pokemon.description}</p>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}

// --- 5. ポケモンの詳細画面を表示する関数 ---
function showDetailView(pokemonId) {
  // クリックされたIDと一致するポケモンのデータを探します。
  const pokemon = pokemonList.find((p) => p.id === pokemonId);

  // 種族値のパーセンテージ幅を計算します（最大値を150として割合を計算、グラフがはみ出さないようにするため）
  const maxStatLimit = 150;
  const hpPercent = (pokemon.stats.hp / maxStatLimit) * 100;
  const attackPercent = (pokemon.stats.attack / maxStatLimit) * 100;
  const blockPercent = (pokemon.stats.block / maxStatLimit) * 100;
  const concentrationPercent = (pokemon.stats.concentration / maxStatLimit) * 100;
  const defencePercent = (pokemon.stats.defence / maxStatLimit) * 100;
  const speedPercent = (pokemon.stats.speed / maxStatLimit) * 100;

  // 詳細表示用のHTMLを組み立てます。
  const htmlContent = `
    <div class="detail-container">
      <!-- 一覧に戻るボタン。クリックしたら一覧画面を表示する関数 showListView() を実行します -->
      <button class="back-button" onclick="showListView()">← 図鑑一覧に戻る</button>
      
      <div class="detail-card">
        <div class="pokemon-no">${pokemon.no}</div>
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <div class="pokemon-types">${createTypeBadges(pokemon.types)}</div>
        <p class="pokemon-description" style="margin-bottom: 20px;">${pokemon.description}</p>
        
        <!-- 高さ・重さ -->
        <div class="detail-info">
          <p><strong>たかさ:</strong> ${pokemon.height} m</p>
          <p><strong>おもさ:</strong> ${pokemon.weight} kg</p>
        </div>
        
        <!-- 能力値（種族値）のグラフ -->
        <div class="stats-container">
          <h3>能力値（種族値）</h3>
          
          <div class="stat-row">
            <span class="stat-label">HP</span>
            <span class="stat-value">${pokemon.stats.hp}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${hpPercent}%"></div>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">こうげき</span>
            <span class="stat-value">${pokemon.stats.attack}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${attackPercent}%"></div>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">ぼうぎょ</span>
            <span class="stat-value">${pokemon.stats.block}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${blockPercent}%"></div>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">とくこう</span>
            <span class="stat-value">${pokemon.stats.concentration}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${concentrationPercent}%"></div>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">とくぼう</span>
            <span class="stat-value">${pokemon.stats.defence}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${defencePercent}%"></div>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">すばやさ</span>
            <span class="stat-value">${pokemon.stats.speed}</span>
            <div class="stat-bar-container">
              <div class="stat-bar" style="width: ${speedPercent}%"></div>
            </div>
          </div>
        </div>
        
        <!-- 注釈の追加 -->
        <p class="data-note">※ サンムーン時のデータ</p>
      </div>
    </div>
  `;

  container.innerHTML = htmlContent;
}

// --- 6. アプリ起動時に最初に一覧を表示する ---
showListView();
