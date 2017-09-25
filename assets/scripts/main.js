// import _ from "lodash";
import {cube} from "./greeter.js";
// import "../styles/main.css";

function component (){
	var element = document.createElement("div");
	var btn = document.createElement("button");
	element.innerHTML = _.join(["hello", " webpack"], "");
	btn.innerHTML = "click me and check the console."+cube(5);
	// btn.onclick = printMe;

	element.appendChild(btn);
	return element;
}

document.body.appendChild(component());

