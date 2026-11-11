// The journal: each picture arrives above the text (the frame's mount) and is moved under the heading it belongs to.
// Without this script the pictures stay at the top, and their tables are at the foot of the page either way.
// incident.journalist@web-summit.dinis, 11 November 2026.
(function () {
    var figs = document.querySelectorAll('.jr-figs .jr-fig')
    for (var i = 0; i < figs.length; i++) {
        var f = figs[i], piece = document.getElementById(f.getAttribute('data-piece')), want = f.getAttribute('data-after'), at = null
        if (!piece) continue
        if (!want) at = piece
        else for (var n = piece.nextElementSibling; n; n = n.nextElementSibling) if (/^H[1-6]$/.test(n.tagName) && n.id === want) { at = n; break }
        while (at && at.nextElementSibling && at.nextElementSibling.classList.contains('jr-fig')) at = at.nextElementSibling   // keep the pictures in their order
        if (at) at.parentNode.insertBefore(f, at.nextSibling)
    }
    var box = document.querySelector('.jr-figs'); if (box && !box.children.length) box.parentNode.parentNode.remove()
})()
