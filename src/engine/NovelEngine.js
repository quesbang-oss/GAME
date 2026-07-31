/*
 * NovelEngine
 * ノベルパートの進行・分岐・立ち絵演出を管理するコアエンジン。
 *
 * 追加機能（このバージョンで実装）:
 *  - ラベル分岐: シナリオノードに `id` を付けておくと、選択肢の `next` に
 *    番号の代わりに文字列ラベルを指定してジャンプできる（配列の順番を
 *    変えても壊れにくくするため）。
 *  - キャラクター立ち絵: ノードに `sprites` 配列を書くと、指定した位置に
 *    キャラクターの立ち絵（画像未指定の間は名前だけのプレースホルダー枠）
 *    を表示・退場できる。位置は POSITIONS で一括管理しているので、
 *    レイアウト調整はそこを触るだけでよい。
 *  - 登場・退場・強調アニメーション: sprites の `anim` / `effect` で
 *    横からのフェードイン・フェードアウトなどの演出を指定できる。
 *    利用できる名前は ANIMATIONS を参照。
 *  - エンディングノード: `ending: true` を持つノードに到達すると、
 *    そこで進行が止まり、専用の見た目でルート終了を表示する。
 */

// 立ち絵の水平位置プリセット（%指定）。位置を増やしたり微調整したい
// ときはこのオブジェクトだけを編集すればよい。
const POSITIONS = {
  left: "12%",
  centerLeft: "32%",
  center: "50%",
  centerRight: "68%",
  right: "88%"
};

// シナリオ側から `anim` / `effect` として指定できるアニメーション名。
// CSS側（style.css）に対応する @keyframes を用意してある。
const ANIMATIONS = {
  enter: ["slideInLeft", "slideInRight", "fadeIn", "riseIn", "popIn"],
  exit: ["slideOutLeft", "slideOutRight", "fadeOut"],
  effect: ["glow", "shake"]
};

const DEFAULT_ENTER_ANIM = "fadeIn";
const DEFAULT_EXIT_ANIM = "fadeOut";
const EXIT_ANIM_DURATION = 520;

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

    // id -> 配列インデックス のマップ。ラベルジャンプ用。
    this.labelIndex = new Map();
    this.scenario.forEach((node, i) => {
      if (node.id) this.labelIndex.set(node.id, i);
    });

    // sprite id -> DOM要素。現在ステージに出ているキャラクターの管理台帳。
    this.spriteEls = new Map();

    this.renderShell();
this.bindEvents();
this.bindSaveSystem();
  }

  renderShell() {
    this.root.innerHTML = `
      <main class="game">
        <section class="stage" aria-label="ゲーム画面">
          <div class="background" id="background"></div>
          <div class="sprite-layer" id="spriteLayer"></div>
          <div class="overlay"></div>
          <div class="topbar">
            <span id="chapter"></span>
            <span id="clock"></span>
          </div>
          <div class="status" id="status"></div>

          <div class="message-panel" id="messagePanel">
            <div class="speaker" id="speaker"></div>
            <div class="message" id="message"></div>
            <div class="continue" id="continue">クリック / Enter で進む</div>
          </div>

          <div class="choices" id="choices"></div>
        </section>
      </main>
    `;

    this.background = this.root.querySelector("#background");
    this.spriteLayer = this.root.querySelector("#spriteLayer");
    this.chapter = this.root.querySelector("#chapter");
    this.clock = this.root.querySelector("#clock");
    this.status = this.root.querySelector("#status");
    this.messagePanel = this.root.querySelector("#messagePanel");
    this.speaker = this.root.querySelector("#speaker");
    this.message = this.root.querySelector("#message");
    this.continueLabel = this.root.querySelector("#continue");
    this.choices = this.root.querySelector("#choices");
  }

  bindEvents() {
    this.root.addEventListener("click", (event) => {
      if (event.target.closest(".choice")) return;
      this.next();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.next();
      }
    });
  }

  start() {
    this.index = 0;
    this.spriteEls.forEach((el) => el.remove());
    this.spriteEls.clear();
    this.showCurrent();
  }

  // ラベル文字列 or 数値インデックスを、実際の配列インデックスに解決する。
  resolveIndex(target) {
    if (typeof target === "string") {
      const resolved = this.labelIndex.get(target);
      if (resolved === undefined) {
        console.warn(`[NovelEngine] 未定義のラベルです: "${target}"`);
        return this.index;
      }
      return resolved;
    }
    return target;
  }

  next() {
    const current = this.scenario[this.index];
    if (!current) return;

    // 選択肢待ち、またはエンディング到達中はクリックでは進めない。
    if (current.choices?.length) return;
    if (current.ending) return;

    this.index += 1;
    if (this.index >= this.scenario.length) {
      this.showEnding();
      return;
    }
    this.showCurrent();
  }

  showCurrent() {
    const node = this.scenario[this.index];
    if (!node) {
      this.showEnding();
      return;
    }

    this.chapter.textContent = node.chapter ?? "序章";
    this.clock.textContent = node.time ?? "";
    this.background.dataset.scene = node.background ?? "default";

    if (node.setFlags) {
      Object.assign(this.state.flags, node.setFlags);
    }

    if (node.setState) {
      Object.assign(this.state, node.setState);
    }

    this.applySprites(node);

    this.status.textContent = node.status ?? "";
    this.speaker.textContent = node.speaker ?? "";
    this.message.textContent = node.text ?? "";

    this.messagePanel.classList.toggle("is-ending", Boolean(node.ending));
    this.continueLabel.textContent = node.ending
      ? "―― ルート終了 ――"
      : "クリック / Enter で進む";

    this.choices.replaceChildren();

    if (node.choices?.length) {
      for (const choice of node.choices) {
        const button = document.createElement("button");
        button.className = "choice";
        button.type = "button";
        button.textContent = choice.label;
        button.addEventListener("click", () => this.selectChoice(choice));
        this.choices.appendChild(button);
      }
    }
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

    if (choice.next !== undefined) {
      this.index = this.resolveIndex(choice.next);
      this.showCurrent();
      return;
    }

    this.next();
  }

  // ノードの `sprites` 定義を読み取り、立ち絵の登場・退場・更新を行う。
  //
  // 1件あたりの書式:
  //   {
  //     id: "ally",              // 必須。ステージ上での管理キー
  //     name: "アリー",           // プレースホルダーに出す名前
  //     position: "right",       // POSITIONS のキー（省略時 center）
  //     action: "enter" | "exit" | 省略,
  //     anim: "slideInRight",    // 登場/退場アニメーション名（省略時は既定値）
  //     effect: "glow" | "shake",// 既にいるキャラへのワンポイント演出
  //     image: "/path/to.png"    // 将来、立ち絵画像を用意したら指定するだけでよい
  //   }
  applySprites(node) {
    const specs = node.sprites ?? [];

    for (const spec of specs) {
      const { id, name, position = "center", action, anim, effect, image } = spec;
      if (!id) continue;

      let el = this.spriteEls.get(id);

      if (action === "exit") {
        if (el) {
          const outAnim = anim && ANIMATIONS.exit.includes(anim) ? anim : DEFAULT_EXIT_ANIM;
          el.style.animation = `${outAnim} ${EXIT_ANIM_DURATION}ms ease forwards`;
          const target = el;
          setTimeout(() => target.remove(), EXIT_ANIM_DURATION);
          this.spriteEls.delete(id);
        }
        continue;
      }

      if (!el) {
        el = document.createElement("div");
        el.className = "sprite";
        el.dataset.id = id;
        el.innerHTML = `<span class="sprite-label">${name ?? id}</span>`;
        this.spriteLayer.appendChild(el);
        this.spriteEls.set(id, el);

        const inAnim = anim && ANIMATIONS.enter.includes(anim) ? anim : DEFAULT_ENTER_ANIM;
        el.style.animation = `${inAnim} 620ms ease forwards`;
      } else if (anim) {
        // 既に登場済みのキャラに再度アニメーションを指定した場合
        // （位置移動や強い感情表現の演出などに使う）。
        el.style.animation = "none";
        void el.offsetWidth; // reflow でアニメーションを再トリガー
        el.style.animation = `${anim} 500ms ease`;
      }

      el.style.setProperty("--sprite-x", POSITIONS[position] ?? POSITIONS.center);

      if (image) {
        el.style.backgroundImage = `url(${image})`;
        el.classList.add("sprite--has-image");
      }

      if (effect === "glow") {
        el.classList.add("sprite--glow");
      } else if (effect === "shake") {
        el.classList.remove("sprite--shake");
        void el.offsetWidth;
        el.classList.add("sprite--shake");
      }
    }

    // 現在の発話者に対応する立ち絵をハイライトする（簡易な話者強調）。
    for (const [, el] of this.spriteEls) {
      const label = el.querySelector(".sprite-label")?.textContent;
      const isSpeaking = Boolean(node.speaker) && label === node.speaker;
      el.classList.toggle("sprite--speaking", isSpeaking);
    }
  }
bindSaveSystem() {
  window.addEventListener("keydown", (e) => {

    if (e.key === "s" || e.key === "S") {
      e.preventDefault();
      this.saveGame();
    }

    if (e.key === "l" || e.key === "L") {
      e.preventDefault();
      this.loadGame();
    }

  });
}

saveGame() {

  const data = {

    index: this.index,

    state: this.state

  };

  localStorage.setItem(
    "novelSave",
    JSON.stringify(data)
  );

  alert("セーブしました");
}

loadGame() {

  const raw = localStorage.getItem("novelSave");

  if (!raw) {
    alert("セーブデータがありません");
    return;
  }

  const data = JSON.parse(raw);

  this.index = data.index;
  this.state = data.state;

  this.showCurrent();

  alert("ロードしました");
}
  showEnding() {
    this.messagePanel.classList.add("is-ending");
    this.speaker.textContent = "END";
    this.message.textContent =
      "土台シナリオの終端です。ここから本編の分岐・演出・戦闘などを追加できます。";
    this.continueLabel.textContent = "";
    this.choices.replaceChildren();
  }
}
