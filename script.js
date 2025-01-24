// Elemen DOM
const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.btn.play');
const previousButton = document.querySelector('.btn.previous');
const nextButton = document.querySelector('.btn.next');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');

// Daftar lagu
const playlist = [
  { title: "Mean It", artist: "Lauv (Featuring LANY)", src: "assets/music/Mean It.mp4" },
  { title: "Hanya Untukmu", artist: "RAN", src: "assets/music/Hanya Untukmu.mp4" },
  { title: "California", artist: "Rich Brian, Warren Hue, & NIKI", src: "assets/music/California.mp4" }
];

let currentIndex = 0; // Indeks lagu yang sedang diputar

// Fungsi untuk memuat lagu
const loadSong = (index) => {
  const song = playlist[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
};

// Fungsi Play/Pause
const togglePlay = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.textContent = '⏸'; // Ikon pause
  } else {
    audioPlayer.pause();
    playButton.textContent = '▶'; // Ikon play
  }
};

// Fungsi Next
const playNext = () => {
  currentIndex = (currentIndex + 1) % playlist.length; // Pindah ke lagu berikutnya (loop)
  loadSong(currentIndex);
  audioPlayer.play();
  playButton.textContent = '⏸'; // Ubah ikon menjadi pause
};

// Fungsi Previous
const playPrevious = () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length; // Pindah ke lagu sebelumnya (loop)
  loadSong(currentIndex);
  audioPlayer.play();
  playButton.textContent = '⏸'; // Ubah ikon menjadi pause
};

// Event Listener
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
previousButton.addEventListener('click', playPrevious);

// Muat lagu pertama saat halaman dimuat
window.onload = () => {
  loadSong(currentIndex);
};
