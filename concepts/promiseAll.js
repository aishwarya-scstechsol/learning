f1 = () =>{
    return new Promise((resolve,reject) =>{
        resolve("sync")
    })
}

f2 = async () =>{
    return await new Promise((resolve,reject) =>{
        resolve("async")
    })
}
//f makes f1 wait for f2 to get excecuted first
f =async () =>{

let b = await f2()
console.log(b)
// b.then((value) =>{ console.log(value)})
let a = f1()
console.log(a)
// a.then((value) =>{ console.log(value)})
}

f()


//using promise.all()

a = () =>{
    let x = Promise.all([f2() ,f1() ,Promise.reject(0)])
    console.log("see")
    x.then((val) =>{console.log(val)}).catch((err) =>{console.log("in catch")})
}

a()


//promise all with many functions

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("one"), 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("two"), 2000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("three"), 3000);
  });
  const p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("four"), 4000);
  });
  const p5 = new Promise((resolve, reject) => {
    reject(new Error("reject"));
  });
  
  // Using .catch:
  Promise.all([p1, p2, p3, p4,p5 ])
    .then((values) => {
      console.log(values);
    })
    .catch((error) => {
      console.error(error.message);
    });
  
  // Logs:
  // "reject"
  const p11 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("p1_delayed_resolution"), 1000);
  });
  
  const p21 = new Promise((resolve, reject) => {
    reject(new Error("p2_immediate_rejection"));
  });
  
  Promise.all([p11.catch((error) => error), p21.catch((error) => error)]).then(
    (values) => {
      console.log(values[0]); // "p1_delayed_resolution"
      console.error(values[1]); // "Error: p2_immediate_rejection"
    }
  );
  