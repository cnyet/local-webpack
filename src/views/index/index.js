import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Holder from "holderjs";
import "./index.css";

let result = [1, 2, 3].map(n => {n*2});
console.log(result);
const myImg = document.getElementById("myImg");
console.log("ok");
Holder.run({
  images: myImg
});

