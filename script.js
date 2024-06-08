document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const agePopup = document.getElementById('age-popup');
    const overlay = this.documentElement('overlay');

    const ageConfirmation = localStorage.getItem('ageConfirmation');
    if (!ageConfirmation) {
        agePopup.style.display = 'block';
        overlay.style.display = 'block';
    }

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query !== '') {
            // Hier könntest du eine AJAX-Anfrage an einen Server senden, um die Suchergebnisse zu erhalten
            // Für diese Beispielanwendung fügen wir nur ein Dummy-Ergebnis ein
            showSearchResults([{ name: 'Mojito' }, { name: 'Piña Colada' }]);
        }
    });

    function showSearchResults(results) {
        searchResults.innerHTML = ''; // Leert die vorherigen Suchergebnisse

        if (results.length === 0) {
            searchResults.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
        } else {
            results.forEach(function(result) {
                const resultElement = document.createElement('div');
                resultElement.classList.add('search-result');
                resultElement.textContent = result.name;
                searchResults.appendChild(resultElement);
            });
        }
    }

    function handleYes() {
        agePopup.style.display = 'none';
        overlay.style.display = 'none';
        localStorage.setItem('ageConfirmation', true);
    }

    function handleNo() {
        alert('Du musst mindestens 18 Jahre alt sein, um diese Seite zu besuchen.');
        window.close(); // Schließt das aktuelle Browserfenster
    }
});
