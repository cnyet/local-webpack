import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Holder from "holderjs";
import "@/statics/styles/main.scss";
import "./index.scss";

let result = [1, 2, 3 ].map(n => {return n*2;});
console.log(result);
Holder.run({
  domain: "example.com",
  themes: {
    "simple": {
      bg: "#0F92D9",
      fg: "#fff",
      size: 10,
      font: "Monaco",
      fontweight: "normal"
    }
  },
  images: "#myImg"
});
