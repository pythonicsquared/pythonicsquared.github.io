document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.site-tagline');
    const items = document.querySelectorAll('.site-tagline-item');

    function showRandomTagline() {
        // Hide all
        items.forEach(el => el.style.display = 'none');
        // Pick a random index
        const index = Math.floor(Math.random() * items.length);
        // Show that tagline
        items[index].style.display = 'block';
        container.style.display = 'block';
    }

    // Initial display
    showRandomTagline();
    setInterval(showRandomTagline, 10000);
});
