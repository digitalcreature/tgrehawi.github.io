$(document).ready(function() {
	var hljs = window.hljs;
	var md = window.markdownit({
		breaks: true
	});
	var content = window.location.search.slice(1).split("&")[0];
	$.get(content+".md", function(data, status) {
		if (status == "success") {
			$("div.content").html(md.render(data));
			hljs.initHighlighting();
		}
	}, "text");
});
