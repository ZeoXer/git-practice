// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from "./stack.js";

let stack = new Stack();
// 確認 stack 的私有屬性
console.log(stack.items);
stack.print();

stack.push(5);
stack.push(8);
stack.print();

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？

// 測試 push 是否可以排除非數字的輸入
stack.push("hello");
stack.push(true);
stack.push({ name: "Andrew" });
stack.push([1, 2, 3]);
stack.push(10);
stack.print();
console.log("isEmpty:", stack.isEmpty());

// 測試 peek 是否可以回傳 stack 頂部的元素
stack.peek();

// 測試 pop 是否可以移除並回傳 stack 頂部的元素
console.log("pop element:", stack.pop());

// 測試 isEmpty 是否可以檢查 stack 為空的狀況
console.log("stack size:", stack.size());

// 測試 clear 是否可以清除 stack，並檢驗 isEmpty 是否可以正確回傳
stack.clear();
console.log("isEmpty:", stack.isEmpty());

// 測試在空 stack 中執行 pop 是否會回傳錯誤
console.log(stack.pop());
