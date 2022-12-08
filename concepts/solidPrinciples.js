class Shapes {
    constructor(l,b) {
      this.length = l;
      this.breadth = b ; 
    }
    area() {
        let area = this.length*this.breadth
        console.log("area is" )
      return area
    }
  }
  
  class Rectangle extends Shapes {
    constructor(l,b ) {
      super(l,b);
      this.length = l
      this.breadth = b 
      
    }
    calc() {
      return this.area()
    }
  }
  
  let areaOfRect = new Rectangle(2,3);
  console.log(areaOfRect.calc())


  class Square extends Rectangle{
    constructor(l,b){
        super(l,b);
      this.length = l
      this.breadth = b 
    }
    calculate() {
        return this.calc()
      }
  }
let areaOfSq = new Square (90,90)
console.log(areaOfSq.calculate())


//this method violates linkovs subs principle as 