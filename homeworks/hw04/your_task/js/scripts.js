const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    fetch(`${baseURL}?type=track&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                document.querySelector('#tracks').innerHTML = `
                    No tracks have been returned for this query.
                `;
            }
            else {
                let numTracksReturned = Math.min(5, data.length);
                let tracks = "";
                for (let i = 0; i < numTracksReturned; i++) {
                    tracks += `
                        <button class="track-item preview" data-preview-track="${data[i].preview_url}" onclick="handleTrackClick(event);">
                            <img src="${data[i].album.image_url}" alt="Photo of Album Cover for ${data[i].album.name}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h2>${data[i].name}</h2>
                                <p>
                                    ${data[i].artist.name}
                                </p>
                            </div>
                        </button>
                    `;
                }
                document.querySelector('#tracks').innerHTML = tracks;
            }
        });
};

const getAlbums = (term) => {
    fetch(`${baseURL}?type=album&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                document.querySelector('#albums').innerHTML = `
                    No albums have been returned for this query.
                `;
            }
            else {
                let numTracksReturned = data.length;
                let albums = "";
                for (let i = 0; i < numTracksReturned; i++) {
                    albums += `
                        <section class="album-card" id="${data[i].id}">
                            <div>
                                <img src="${data[i].image_url}" alt="Photo of Album Cover for ${data[i].name}">
                                <h2>${data[i].name}</h2>
                                <div class="footer">
                                    <a href="${data[i].spotify_url}" target="_blank">
                                        view on spotify
                                    </a>
                                </div>
                            </div>
                        </section>
                    `;
                }
                document.querySelector('#albums').innerHTML = albums;
            }
        });
};

const getArtist = (term) => {
    fetch(`${baseURL}?type=artist&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                document.querySelector('#artist').innerHTML = `
                    No artist has been returned for this query.
                `;
            }
            else {
                let artist = data[0];
                document.querySelector('#artist').innerHTML = `
                    <section class="artist-card" id="${artist.id}">
                        <div>
                            <img src="${artist.image_url}" alt="Photo of ${artist.name}">
                            <h2>${artist.name}</h2>
                            <div class="footer">
                                <a href="${artist.spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>
                `;
            }
        });
};

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
    document.querySelector('#current-track').innerHTML = `
        <img src="${ev.currentTarget.querySelector('img').getAttribute('src')}" alt="${ev.currentTarget.querySelector('img').getAttribute('alt')}">
        <i class="fas play-track fa-pause" aria-hidden="true"></i>
        <div class="label">
            <h2>${ev.currentTarget.querySelector('h2').innerHTML}</h2>
            <p>
                ${ev.currentTarget.querySelector('p').innerHTML}
            </p>
        </div>
    `;
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};