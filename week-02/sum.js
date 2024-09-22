// input ary: 使用 forEach 方法來計算陣列中的總和
function sum_ary_forEach(ary) {
  let result = 0;

  ary.forEach((num) => {
    result += num;
  });

  return result;
}

// input ary: 使用 reduce 方法來計算陣列中的總和
function sum_ary_reduce(ary) {
  return ary.reduce((a, b) => a + b);
}

// input n: 使用公式解計算 1 + 2 + 3 + ... + n
function sum_n_formula(n) {
  return (n * (n + 1)) / 2;
}

// input n: 利用陣列的 forEach 方法來計算總和
function sum_n_forEach(n) {
  let result = 0;

  new Array(n).fill(0).forEach((_, idx) => {
    result += idx + 1;
  });

  return result;
}

// input n: 根據輸入的值生成同樣長度的陣列，再使用 map 來計算總和
function sum_n_map(n) {
  let ary = new Array(n).fill(0);
  let result = 0;

  // 初始的陣列為 [0, 0, 0, ..., 0]
  ary = ary.map((_, idx) => {
    // 累加陣列中的每一項，例如第二項為 0 + 1 = 1，第三項為 0 + 1 + 2 = 3
    result += idx;
    // 在每一項中再加上 idx + 1，讓每一項都變成該項值的累加總和
    return result + idx + 1;
  });

  // 累加過後的陣列其最後一項即為 1 + ... + n 的總和
  return ary.pop();
}

console.log(sum_ary_forEach([1, 5, 3, 2]));
console.log(sum_ary_reduce([1, 5, 3, 2]));
console.log(sum_n_formula(100));
console.log(sum_n_forEach(100));
console.log(sum_n_map(100));
