
function showmodal(modalid) {
	modal = document.getElementById(modalid);
	modal.style.display = "block";
	return false;
}



listeners = {
	hide: function() {
		this.style.display = "none";
	},
	absorb: function(event) {
		event.stopPropagation();
	},
};

modals = document.getElementsByClassName("modal");
for (modal of modals) {
	modal.onclick = listeners.hide;
	content = modal.getElementsByClassName("modal-content");
	content = content[0];
	if (content) {
		content.onclick = listeners.absorb;
	}
}
