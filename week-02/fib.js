function fib_1(n) {
  if (n <= 1) {
    return n;
  }

  return fib_1(n - 1) + fib_1(n - 2);
}

function fib_2(n) {
  const fibArr = [];

  for (let i = 0; i <= n; i++) {
    if (i === 0) {
      fibArr.push(0);
    } else if (i === 1) {
      fibArr.push(1);
    } else {
      fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
    }
  }

  return fibArr[n];
}

function test_fib(name, ary, fib) {
  console.time(name);
  ary.map((value) => fib(value));
  console.timeEnd(name);
}

test_fib("fib_1_warmup", [1, 5, 10], fib_1);
test_fib("fib_2_warmup", [1, 5, 10], fib_2);

test_fib("fib_1", [1, 5, 10], fib_1);
test_fib("fib_1", [1, 5, 10, 15, 20], fib_1);
test_fib("fib_1", [1, 5, 10, 15, 20, 25, 30], fib_1);
test_fib("fib_1", [1, 5, 10, 15, 20, 25, 30, 35, 40], fib_1);
test_fib("fib_2", [1, 5, 10], fib_2);
test_fib("fib_2", [1, 5, 10, 15, 20], fib_2);
test_fib("fib_2", [1, 5, 10, 15, 20, 25, 30], fib_2);
test_fib("fib_2", [1, 5, 10, 15, 20, 25, 30, 35, 40], fib_2);

// 透過簡單的測試後，發現 fib_2 的效能和 fib_1 相比，在 input 的 n 值越大時，運算時間的差距會越大
