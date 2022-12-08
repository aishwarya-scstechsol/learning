voting = (age) =>{
let eligibility = new Promise((resolve , reject) =>{
    if(age>=18){
        resolve ("eligible to vote")
    }
    else{
        reject ("not eligible to vote")
    }
})
return eligibility
}

let eligibility = voting(2)
eligibility.then((val)=>console.log(val)).catch((e) =>console.log(e)).finally(() => console.log("completed"))