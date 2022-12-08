
//basics of how promises work 
new Promise ((resolveOuter)=>{
    console.log("outer")
    new Promise ((resolveInner) =>{
        console.log('inner')

        let time  = () => {
        setTimeout(resolveInner,5000)
        console.log("done")
        }

        time()
        console.log("finished")
    })
})
console.log("_______________________________________________")

//using .then() 

const newPromise = new Promise ((resolve , reject) =>{
setTimeout(() =>{
    resolve("foo")

},3000)
})

newPromise.then((value)=>{
    console.log(value)
    // v
    return value
})
.then((value) =>{
    console.log(value)
    console.log(value + " 1")
    return value
    
})
.then((value) =>{
    console.log(value)
    console.log(value + " 2")
    return value
})
.catch((err) =>{
    console.log("error caught")
    console.log(err)
})

console.log("___________________________")

let see = new Promise ((resolve ,reject ) =>{
    
    setTimeout(resolve(2/0), 1000)
  
})

see.then((value , err)=>{
    console.log("in then")
    console.log(value)
    console.log(err)
    if(err){
        console.log(err)
    }
    else{
        console.log(value)
        return value 
    }
})

console.log("___________________________")

//promise that depends on another 

promise1 = new Promise((resolve,reject)=>{
    resolve ("2")

})
promise2 = promise1.then((value) =>{
    console.log('logger ')
    console.log(value)
})

console.log("___________________________")

// how resolve works 


const a = {
    then (onFullfilled , onReject){
        console.log("here")
        onFullfilled(3)
    }}

let b = Promise.resolve(a)
b.then((value) =>{
    console.log("fullfilled a with 3 !!!")
    console.log(value)
})




//method 1 to handle concurrent tasks
// promises.all


let p1 = Promise.resolve("45")
let p2 = 20
let p3 = new Promise ((resolve , reject) =>{ 
    console.log("!!!!")
    
    setTimeout(()=>{
        resolve("aishwarya")
    },3000, )
})
.then((value) =>{
    console.log("completed p3")
    return value
})

Promise.all([p2,p3,p1,p1]).then((value) => {
    console.log(value)
})

//promise all with 1 rejection

const p = Promise.all([1,2,3])
const newP = Promise.all(["aish" , Promise.resolve(45)])
const P3 =  Promise.all([1,2,3,"ai",Promise.reject("o")])
P3.then((value,err) =>{
    if(err){
        console/log("BOOOOOOO")
        console.log(err)
    }
})
.catch((err) =>{
    console.log("in catch")
})

setTimeout(()=>{
    console.log("*")
    console.log(p)
    console.log(newP)
    console.log(P3)

},3000)

//asynchronity or synchronity of promise.all

let arr = [Promise.resolve(1) ,Promise.resolve("w")]
let res = Promise.all(arr)
console.log(res)
console.log("??")

setTimeout(() =>{
    console.log("see now when the queue is empty")
    console.log(res)
})

let f = Promise.all([])
console.log("::")
console.log(f)


//using then with 2 callbacks
let t = new Promise((resolve,reject) =>{
   throw new Error
})

t.then((value) =>{
console.log(value)
} ,(err) =>{
    console.log("OO")
    console.log(err)
})