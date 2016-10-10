activemodal = null;

function showmodal(modalid) {
	if (activemodal) activemodal.style.display = "none";
	activemodal = document.getElementById(modalid);
	activemodal.style.display = "block";
}

listeners = {
	hide: function() {
		this.style.display = "none";
		if (activemodal == this) activemodal = null;
	},
	absorb: function(event) {
		event.stopPropagation();
	},
};

document.onkeydown = function (event) {
	if (event.keyCode == 27) {	//escape
		if (activemodal) {
			activemodal.hide();
		}
	}
}

window.onload = function() {
	var modals = document.getElementsByClassName("modal");
	for (modal of modals) {
		modal.hide = listeners.hide;
		modal.onclick = listeners.hide;
		content = modal.getElementsByClassName("modal-content");
		content = content[0];
		if (content) {
			content.onclick = listeners.absorb;
		}
	}

	var projects = document.getElementsByClassName("project");
	for (p of projects) {
		console.log(p);
		switch (p.getAttribute("source")) {
			case "github":
				(function(p) {
					var user = p.getAttribute("user") || "tgrehawi";
					var repo = p.getAttribute("repo");
					var req = new XMLHttpRequest();
					req.open("GET", `https://api.github.com/repos/${user}/${repo}`, true);
					req.onreadystatechange = function () {
		        		if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
		            	p.innerHTML = repo;
		        		}
	    			};
					req.send();
				})(p);
				break;
		}
	}
}
// function createRequest() {
//   var result = null;
//   if (window.XMLHttpRequest) {
//     result = new XMLHttpRequest();
//   }
//   else if (window.ActiveXObject) {
//     result = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   return result;
// }
//
// req = createRequest();
//
// req.onreadystatechange = function() {
//   if (req.readyState != 4) return; // Not there yet
//   if (req.status != 200) {
//     // Handle request failure here...
//     return;
//   }
//   // Request successful, read the response
//  console.log(req.responseText);
//   // ... and use it as needed by your app.
// }
//
// req.open("GET", "https://api.github.com/repos/tgrehawi/ccalc", true);
// req.send();
