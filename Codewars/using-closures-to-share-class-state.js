// Let's make a Cat constructor!
var Cat = (function () {
    let n = 0;
    let sum = 0;
    return function Cat(name, weight) {
      if (!name || !weight) throw new Error();
      this.name = name;
  //     this.weight = weight;
      
      n += 1;
      sum += weight;
      
      Cat.averageWeight = function() {
        return sum / n;
      }
  
      Object.defineProperty(this, "weight", {
        get: function() {
          return weight;
        },
        set: function(val) {
          sum -= this.weight;
          this.weight = val;
          sum += this.weight;
        }
      });
    };
  }());
  
  let a = new Cat('yo', 20);
  console.log(a);