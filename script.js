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

modals = document.getElementsByClassName("modal");
for (modal of modals) {
	modal.hide = listeners.hide;
	modal.onclick = listeners.hide;
	content = modal.getElementsByClassName("modal-content");
	content = content[0];
	if (content) {
		content.onclick = listeners.absorb;
	}
}
