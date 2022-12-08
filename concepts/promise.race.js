const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'one');
  });
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'two');
  });
  
  Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  }).catch((e) =>{console.log(e)})
  // expected output: "two"
  