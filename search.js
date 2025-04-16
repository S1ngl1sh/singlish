document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Данные для поиска
    const artists = [
        {
            name: 'Ivoxygen',
            genre: 'Alternative Rock',
            songs: 3,
            image: 'https://raw.githubusercontent.com/S1ngl1sh/singlish/main/Images/IVOXYGEN%20Cover%20Art.jpg',
            link: 'tasks.html',
            type: 'artist'
        }
    ];

    const songs = [
        {
            name: 'Skin',
            artist: 'Ivoxygen',
            duration: '3:45',
            image: 'https://raw.githubusercontent.com/S1ngl1sh/singlish/main/Images/Skin.jpg',
            link: 'player.html?song=skin',
            type: 'song'
        },
        {
            name: 'Muddy Shoes',
            artist: 'Ivoxygen',
            duration: '3:12',
            image: 'https://raw.githubusercontent.com/S1ngl1sh/singlish/main/Images/6752f97a8e5104ff05081bb32290dfd8.jpg',
            link: 'player.html?song=muddy-shoes',
            type: 'song'
        },
        {
            name: 'Lifestyle',
            artist: 'Ivoxygen',
            duration: '3:58',
            image: 'https://raw.githubusercontent.com/S1ngl1sh/singlish/main/Images/Lifestyle.jpg',
            link: 'player.html?song=lifestyle',
            type: 'song'
        }
    ];

    if (searchInput && searchResults) {
        // Обработчик ввода текста
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 0) {
                const results = searchAll(searchTerm);
                displayResults(results);
            } else {
                searchResults.style.display = 'none';
            }
        });

        // Закрытие результатов при клике вне поиска
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    function searchAll(term) {
        const allResults = [...artists, ...songs];
        return allResults.filter(item => 
            item.name.toLowerCase().includes(term) || 
            (item.type === 'artist' && item.genre.toLowerCase().includes(term)) ||
            (item.type === 'song' && item.artist.toLowerCase().includes(term))
        );
    }

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => {
                const imgClass = result.type === 'song' ? 'song-img' : '';
                const subtitle = result.type === 'artist' 
                    ? `${result.genre} • ${result.songs} songs`
                    : `${result.artist} • ${result.duration}`;

                return `
                    <div class="search-result-item" onclick="window.location.href='${result.link}'">
                        <img src="${result.image}" alt="${result.name}" class="${imgClass}">
                        <div class="content">
                            <h3>${result.name}</h3>
                            <p>${subtitle}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        searchResults.style.display = 'block';
    }
}); 