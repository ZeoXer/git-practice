// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
  // TODO: # 有特別的意思嗎？請以註解回覆。
  // # 修飾符是在 ES2022 中新增的語法，代表該屬性為私有屬性，
  // 只能在 class 內部取用，外部則無法存取 (會呈現出 undefined)。
  // 而在此處使用私有屬性的原因在於我們希望使用者只能使用底下所設計的方法來操作 stack，
  // 以維持堆疊的正常運作，避免使用者直接對堆疊進行任意的修改。
  #items;

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素 i
  push(element) {
    // TODO
    if (typeof element !== "number") {
      console.error("Element must be a number");
      return;
    }

    this.#items.unshift(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
    // TODO
    if (this.isEmpty()) {
      console.error("Stack is empty");
      return null;
    }

    return this.#items.shift();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    // TODO
    return this.#items[0];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    // TODO
    return this.#items.length === 0;
  }

  // 回傳 stack 中元素的個數
  size() {
    // TODO
    return this.#items.length;
  }

  // 清空 stack
  clear() {
    // TODO
    this.#items = [];
  }

  // 印出 stack 內容（可選）
  print() {
    // TODO
    console.log("Current stack:\n");
    this.#items.forEach((item) => {
      console.log(`│${item.toString().padStart(2, " ")}│`);
    });
    console.log("└──┘");
  }
}
