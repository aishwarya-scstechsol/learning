const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve ,reject) => setTimeout(reject, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise3, promise2,];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"
