function getComponent(){
	return import(/* webpackChunkName: "lodash" */"lodash").then(_=>{
		var element = document.createElement("div");
		element.innerHTML = _.join(["Hello", "webpack"], " ");
		return element;
	}).catch(error=>"An error occurred");
}

getComponent().then(component=>{
	document.body.appendChild(component);
	console.log("hello");
})