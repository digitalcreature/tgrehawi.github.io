activemodal = null;

function showmodal(modalid) {
	if (activemodal) activemodal.style.display = "none";
	activemodal = document.getElementById(modalid);
	activemodal.style.display = "block";
}

$(document).ready(function() {


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

	$(".modal").each(function(_, modal) {
		modal.hide = listeners.hide;
		modal.onclick = listeners.hide;
	});
	$(".modal .modal-content").click(listeners.absorb);

	$(".project").each(function(_, p) {
		switch (p.getAttribute("source")) {
			case "github":
				var user = p.getAttribute("user") || "tgrehawi";
				var repo = p.getAttribute("repo");
				var lang = p.getAttribute("lang") || "";
				var thumb = p.getAttribute("thumb");
				thumb = thumb ?
				`<div class="imgcontainer" id="thumb"><img src="${thumb}" alt="${repo}"></div>` || "" : "";
				p.innerHTML =
				`<span id="lang">${lang}</span>
				<span id="title">${repo}</span>
				<span>
					<a target="_blank" href="http://github.com/${user}/${repo}/">github:${user}/${repo}.git</a>
				</span>
				${thumb}
				<p>${p.innerHTML}</p>`
				break;
		}
	});
});
