// Elemen DOM
const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.btn.play');
const previousButton = document.querySelector('.btn.previous');
const nextButton = document.querySelector('.btn.next');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');

// Daftar lagu
const playlist = [
  { title: "Mean It", artist: "Lauv (Featuring LANY)", src: "assets/music/Mean It.mp4", cover: "assets/images/album1.jpeg"},
  { title: "Hanya Untukmu", artist: "RAN", src: "assets/music/Hanya Untukmu.mp4", cover: "assets/images/album5.jpeg" },
  { title: "California", artist: "Rich Brian, Warren Hue, & NIKI", src: "assets/music/California.mp4", cover: "assets/images/album6.jpeg" }
];

let currentIndex = 0; // Indeks lagu yang sedang diputar

const albumCover = document.querySelector('.album-cover');

// Fungsi untuk memuat lagu
const loadSong = (index) => {
  const song = playlist[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  // Ganti album cover
  albumCover.src = song.cover;

  // Reset progress bar
  progressFill.style.width = '0%';
  currentTimeDisplay.textContent = '0:00';

  // Tunggu metadata untuk memuat durasi
  audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
  });
};

// Fungsi format waktu
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Update progress bar
const updateProgress = () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  // Perbarui waktu saat ini
  currentTimeDisplay.textContent = formatTime(currentTime);

  // Perbarui lebar progress bar
  const progressPercent = (currentTime / duration) * 100;
  progressFill.style.width = `${progressPercent}%`;
};

// Seek audio ketika progress bar diklik
const seekAudio = (event) => {
  const progressWidth = progressBar.offsetWidth;
  const clickX = event.offsetX;
  const duration = audioPlayer.duration;

  // Hitung posisi waktu baru berdasarkan klik
  audioPlayer.currentTime = (clickX / progressWidth) * duration;
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
  currentIndex = (currentIndex + 1) % playlist.length; // Loop ke awal jika di akhir playlist
  loadSong(currentIndex);
  audioPlayer.play();
  playButton.textContent = '⏸';
};

// Fungsi Previous
const playPrevious = () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length; // Loop ke akhir jika di awal playlist
  loadSong(currentIndex);
  audioPlayer.play();
  playButton.textContent = '⏸';
};

// Event Listener
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
previousButton.addEventListener('click', playPrevious);
audioPlayer.addEventListener('timeupdate', updateProgress); // Perbarui progress bar saat waktu berjalan

// Muat lagu pertama
window.onload = () => {
  loadSong(currentIndex);
};