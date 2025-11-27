// OMDb API Configuration
const API_KEY = '79dce510'; // Reemplaza con tu API key de http://www.omdbapi.com/apikey.aspx
const API_URL = 'http://www.omdbapi.com/';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const typeFilter = document.getElementById('typeFilter');
const yearFilter = document.getElementById('yearFilter');
const resultsContainer = document.getElementById('results');
const loadingElement = document.getElementById('loading');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const modalPoster = document.getElementById('modalPoster');

// Event Listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Search Function
async function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        showError('Por favor, ingresa un término de búsqueda');
        return;
    }

    showLoading(true);
    resultsContainer.innerHTML = '';

    try {
        const params = new URLSearchParams({
            apikey: API_KEY,
            s: query,
        });

        // Add optional filters
        if (typeFilter.value) {
            params.append('type', typeFilter.value);
        }
        if (yearFilter.value) {
            params.append('y', yearFilter.value);
        }

        const response = await fetch(`${API_URL}?${params}`);
        const data = await response.json();

        showLoading(false);

        if (data.Response === 'True') {
            displayResults(data.Search);
        } else {
            showNoResults(data.Error);
        }
    } catch (error) {
        showLoading(false);
        showError('Error al conectar con la API. Verifica tu conexión.');
        console.error('Error:', error);
    }
}

// Display Results
function displayResults(movies) {
    resultsContainer.innerHTML = '';

    movies.forEach((movie, index) => {
        const movieCard = createMovieCard(movie, index);
        resultsContainer.appendChild(movieCard);
    });
}

// Create Movie Card
function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/1e293b/6366f1?text=No+Poster';

    card.innerHTML = `
        <img src="${posterUrl}" alt="${movie.Title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>
            <div class="movie-meta">
                <span class="movie-year">${movie.Year}</span>
                <span class="movie-type">${getTypeLabel(movie.Type)}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => showMovieDetails(movie.imdbID));

    return card;
}

// Get Type Label in Spanish
function getTypeLabel(type) {
    const labels = {
        'movie': 'Película',
        'series': 'Serie',
        'episode': 'Episodio'
    };
    return labels[type] || type;
}

// Show Movie Details
async function showMovieDetails(imdbID) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            displayMovieDetails(movie);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        showError('Error al cargar los detalles de la película');
    }
}

// Display Movie Details in Modal
function displayMovieDetails(movie) {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/900x400/1e293b/6366f1?text=No+Poster';
    modalPoster.src = posterUrl;
    modalPoster.alt = movie.Title;

    const rating = movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A';
    const ratingClass = parseFloat(rating) >= 7 ? 'rating' : 'rating';

    modalBody.innerHTML = `
        <h2 class="modal-title">${movie.Title}</h2>
        
        <div class="modal-meta">
            <div class="meta-item">
                <span class="meta-label">Año:</span>
                <span>${movie.Year}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Duración:</span>
                <span>${movie.Runtime !== 'N/A' ? movie.Runtime : 'Desconocida'}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Clasificación:</span>
                <span>${movie.Rated !== 'N/A' ? movie.Rated : 'N/A'}</span>
            </div>
            ${rating !== 'N/A' ? `
                <div class="meta-item">
                    <span class="${ratingClass}">⭐ ${rating}/10</span>
                </div>
            ` : ''}
        </div>

        ${movie.Plot !== 'N/A' ? `
            <div class="plot">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">Sinopsis:</strong>
                ${movie.Plot}
            </div>
        ` : ''}

        <div class="detail-grid">
            ${movie.Director !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Director</div>
                    <div class="detail-value">${movie.Director}</div>
                </div>
            ` : ''}
            
            ${movie.Actors !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Actores</div>
                    <div class="detail-value">${movie.Actors}</div>
                </div>
            ` : ''}
            
            ${movie.Genre !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Género</div>
                    <div class="detail-value">${movie.Genre}</div>
                </div>
            ` : ''}
            
            ${movie.Language !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Idioma</div>
                    <div class="detail-value">${movie.Language}</div>
                </div>
            ` : ''}
            
            ${movie.Country !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">País</div>
                    <div class="detail-value">${movie.Country}</div>
                </div>
            ` : ''}
            
            ${movie.Awards !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Premios</div>
                    <div class="detail-value">${movie.Awards}</div>
                </div>
            ` : ''}

            ${movie.BoxOffice !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Taquilla</div>
                    <div class="detail-value">${movie.BoxOffice}</div>
                </div>
            ` : ''}

            ${movie.imdbVotes !== 'N/A' ? `
                <div class="detail-item">
                    <div class="detail-label">Votos IMDb</div>
                    <div class="detail-value">${movie.imdbVotes}</div>
                </div>
            ` : ''}
        </div>

        ${movie.Ratings && movie.Ratings.length > 0 ? `
            <div style="margin-top: 2rem;">
                <div class="detail-label" style="margin-bottom: 1rem;">Calificaciones</div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${movie.Ratings.map(rating => `
                        <div style="padding: 0.75rem 1.25rem; background: rgba(99, 102, 241, 0.2); border: 1px solid var(--primary-color); border-radius: 12px;">
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.25rem;">${rating.Source}</div>
                            <div style="font-weight: 700; color: var(--text-primary);">${rating.Value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show Loading
function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
}

// Show No Results
function showNoResults(message) {
    resultsContainer.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
            <div class="no-results-icon">🎬</div>
            <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No se encontraron resultados</h3>
            <p style="color: var(--text-muted);">${message || 'Intenta con otro término de búsqueda'}</p>
        </div>
    `;
}

// Show Error
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
            <div class="no-results-icon">⚠️</div>
            <h3 style="color: var(--warning-color); margin-bottom: 0.5rem;">Error</h3>
            <p style="color: var(--text-muted);">${message}</p>
        </div>
    `;
}

// Initial message
resultsContainer.innerHTML = `
    <div class="no-results" style="grid-column: 1 / -1;">
        <div class="no-results-icon">🔍</div>
        <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Comienza tu búsqueda</h3>
        <p style="color: var(--text-muted);">Busca tus películas y series favoritas</p>
    </div>
`;
