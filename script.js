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

	$(".projectcard").each(function(i, p) {
		switch (p.getAttribute("source")) {
			case "github":
				var user = p.getAttribute("user") || "tgrehawi";
				var repo = p.getAttribute("repo");
				var lang = p.getAttribute("lang") || "";
				var thumb = p.getAttribute("thumb");
				thumb = thumb ?
				`<div id="thumb">
					<video autoplay loop muted>
						<source src="${thumb}" type="video/mp4">
					</video>
				</div>`
				|| "" : "";
				p.innerHTML = `
				<div id="header">
					<div id="lang">${lang}</div>
					<div id="title">${repo}</div>
				</div>
				<div id="links">
					<a target="_blank" href="http://github.com/${user}/${repo}/">
							<i class="fa fa-github-alt fa-lg" aria-label="github page"> </i>${user}/${repo}
					</a>
				</div>
				${thumb}
				<p>${p.innerHTML}</p>`
				break;
		}
	});

	// headerTop = $("#header").offset().top;
	//
	// $(window).scroll(function() {
	// 	var header = $("#header");
	// 	var top = $(this).scrollTop();
	// 	if (top > headerTop)
	// 		header.css("top", top - headerTop);
	// 	else
	// 		header.css("top", 0);
	// });

});
