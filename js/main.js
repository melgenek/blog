// http://stackoverflow.com/a/8024509/1848454
window.onload = function () {
    const codeBlocks = document.querySelectorAll('pre.shiki code');
    codeBlocks.forEach(function (el) {
        el.addEventListener("dblclick", function () {
            if (window.getSelection && document.createRange) {
                // IE 9 and non-IE
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.body.createTextRange) {
                // IE < 9
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.select();
            }
            document.execCommand("copy");
        });
    });


    document.querySelectorAll("article h2, article h3, article h4, article h5, article h6").forEach(header => {
        header.addEventListener("click", () => {
            const text = header.textContent.trim();
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
            header.id = id;

            // Update the URL hash
            window.location.hash = id;
        });
    });
};
