/* ============================================================================
 * NovelEngine  ―  描画システム再設計版
 * ----------------------------------------------------------------------------
 * このファイルの読み方（目次）
 *
 *   [1] LAYERS       … 描画レイヤーの定義（Background / Character / Effect /
 *                       Battle / Choose）。どのレイヤーに何を描くかはここを見る。
 *   [2] POSITIONS    … 立ち絵の水平位置プリセット
 *   [3] ANIMATIONS   … 既存の登場／退場／強調アニメーション名（CSSと対応）
 *   [4] EFFECTS      … Effect Layer に出せる演出の一覧（追加はここへ1行）
 *   [5] BATTLES      … Battle Layer に出せる演出の一覧（追加はここへ1行）
 *   [6] Parser       … シナリオに書いたコマンド文字列の解析器
 *   [7] NovelEngine  … 上記を組み合わせて実際に描画するエンジン本体
 *
 * 設計方針
 *   シナリオ     = 「物語と演出の指示書」
 *   NovelEngine = 「その指示を解釈して描画するエンジン」
 *
 *   シナリオ側に JavaScript は書かない。次のようなコマンド文字列を
 *   ノードの `cmd` に並べるだけで演出が動く。
 *
 *     {
 *       id: "10",
 *       text: "……",
 *       cmd: [
 *         'Choose ("こんにちはという",11 or "黙れという",11a)',
 *         "Battle Boom:1s",
 *         "Effect Black:1s",
 *         "Character Fade_out:ally:1s",
 *         "Back Fade_in:images/bg/street.jpg:1s"
 *       ]
 *     }
 *
 *   書かなかったレイヤーの状態は「そのまま維持」される（勝手に消さない）。
 *
 * 互換性について
 *   旧来の書式（node.background / node.sprites / node.choices / ラベル分岐）は
 *   そのまま動作する。新コマンドは旧書式の後に実行され、両者は共存する。
 * ========================================================================== */

/* ============================================================
 * [1] LAYERS  ―  描画レイヤー定義
 *
 *   最前面 ↑   CHOOSE      選択肢         (#choices      / .choices)
 *             BATTLE      バトル演出     (#battleLayer  / .layer-battle)
 *             EFFECT      画面エフェクト (#effectLayer  / .layer-effect)
 *             CHARACTER   立ち絵         (#spriteLayer  / .sprite-layer)
 *   最背面 ↓   BACKGROUND  背景           (#backgroundLayer 内に .background)
 *
 *   ・同一レイヤー内では「後から追加した要素ほど前面（DOMの後ろ＝上）」。
 *   ・メッセージパネル / SAVE・LOAD / topbar は従来どおり別枠のUIとして
 *     これらより上に出る（message-panel: z-index 100, save-menu: 2000）。
 * ============================================================ */
const LAYERS = {
  BACKGROUND: { key: "background", id: "backgroundLayer", className: "layer-background" },
  CHARACTER:  { key: "character",  id: "spriteLayer",     className: "sprite-layer" },
  EFFECT:     { key: "effect",     id: "effectLayer",     className: "layer-effect" },
  BATTLE:     { key: "battle",     id: "battleLayer",     className: "layer-battle" },
  CHOOSE:     { key: "choose",     id: "choices",         className: "choices" }
};

// コマンド名 → レイヤー の対応表（Parser と Engine の橋渡し）
const COMMANDS = {
  Back:      LAYERS.BACKGROUND,
  Character: LAYERS.CHARACTER,
  Effect:    LAYERS.EFFECT,
  Battle:    LAYERS.BATTLE,
  Choose:    LAYERS.CHOOSE
};

/* ============================================================
 * [2] POSITIONS  ―  立ち絵の水平位置プリセット（%指定）
 *     位置を増やす・微調整するときはここだけを触ればよい。
 * ============================================================ */
const POSITIONS = {
  left: "12%",
  centerLeft: "32%",
  center: "50%",
  centerRight: "68%",
  right: "88%"
};

/* ============================================================
 * [3] ANIMATIONS  ―  既存の立ち絵アニメーション
 *     （style.css の @keyframes と1対1で対応。削除しないこと）
 * ============================================================ */
const ANIMATIONS = {
  enter: ["slideInLeft", "slideInRight", "fadeIn", "riseIn", "popIn"],
  exit: ["slideOutLeft", "slideOutRight", "fadeOut"],
  effect: ["glow", "shake"]
};

const DEFAULT_ENTER_ANIM = "fadeIn";
const DEFAULT_EXIT_ANIM = "fadeOut";
const ENTER_ANIM_DURATION = 620;
const UPDATE_ANIM_DURATION = 500;
const EXIT_ANIM_DURATION = 520;
const DEFAULT_DURATION = 1000;

/* ============================================================
 * [4] EFFECTS  ―  Effect Layer の演出一覧
 *
 *   書式:  Effect <名前>:<時間>   例) Effect Black:1s
 *          Effect None:<時間>     例) Effect None:1s
 *                                     → 出ているエフェクトを時間をかけて全消し
 *
 *   ・指定時間をかけて opacity 0% → 100%（None は 100% → 0%）。
 *   ・transient:true の演出は、表示しきったあと自動で消える（フラッシュ等）。
 *   ・新しい演出を足したいときは、このオブジェクトに1行足すだけでよい。
 *       style … 重ねる div に当てるインラインスタイル
 *       stage … .stage 要素に一時的に付けるクラス（画面揺れなど）
 * ============================================================ */
const EFFECTS = {
  Black:    { style: { background: "#000000" } },
  White:    { style: { background: "#ffffff" } },
  Fade:     { style: { background: "linear-gradient(180deg, rgba(0,0,0,.95), rgba(0,0,0,.60))" } },
  Flash:    { style: { background: "#ffffff" }, transient: true },
  Red:      { style: { background: "radial-gradient(circle at 50% 50%, rgba(160,0,0,.35), rgba(90,0,0,.85))" } },
  Blue:     { style: { background: "radial-gradient(circle at 50% 45%, rgba(0,80,180,.30), rgba(0,10,40,.85))" } },
  Gold:     { style: { background: "radial-gradient(circle at 50% 45%, rgba(255,215,120,.30), rgba(60,40,0,.75))" } },
  Sepia:    { style: { background: "rgba(120,90,50,.40)", backdropFilter: "sepia(.7)" } },
  Night:    { style: { background: "linear-gradient(180deg, rgba(0,10,30,.78), rgba(0,0,10,.92))" } },
  Vignette: { style: { background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,.85) 100%)" } },
  Blur:     { style: { backdropFilter: "blur(7px)", background: "rgba(0,0,0,.08)" } },
  Noise:    { className: "fx--noise" },
  Glitch:   { className: "fx--glitch", transient: true },
  Zoom:     { className: "fx--zoom", transient: true },
  Shake:    { stage: "stage--shake", transient: true }
};

/* ============================================================
 * [5] BATTLES  ―  Battle Layer の演出一覧
 *
 *   書式:  Battle <名前>:<時間>   例) Battle Boom:1s
 *
 *   ・指定時間だけ Battle Layer に表示され、終了後にDOMごと自動で消える。
 *   ・見た目はすべて CSS（style.css の .battle-fx--*）で描いている。
 *     巨大な画像素材は一切増やしていないので、追加はCSSクラス1つで済む。
 * ============================================================ */
const BATTLES = {
  Boom:      { className: "battle-fx--boom" },
  Flash:     { className: "battle-fx--flash" },
  Hit:       { className: "battle-fx--hit" },
  Critical:  { className: "battle-fx--critical", stage: "stage--shake" },
  Slash:     { className: "battle-fx--slash" },
  Impact:    { className: "battle-fx--impact" },
  Shake:     { className: "battle-fx--none", stage: "stage--shake" },
  Explosion: { className: "battle-fx--explosion", stage: "stage--shake" },
  Spark:     { className: "battle-fx--spark" },
  Shockwave: { className: "battle-fx--shockwave" },
  Fire:      { className: "battle-fx--fire" },
  Smoke:     { className: "battle-fx--smoke" },
  Electric:  { className: "battle-fx--electric" },
  Speed:     { className: "battle-fx--speed" },
  Dark:      { className: "battle-fx--dark" },
  Freeze:    { className: "battle-fx--freeze" },
  Light:     { className: "battle-fx--light" },
  Cross:     { className: "battle-fx--cross" }
};

/* ============================================================
 * [6] Parser  ―  コマンド文字列の解析
 *
 *   "Battle Boom:1s"
 *      → { command:"Battle", layer:LAYERS.BATTLE, name:"Boom",
 *          args:[], duration:1000 }
 *
 *   ・文字列を eval したりはしない。安全な字句解析のみ。
 *   ・"1s" / "0.5s" / "500ms" / "800" を ms に変換する。
 * ============================================================ */

// "1s" → 1000 / "0.5s" → 500 / "500ms" → 500 / "800" → 800
function parseDuration(token, fallback = DEFAULT_DURATION) {
  if (token === undefined || token === null || token === "") return fallback;
  if (typeof token === "number") return token;
  const text = String(token).trim();
  let m = /^(\d+(?:\.\d+)?)\s*ms$/i.exec(text);
  if (m) return Math.round(Number(m[1]));
  m = /^(\d+(?:\.\d+)?)\s*s$/i.exec(text);
  if (m) return Math.round(Number(m[1]) * 1000);
  m = /^(\d+(?:\.\d+)?)$/.exec(text);
  if (m) return Math.round(Number(m[1]));
  return fallback;
}

function isDurationToken(token) {
  return /^\d+(?:\.\d+)?\s*(?:ms|s)?$/i.test(String(token).trim());
}

// 表記ゆれ吸収: "fade in" / "Fade_in" / "FADE-IN" → "fade_in"
function normalizeName(name) {
  return String(name ?? "").trim().replace(/[\s-]+/g, "_").toLowerCase();
}

// EFFECTS / BATTLES などの「名前 → 定義」表を、大文字小文字を問わず引く
function lookupRegistry(registry, name) {
  const wanted = normalizeName(name);
  for (const key of Object.keys(registry)) {
    if (normalizeName(key) === wanted) return { key, def: registry[key] };
  }
  return null;
}

// 1ノード分のコマンド指定（配列 / 文字列）をコマンド文字列の配列にほぐす。
// 文字列の場合は「改行」と「引用符・括弧の外側にあるカンマ」で区切る。
function splitCommandSource(source) {
  if (!source) return [];
  if (Array.isArray(source)) return source.flatMap((item) => splitCommandSource(item));

  const text = String(source);
  const out = [];
  let buffer = "";
  let depth = 0;
  let inQuote = false;

  for (const ch of text) {
    if (ch === '"') inQuote = !inQuote;
    if (!inQuote && (ch === "(" || ch === "（")) depth += 1;
    if (!inQuote && (ch === ")" || ch === "）")) depth = Math.max(0, depth - 1);

    if (!inQuote && depth === 0 && (ch === "\n" || ch === "," || ch === "、")) {
      out.push(buffer);
      buffer = "";
      continue;
    }
    buffer += ch;
  }
  out.push(buffer);
  return out.map((line) => line.trim()).filter(Boolean);
}

/**
 * コマンド1行を解析する。解析できない場合は null（クラッシュさせない）。
 */
function parseCommand(line) {
  const text = String(line ?? "").trim();
  if (!text) return null;

  const head = /^([A-Za-z_]+)\s*([\s\S]*)$/.exec(text);
  if (!head) {
    console.warn(`[Command] 解析できないコマンドです: "${text}"`);
    return null;
  }

  const commandKey = Object.keys(COMMANDS).find(
    (key) => normalizeName(key) === normalizeName(head[1])
  );
  if (!commandKey) {
    console.warn(`[Command] 未定義のコマンドです: "${head[1]}"`);
    return null;
  }

  const rest = head[2].trim();
  const base = { command: commandKey, layer: COMMANDS[commandKey], source: text };

  // --- Choose ("ラベル",行き先 or "ラベル",行き先) --------------------------
  if (commandKey === "Choose") {
    const body = rest.replace(/^[（(]/, "").replace(/[）)]$/, "");
    const options = [];
    const re = /"([^"]*)"\s*[,，]\s*([^\s,，)）]+)/g;
    let m;
    while ((m = re.exec(body)) !== null) {
      options.push({ label: m[1], next: m[2].trim() });
    }
    if (!options.length) return null; // 「Choose」だけ書かれた＝何もしない
    return { ...base, options };
  }

  // --- それ以外は「名前:引数:…:時間」形式 ----------------------------------
  if (!rest) return null; // 「Battle」だけ＝何もしない（レイヤーは現状維持）

  const parts = rest.split(":").map((p) => p.trim()).filter((p) => p !== "");
  if (!parts.length) return null;

  // 末尾が時間指定ならそれを duration として切り出す
  let duration = null;
  if (parts.length > 1 && isDurationToken(parts[parts.length - 1])) {
    duration = parseDuration(parts.pop());
  }

  return {
    ...base,
    name: parts[0] ?? "",
    args: parts.slice(1),
    duration: duration ?? DEFAULT_DURATION
  };
}

/* ============================================================
 * [7] NovelEngine  ―  エンジン本体
 * ============================================================ */
export class NovelEngine {
  constructor(root, scenario) {
    this.root = root;
    this.scenario = scenario;
    this.index = 0;
    this.state = {
      day: 1,
      flags: {},
      affection: { emma: 0 },
      history: []
    };

    // --- シナリオID → 配列インデックス の解決表 ---------------------------
    // シナリオ番号（"1" / "11a" など）は配列のindexそのものではない。
    // node.id と node.alias（旧ラベル）の両方をここへ登録しているので、
    // 配列の順番を入れ替えても分岐先が壊れにくい。
    this.labelIndex = new Map();
    this.buildScenarioIndex();

    // 現在ステージに出ているキャラクターの管理台帳（sprite id → DOM）
    this.spriteEls = new Map();
    // 現在 Effect Layer に出ている演出の管理台帳（effect名 → DOM）
    this.effectEls = new Map();
    // 実行中タイマー（LOAD時などにまとめて止める）
    this.timers = new Set();
    // 選択肢表示中フラグ（表示中はクリック／Enterで進まない）
    this.chooseActive = false;

    this.renderShell();
    this.bindEvents();
    this.bindSaveSystem();
    this.makeSaveSlots();

    this.closeSave.onclick = () => {
      this.saveMenu.classList.add("hidden");
    };
  }

  /* --------------------------------------------------------------
   * シナリオ番号システム
   *   "1", "2", "3" … と増える番号。分岐先は "11a" のように
   *   「数字 + 記号」で表現できる。旧ラベル（"ch2-start" 等）は
   *   alias として同じ場所に解決される。
   * ------------------------------------------------------------ */
  buildScenarioIndex() {
    this.labelIndex.clear();
    this.scenario.forEach((node, i) => {
      const keys = [];
      if (node.id !== undefined && node.id !== null) keys.push(String(node.id));
      if (Array.isArray(node.alias)) keys.push(...node.alias.map(String));
      else if (node.alias) keys.push(String(node.alias));

      for (const key of keys) {
        if (this.labelIndex.has(key)) {
          console.warn(`[Scenario] シナリオIDが重複しています: "${key}"`);
          continue;
        }
        this.labelIndex.set(key, i);
      }
    });
  }

  // ラベル / シナリオ番号 / 数値インデックス を、実際の配列インデックスに解決する。
  resolveIndex(target) {
    if (typeof target === "number") return target;
    if (typeof target === "string") {
      const key = target.trim();
      if (this.labelIndex.has(key)) return this.labelIndex.get(key);
      console.warn(`[Scenario] 未定義のシナリオID: ${key}`);
      return this.index;
    }
    console.warn(`[Scenario] 未定義のシナリオID: ${String(target)}`);
    return this.index;
  }

  // 現在ノードのシナリオID（SAVEデータ用）
  currentScenarioId() {
    const node = this.scenario[this.index];
    return node?.id !== undefined ? String(node.id) : null;
  }

  /* --------------------------------------------------------------
   * 画面骨組み（レイヤー構造）
   *   背面 → 前面 の順にそのまま並べてある。
   * ------------------------------------------------------------ */
  renderShell() {
    this.root.innerHTML = `
    <main class="game">
      <section class="stage" aria-label="ゲーム画面">
        <!-- ▼ Background Layer（最背面）: 背景。新旧2枚を重ねられる -->
        <div class="${LAYERS.BACKGROUND.className}" id="${LAYERS.BACKGROUND.id}">
          <div class="background" id="background"></div>
        </div>

        <!-- ▼ Character Layer: 立ち絵 -->
        <div class="${LAYERS.CHARACTER.className}" id="${LAYERS.CHARACTER.id}"></div>

        <div class="overlay"></div>

        <!-- ▼ Effect Layer: 暗転などの画面エフェクト -->
        <div class="${LAYERS.EFFECT.className}" id="${LAYERS.EFFECT.id}"></div>

        <!-- ▼ Battle Layer: バトル演出 -->
        <div class="${LAYERS.BATTLE.className}" id="${LAYERS.BATTLE.id}"></div>

        <div class="topbar">
          <div class="mobile-buttons">
            <button id="saveButton">SAVE</button>
            <button id="loadButton">LOAD</button>
          </div>
          <span id="chapter"></span>
          <span id="clock"></span>
        </div>
        <div class="status" id="status"></div>

        <div class="message-panel" id="messagePanel">
          <div class="speaker" id="speaker"></div>
          <div class="message" id="message"></div>
          <div class="continue" id="continue"></div>
        </div>

        <!-- ▼ Choose Layer（最前面）: 選択肢 -->
        <div class="${LAYERS.CHOOSE.className}" id="${LAYERS.CHOOSE.id}"></div>

        <!-- セーブ/ロード兼用メニュー (モードによって中身を切り替え) -->
        <div class="save-menu hidden" id="saveMenu">
          <div class="save-title" id="saveTitle">記録 / 読込</div>
          <div class="save-grid" id="saveGrid"></div>
          <button id="closeSave">閉じる</button>
        </div>
      </section>
    </main>
  `;

    // --- 各レイヤーのルート要素 ---
    this.stage = this.root.querySelector(".stage");
    this.backgroundLayer = this.root.querySelector(`#${LAYERS.BACKGROUND.id}`);
    this.background = this.root.querySelector("#background"); // 現在最前面の背景
    this.spriteLayer = this.root.querySelector(`#${LAYERS.CHARACTER.id}`);
    this.effectLayer = this.root.querySelector(`#${LAYERS.EFFECT.id}`);
    this.battleLayer = this.root.querySelector(`#${LAYERS.BATTLE.id}`);
    this.choices = this.root.querySelector(`#${LAYERS.CHOOSE.id}`);

    // --- UI要素（従来どおり） ---
    this.chapter = this.root.querySelector("#chapter");
    this.clock = this.root.querySelector("#clock");
    this.status = this.root.querySelector("#status");
    this.messagePanel = this.root.querySelector("#messagePanel");
    this.speaker = this.root.querySelector("#speaker");
    this.message = this.root.querySelector("#message");
    this.continueLabel = this.root.querySelector("#continue");
    this.saveMenu = this.root.querySelector("#saveMenu");
    this.saveTitle = this.root.querySelector("#saveTitle");
    this.saveGrid = this.root.querySelector("#saveGrid");
    this.closeSave = this.root.querySelector("#closeSave");
    this.saveButton = this.root.querySelector("#saveButton");
    this.loadButton = this.root.querySelector("#loadButton");

    // レイヤー参照をまとめて引けるようにしておく（拡張・デバッグ用）
    this.layers = {
      [LAYERS.BACKGROUND.key]: this.backgroundLayer,
      [LAYERS.CHARACTER.key]: this.spriteLayer,
      [LAYERS.EFFECT.key]: this.effectLayer,
      [LAYERS.BATTLE.key]: this.battleLayer,
      [LAYERS.CHOOSE.key]: this.choices
    };
  }

  bindEvents() {
    // メイン画面のクリック
    this.root.addEventListener("click", (event) => {
      // メニューが開いている、または選択肢がある場合は次へ進ませない
      if (!this.saveMenu.classList.contains("hidden")) return;
      if (event.target.closest(".choice")) return;
      if (event.target.closest(".mobile-buttons")) return;

      this.next();
    });

    // キーボード操作
    window.addEventListener("keydown", (event) => {
      if (!this.saveMenu.classList.contains("hidden")) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.next();
      }
    });

    // --- セーブ機能の呼び出し ---
    this.saveButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openMenu("save");
    });

    // --- ロード機能の呼び出し ---
    this.loadButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openMenu("load");
    });

    // 閉じるボタン
    this.closeSave.addEventListener("click", (e) => {
      e.stopPropagation();
      this.saveMenu.classList.add("hidden");
    });
  }

  /* --------------------------------------------------------------
   * タイマー管理（アニメーション終了後の後始末に使う）
   * ------------------------------------------------------------ */
  delay(fn, ms) {
    const id = setTimeout(() => {
      this.timers.delete(id);
      try {
        fn();
      } catch (error) {
        console.warn("[NovelEngine] 演出処理でエラーが発生しました:", error);
      }
    }, Math.max(0, ms));
    this.timers.add(id);
    return id;
  }

  clearTimers() {
    for (const id of this.timers) clearTimeout(id);
    this.timers.clear();
  }

  /**
   * メニューを開く (save または load)
   */
  openMenu(mode) {
    // タイトルをDies irae風に書き換え
    this.saveTitle.textContent = mode === "save" ? "記録 ―― SAVE" : "読込 ―― LOAD";

    // スロットを生成（ここでセーブ用かロード用かの挙動が決まる）
    this.renderSaveSlots(mode);

    this.saveMenu.classList.remove("hidden");
  }

  /**
   * スロットの生成とクリックイベントの割り当て
   */
  renderSaveSlots(mode) {
    this.saveGrid.innerHTML = ""; // 一旦空にする

    for (let i = 1; i <= 8; i++) {
      const slot = document.createElement("button");
      slot.className = "save-slot";

      // 保存されているデータがあるか確認
      const data = this.readSaveData(`save-slot-${i}`);

      if (data) {
        slot.textContent = `SLOT ${i}: ${data.chapter ?? "???"}`;
      } else {
        slot.textContent = mode === "save" ? `SLOT ${i}: 空き` : `SLOT ${i}: データなし`;
        if (mode === "load") slot.disabled = true; // ロード時は空スロットを押せなくする
      }

      // スロットクリック時の挙動を分ける
      slot.addEventListener("click", (e) => {
        e.stopPropagation();
        if (mode === "save") {
          this.performSave(i);
        } else {
          this.performLoad(i);
        }
      });

      this.saveGrid.appendChild(slot);
    }
  }

  // 壊れたセーブデータでクラッシュしないよう、読み出しを一本化
  readSaveData(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn(`[Save] セーブデータを読み込めませんでした: ${key}`, error);
      return null;
    }
  }

  // セーブデータの位置情報 → 配列インデックス（新旧どちらの形式でも復元できる）
  restorePosition(data) {
    if (!data) return 0;
    if (typeof data.scenarioId === "string" && this.labelIndex.has(data.scenarioId)) {
      return this.labelIndex.get(data.scenarioId);
    }
    if (typeof data.index === "number" && this.scenario[data.index]) {
      return data.index;
    }
    console.warn("[Save] セーブ位置を復元できなかったため、先頭から再開します。");
    return 0;
  }

  /**
   * 実際のセーブ処理（アラートなし）
   */
  performSave(slotIndex) {
    const currentStep = this.scenario[this.index] ?? {};
    const saveData = {
      index: this.index,
      scenarioId: this.currentScenarioId(),
      chapter: currentStep.chapter || "???",
      time: currentStep.time || "--:--",
      date: new Date().toLocaleString()
    };

    localStorage.setItem(`save-slot-${slotIndex}`, JSON.stringify(saveData));

    // アラートの代わりに、スロットの表示を即座に更新して「保存した」ことを示す
    this.renderSaveSlots("save");

    console.log(`Saved to Slot ${slotIndex}`);
  }

  /**
   * 実際のロード処理（アラートなし）
   */
  performLoad(slotIndex) {
    const data = this.readSaveData(`save-slot-${slotIndex}`);
    if (!data) return;

    this.index = this.restorePosition(data);

    // メニューを即座に閉じ、ゲーム画面を再描画する
    this.saveMenu.classList.add("hidden");

    // 立ち絵・エフェクト・バトル演出をクリアして現在のインデックスの内容を表示
    this.resetLayers();
    this.showCurrent();

    console.log(`Loaded from Slot ${slotIndex}`);
  }

  /* --------------------------------------------------------------
   * レイヤーの初期化（ゲーム開始時・ロード時のみ使用）
   *   ※ 通常のシナリオ進行では絶対に呼ばない。
   *     「指定されていないレイヤーは状態を維持する」ため。
   * ------------------------------------------------------------ */
  resetLayers() {
    this.clearTimers();

    // Character Layer
    this.spriteEls.forEach((el) => el.remove());
    this.spriteEls.clear();
    this.spriteLayer.replaceChildren();

    // Effect Layer
    this.effectEls.clear();
    this.effectLayer.replaceChildren();

    // Battle Layer
    this.battleLayer.replaceChildren();

    // Choose Layer
    this.choices.replaceChildren();
    this.chooseActive = false;

    // Background Layer（重ねてある背景を1枚だけに戻す）
    const backgrounds = [...this.backgroundLayer.querySelectorAll(".background")];
    while (backgrounds.length > 1) backgrounds.shift().remove();
    if (backgrounds.length) {
      this.background = backgrounds[0];
      this.background.style.opacity = "";
      this.background.style.transition = "";
    }

    this.stage.classList.remove("stage--shake");
  }

  start() {
    this.index = 0;
    this.resetLayers();
    this.saveMenu.classList.add("hidden");
    this.showCurrent();
  }

  next() {
    const current = this.scenario[this.index];
    if (!current) return;

    // 選択肢待ち、またはエンディング到達中はクリックでは進めない。
    if (this.chooseActive) return;
    if (current.choices?.length) return;
    if (current.ending) return;

    this.index += 1;
    if (this.index >= this.scenario.length) {
      this.showEnding();
      return;
    }
    this.showCurrent();
  }

  /* --------------------------------------------------------------
   * 1ノードの描画
   *   ① UI（章／時刻／話者／本文）
   *   ② 旧書式（background / sprites / choices）
   *   ③ 新コマンド（cmd）
   *   書かれていないレイヤーには一切触らない＝現状維持。
   * ------------------------------------------------------------ */
  showCurrent() {
    const node = this.scenario[this.index];
    if (!node) {
      this.showEnding();
      return;
    }

    this.chapter.textContent = node.chapter ?? "序章";
    this.clock.textContent = node.time ?? "";

    // --- Background Layer（旧書式：即時切り替え。見た目は従来どおり） ---
    if (node.background) {
      this.setBackground(node.background);
    }

    if (node.setFlags) {
      Object.assign(this.state.flags, node.setFlags);
    }

    if (node.setState) {
      Object.assign(this.state, node.setState);
    }

    // --- Character Layer（旧書式） ---
    this.applySprites(node);

    this.status.textContent = node.status ?? "";
    this.speaker.textContent = node.speaker ?? "";
    this.message.textContent = node.text ?? "";

    this.messagePanel.classList.toggle("is-ending", Boolean(node.ending));
    this.continueLabel.textContent = node.ending
      ? "―― ルート終了 ――"
      : "クリック / Enter で進む";

    // --- Choose Layer は毎回いったん空にする ---
    this.choices.replaceChildren();
    this.chooseActive = false;

    if (node.choices?.length) {
      this.showChoices(node.choices);
    }

    // --- 新コマンド（cmd）を実行 ---
    this.runCommands(node);
  }

  /* --------------------------------------------------------------
   * コマンド実行 ― Parser の結果を各レイヤーへ振り分ける
   *
   *   Choose    → Choose Layer
   *   Battle    → Battle Layer
   *   Effect    → Effect Layer
   *   Character → Character Layer
   *   Back      → Background Layer
   * ------------------------------------------------------------ */
  runCommands(node) {
    const lines = splitCommandSource(node.cmd ?? node.commands);
    if (!lines.length) return;

    for (const line of lines) {
      const parsed = parseCommand(line);
      if (!parsed) continue;

      switch (parsed.command) {
        case "Choose":
          this.runChooseCommand(parsed);
          break;
        case "Battle":
          this.runBattleCommand(parsed);
          break;
        case "Effect":
          this.runEffectCommand(parsed);
          break;
        case "Character":
          this.runCharacterCommand(parsed, node);
          break;
        case "Back":
          this.runBackCommand(parsed, node);
          break;
        default:
          console.warn(`[Command] 処理できないコマンドです: "${parsed.source}"`);
      }
    }
  }

  /* ===== Choose Layer ========================================= */

  // 選択肢ボタンの生成（旧 choices 配列・新 Choose コマンド共通）
  showChoices(options) {
    for (const choice of options) {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";
      button.textContent = choice.label;
      button.addEventListener("click", () => this.selectChoice(choice));
      this.choices.appendChild(button);
    }
    this.chooseActive = this.choices.childElementCount > 0;
  }

  // Choose ("こんにちはという",11 or "黙れという",11a)
  runChooseCommand(parsed) {
    // 画面には label だけを出す。行き先の番号は表示しない。
    this.showChoices(parsed.options.map((o) => ({ label: o.label, next: o.next })));
  }

  selectChoice(choice) {
    if (choice.setFlags) {
      Object.assign(this.state.flags, choice.setFlags);
    }

    if (choice.setState) {
      Object.assign(this.state, choice.setState);
    }

    this.state.history.push({
      index: this.index,
      choice: choice.label
    });

    this.chooseActive = false;

    if (choice.next !== undefined) {
      this.index = this.resolveIndex(choice.next);
      this.showCurrent();
      return;
    }

    this.next();
  }

  /* ===== Battle Layer ========================================= */

  // Battle Boom:1s
  runBattleCommand(parsed) {
    const found = lookupRegistry(BATTLES, parsed.name);
    if (!found) {
      console.warn(`[Battle] 未定義のバトル演出です: ${parsed.name}`);
      return;
    }

    const duration = parsed.duration;
    const el = document.createElement("div");
    el.className = `battle-fx ${found.def.className}`;
    el.dataset.battle = found.key;
    el.style.setProperty("--fx-duration", `${duration}ms`);
    // 後から出したものほど前面（appendChild = DOMの後ろ）
    this.battleLayer.appendChild(el);

    if (found.def.stage) {
      this.stage.classList.add(found.def.stage);
      this.delay(() => this.stage.classList.remove(found.def.stage), duration);
    }

    // 指定時間で自動終了。DOMも残さない。
    this.delay(() => el.remove(), duration);
  }

  /* ===== Effect Layer ========================================= */

  // Effect Black:1s  /  Effect None:1s
  runEffectCommand(parsed) {
    const duration = parsed.duration;

    // Effect None:1s → 現在出ているエフェクトを時間をかけて全部消す
    if (normalizeName(parsed.name) === "none") {
      this.clearEffects(duration);
      return;
    }

    const found = lookupRegistry(EFFECTS, parsed.name);
    if (!found) {
      console.warn(`[Effect] 未定義のエフェクトです: ${parsed.name}`);
      return;
    }

    const { key, def } = found;

    // .stage に一時クラスを当てるだけの演出（Shake など）
    if (def.stage) {
      this.stage.classList.add(def.stage);
      this.delay(() => this.stage.classList.remove(def.stage), duration);
      if (!def.style && !def.className) return;
    }

    let el = this.effectEls.get(key);
    if (!el) {
      el = document.createElement("div");
      el.className = def.className ? `fx ${def.className}` : "fx";
      el.dataset.effect = key;
      Object.assign(el.style, def.style ?? {});
      el.style.opacity = "0";
      // 後から出したものほど前面
      this.effectLayer.appendChild(el);
      this.effectEls.set(key, el);
    }

    el.style.setProperty("--fx-duration", `${duration}ms`);
    el.style.transition = `opacity ${duration}ms linear`;
    // 0% → 100%
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });

    // 一瞬だけの演出（Flash など）は、表示しきったあと自動で消す
    if (def.transient) {
      this.delay(() => this.fadeOutEffect(key, duration), duration);
    }
  }

  // 1種類のエフェクトを時間をかけて消す
  fadeOutEffect(key, duration) {
    const el = this.effectEls.get(key);
    if (!el) return;
    this.effectEls.delete(key);
    el.style.transition = `opacity ${duration}ms linear`;
    el.style.opacity = "0";
    this.delay(() => el.remove(), duration);
  }

  // Effect None:1s の本体 ― 100% → 0% にしてから削除する
  clearEffects(duration) {
    for (const key of [...this.effectEls.keys()]) {
      this.fadeOutEffect(key, duration);
    }
  }

  /* ===== Character Layer ====================================== */

  /**
   * Character <動作>:<キャラID>[:<画像/位置/アニメ>…]:<時間>
   *
   *   Character Fade_in:ally:1s           … 登場（フェードイン）
   *   Character Fade_out:ally:1s          … 退場（フェードアウト）
   *   Character None:ally:1s              … 退場（Fade_out と同義）
   *   Character Fade_in:ally:right:1s     … 位置を指定して登場
   *   Character Change:reese:reese_angry  … 画像（表情）差し替え
   *   Character Move:ally:right           … 位置変更
   *   Character Effect:ally:glow          … 強調演出（glow / shake / none）
   *
   * 内部的には既存の applySprites() をそのまま呼ぶので、
   * 旧書式（node.sprites）と完全に同じ描画経路を通る。
   */
  runCharacterCommand(parsed, node) {
    const action = normalizeName(parsed.name);
    const id = parsed.args[0];
    if (!id) {
      console.warn(`[Character] キャラクターIDが指定されていません: "${parsed.source}"`);
      return;
    }

    // 残りの引数を「位置 / アニメ / 強調 / 画像」に自動で振り分ける
    const spec = { id, keepImage: true };
    for (const token of parsed.args.slice(1)) {
      if (POSITIONS[token]) {
        spec.position = token;
      } else if (ANIMATIONS.enter.includes(token) || ANIMATIONS.exit.includes(token)) {
        spec.anim = token;
      } else if (ANIMATIONS.effect.includes(token) || token === "none") {
        spec.effect = token;
      } else {
        const image = this.resolveCharacterImage(token, node);
        if (image) {
          spec.image = image;
          spec.keepImage = false;
        }
      }
    }
    if (!spec.position) spec.keepPosition = true;

    const isExit =
      action === "fade_out" || action === "none" || action === "exit" || action === "hide" || action === "out";

    if (isExit) {
      spec.action = "exit";
      spec.anim = spec.anim && ANIMATIONS.exit.includes(spec.anim) ? spec.anim : DEFAULT_EXIT_ANIM;
    } else if (action === "fade_in" || action === "enter" || action === "show" || action === "in") {
      spec.action = "enter";
      spec.anim = spec.anim && ANIMATIONS.enter.includes(spec.anim) ? spec.anim : DEFAULT_ENTER_ANIM;
      spec.bringToFront = true; // 後から登場したキャラクターほど前面
    } else if (action === "change" || action === "update" || action === "move" || action === "effect") {
      spec.action = "update";
    } else {
      console.warn(`[Character] 未定義の動作です: ${parsed.name}`);
      return;
    }

    this.applySprites({ sprites: [spec], speaker: node?.speaker }, parsed.duration);
  }

  // "reese_angry" のようなキー、または画像パスを実際のURLへ解決する。
  // キー表は scenario.js が公開している CHARACTERS（=ASSETS.sprites）を使う。
  resolveCharacterImage(token, node) {
    if (!token) return undefined;
    if (token.includes("/") || token.includes(".")) return token;
    const table = node?.assets?.sprites ?? this.scenario?.characters ?? null;
    if (table && table[token]) return table[token];
    console.warn(`[Character] 画像キーを解決できませんでした: ${token}`);
    return undefined;
  }

  /**
   * ノードの `sprites` 定義を読み取り、立ち絵の登場・退場・更新を行う。
   * （既存関数をそのまま新システムの中核として再利用している）
   *
   * 1件あたりの書式:
   *   {
   *     id: "ally",              // 必須。ステージ上での管理キー
   *     name: "アリー",           // プレースホルダーに出す名前
   *     position: "right",       // POSITIONS のキー（省略時 center）
   *     action: "enter" | "exit" | 省略,
   *     anim: "slideInRight",    // 登場/退場アニメーション名（省略時は既定値）
   *     effect: "glow" | "shake",// 既にいるキャラへのワンポイント演出
   *     image: "/path/to.png"    // 立ち絵画像
   *   }
   *
   * 追加の内部フラグ（Characterコマンドからのみ使用。旧書式の挙動は不変）:
   *   keepImage / keepPosition … 指定のない項目を現状維持する
   *   bringToFront             … 既に居るキャラを最前面へ持ち上げる
   */
  applySprites(node, durationOverride = null) {
    const specs = node.sprites ?? [];

    for (const spec of specs) {
      const { id, name, position = "center", action, anim, effect, image, bringToFront } = spec;
      if (!id) continue;

      let el = this.spriteEls.get(id);

      // --- 退場処理 ---
      if (action === "exit") {
        if (el) {
          const outAnim = anim && ANIMATIONS.exit.includes(anim) ? anim : DEFAULT_EXIT_ANIM;
          const outDuration = durationOverride ?? EXIT_ANIM_DURATION;
          el.style.animation = `${outAnim} ${outDuration}ms ease forwards`;
          const target = el;
          this.delay(() => target.remove(), outDuration);
          this.spriteEls.delete(id);
        }
        continue;
      }

      // --- 登場・更新処理 ---
      if (!el) {
        el = document.createElement("div");
        el.className = "sprite";
        el.dataset.id = id;
        // 最初は必ず仮のラベルを入れておく
        el.innerHTML = `<span class="sprite-label">${name ?? id}</span>`;
        // appendChild = Character Layer の一番後ろ＝一番前面
        this.spriteLayer.appendChild(el);
        this.spriteEls.set(id, el);

        const inAnim = anim && ANIMATIONS.enter.includes(anim) ? anim : DEFAULT_ENTER_ANIM;
        el.style.animation = `${inAnim} ${durationOverride ?? ENTER_ANIM_DURATION}ms ease forwards`;
      } else {
        // 既にいるキャラを改めて「登場」させたときだけ最前面へ移動する。
        // （旧書式の sprites では移動しない＝従来の重なり順をそのまま維持）
        if (bringToFront && this.spriteLayer.lastElementChild !== el) {
          this.spriteLayer.appendChild(el);
        }
        if (anim) {
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = `${anim} ${durationOverride ?? UPDATE_ANIM_DURATION}ms ease`;
        }
      }

      // --- 位置 ---
      if (!spec.keepPosition || !el.style.getPropertyValue("--sprite-x")) {
        el.style.setProperty("--sprite-x", POSITIONS[position] ?? POSITIONS.center);
      }

      // --- 画像の読み込みチェック ---
      if (image) {
        const tempImg = new Image();
        tempImg.src = image;

        // 画像が存在した場合のみ立ち絵モードにする
        tempImg.onload = () => {
          el.style.backgroundImage = `url(${image})`;
          el.classList.add("sprite--has-image"); // これでラベルを隠す
        };

        // 画像がない、またはエラーの場合は仮の姿を維持する
        tempImg.onerror = () => {
          console.warn(`[Asset Missing] ${image} が見つかりません。仮の立ち絵を表示します。`);
          el.style.backgroundImage = "none";
          el.classList.remove("sprite--has-image"); // ラベルを再表示
        };
      } else if (!spec.keepImage) {
        // そもそも image の指定がない場合（旧書式と同じ挙動）
        el.style.backgroundImage = "none";
        el.classList.remove("sprite--has-image");
      }

      // エフェクト処理
      if (effect === "glow") {
        el.classList.add("sprite--glow");
      } else if (effect === "shake") {
        el.classList.remove("sprite--shake");
        void el.offsetWidth;
        el.classList.add("sprite--shake");
      } else if (effect === "none") {
        // 既存シナリオ側で「発動していたエフェクトを止める」ために使われている指定
        el.classList.remove("sprite--glow");
        el.classList.remove("sprite--shake");
      }
    }

    // 話者強調
    for (const [, el] of this.spriteEls) {
      const label = el.querySelector(".sprite-label")?.textContent;
      const isSpeaking = Boolean(node.speaker) && label === node.speaker;
      el.classList.toggle("sprite--speaking", isSpeaking);
    }
  }

  /* ===== Background Layer ===================================== */

  /**
   * 旧書式の背景切り替え（従来と完全に同じ見た目）。
   * 現在いちばん上にある .background 要素へ直接適用する。
   */
  setBackground(source) {
    if (!source || !this.background) return;
    if (String(source).includes("/")) {
      this.background.style.backgroundImage = `url(${source})`;
      delete this.background.dataset.scene;
    } else {
      this.background.style.backgroundImage = "";
      this.background.dataset.scene = source; // 従来の文字列指定も一応残す
    }
  }

  /**
   * Back Fade_in:1s              … node.background を上に重ねてフェードイン
   * Back Fade_in:<画像パス>:1s   … 指定画像を上に重ねてフェードイン
   * Back Set:<画像パス>          … 即時切り替え（旧来と同じ）
   *
   * フェードインは
   *   旧背景 → 上に新背景を重ねる → 新背景 opacity 0% → 100%
   *   → 100%になった時点で旧背景を削除
   * という方式。常に最後は新しい背景1枚だけが残る。
   */
  runBackCommand(parsed, node) {
    const action = normalizeName(parsed.name);
    const explicit = parsed.args.find((token) => !isDurationToken(token));
    const source = explicit ?? node?.background ?? null;

    if (!source) {
      console.warn(`[Back] 背景が指定されていません: "${parsed.source}"`);
      return;
    }

    // 即時切り替え
    if (action === "set" || action === "cut" || action === "change") {
      this.setBackground(source);
      return;
    }

    if (!["fade_in", "fade", "in", "fadein"].includes(action)) {
      console.warn(`[Back] 未定義の背景演出です: ${parsed.name}`);
      return;
    }

    const duration = parsed.duration;
    const oldEl = this.background;

    // 新しい背景を「上から重ねる」
    const newEl = document.createElement("div");
    newEl.className = "background";
    if (String(source).includes("/")) {
      newEl.style.backgroundImage = `url(${source})`;
    } else {
      newEl.dataset.scene = source;
    }
    newEl.style.opacity = "0";
    newEl.style.transition = `opacity ${duration}ms linear`;
    this.backgroundLayer.appendChild(newEl);
    this.background = newEl;

    requestAnimationFrame(() => {
      newEl.style.opacity = "1";
    });

    // 不透明度が100%になった時点で旧背景を削除する
    this.delay(() => {
      if (oldEl && oldEl !== newEl && oldEl.parentNode) oldEl.remove();
      newEl.style.transition = "";
      newEl.style.opacity = "";
    }, duration);
  }

  /* ===== SAVE / LOAD（キーボードショートカット版・従来機能） ===== */

  bindSaveSystem() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        this.openSaveMenu();
      }

      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        this.openLoadMenu();
      }
    });
  }

  makeSaveSlots() {
    this.saveGrid.innerHTML = "";

    for (let i = 0; i < 12; i++) {
      const button = document.createElement("button");
      button.className = "save-slot";
      button.dataset.slot = i;

      const data = this.readSaveData("save_" + i);

      if (data) {
        button.innerHTML = `

    <div style="font-size:18px;font-weight:bold;">
    Save ${i + 1}
    </div>

    <div style="font-size:15px;margin-top:8px;">
    ${data.chapter}
    </div>

    <div style="font-size:14px;">
    ${data.time}
    </div>

    <div style="font-size:14px;">
    ${data.speaker}
    </div>

    <div style="font-size:12px;margin-top:10px;opacity:.7;">
    ${data.date}
    </div>

    `;
      } else {
        button.textContent = "空白";
      }

      button.onclick = () => {
        this.saveSlot(i);
      };

      this.saveGrid.appendChild(button);
    }
  }

  openSaveMenu() {
    this.makeSaveSlots();
    this.saveMenu.classList.remove("hidden");
  }

  saveSlot(slot) {
    const node = this.scenario[this.index] ?? {};

    const data = {
      index: this.index,
      scenarioId: this.currentScenarioId(),
      state: this.state,
      chapter: node.chapter ?? "序章",
      time: node.time ?? "",
      speaker: node.speaker ?? "",
      date: new Date().toLocaleString()
    };

    localStorage.setItem("save_" + slot, JSON.stringify(data));

    this.makeSaveSlots();
  }

  openLoadMenu() {
    this.makeLoadSlots();
    this.saveMenu.classList.remove("hidden");
  }

  makeLoadSlots() {
    this.saveGrid.innerHTML = "";

    for (let i = 0; i < 12; i++) {
      const button = document.createElement("button");
      button.className = "save-slot";

      const data = this.readSaveData("save_" + i);

      if (!data) {
        button.textContent = "空白";
        button.disabled = true;
      } else {
        button.innerHTML = `

<div style="font-size:18px;font-weight:bold;">
Save ${i + 1}
</div>

<div style="font-size:15px;margin-top:8px;">
${data.chapter}
</div>

<div style="font-size:14px;">
${data.time}
</div>

<div style="font-size:14px;">
${data.speaker}
</div>

<div style="font-size:12px;margin-top:10px;opacity:.7;">
${data.date}
</div>

`;

        button.onclick = () => {
          this.loadSlot(i);
        };
      }

      this.saveGrid.appendChild(button);
    }
  }

  loadSlot(slot) {
    const data = this.readSaveData("save_" + slot);
    if (!data) return;

    this.index = this.restorePosition(data);
    if (data.state) this.state = data.state;

    this.saveMenu.classList.add("hidden");

    this.resetLayers();
    this.showCurrent();
  }

  showEnding() {
    this.messagePanel.classList.add("is-ending");
    this.speaker.textContent = "END";
    this.message.textContent =
      "土台シナリオの終端です。ここから本編の分岐・演出・戦闘などを追加できます。";
    this.continueLabel.textContent = "";
    this.choices.replaceChildren();
    this.chooseActive = false;
  }
}

/* 新規ファイルを増やさないため、定義テーブルもここから公開しておく
   （シナリオ側や開発時の確認用） */
export { LAYERS, COMMANDS, POSITIONS, ANIMATIONS, EFFECTS, BATTLES, parseCommand, parseDuration };
