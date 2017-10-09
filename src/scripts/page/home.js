import _ from "lodash";

var ele = document.createElement("h1");
ele.innerHTML = _.join(["home", " webpack"], "");
document.body.appendChild(ele);