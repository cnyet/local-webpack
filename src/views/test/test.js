var a={
  name: "hello",
  func1: function(){
    console.log(this.name);
  },
  func2: function(){
    setTimeout(function(){
      this.func1();
    }, 1000);
  }
};
a.func2();
