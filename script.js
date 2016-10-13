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
				<div id="header" class="bg">
					<div id="lang">${lang}</div>
					<div id="title">${repo}</div>
				</div>
				<div id="body" class="bg">
					<div id="links">
						<a target="_blank" href="http://github.com/${user}/${repo}/">
								<i class="fa fa-github-alt fa-lg" aria-label="github page"> </i>${user}/${repo}
						</a>
					</div>
					${thumb}
					<p>${p.innerHTML}</p>
				</div>`
				break;
		}
	});

	$("#main > #header #menu").html($("#main > #header #links").html());

	var $menu = $("#main > #header #menu").first();
	var menuopen = false;
	var fullmenuheight = (96 * 6);
	var menuheight = fullmenuheight;

	function openmenu() {
		$menu.css("max-height", menuheight + "px");
		menuopen = true;
	}

	function closemenu() {
		$menu.css("max-height", 0);
		menuopen = false;
	}

	togglemenu = function() {
		if (menuopen) {
			closemenu();
		}
		else {
			openmenu();
		}
	}

	$(window).resize(function() {
		var h= $(window).height();
		if (fullmenuheight > h) {
			menuheight = h;
		}
		else {
			menuheight = fullmenuheight;
		}
		if ($menu.css("max-height") != "0px") {
			$menu.css("max-height", menuheight+"px");
		}

	});

	// openmenu();

});
