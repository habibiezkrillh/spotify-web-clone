// Spotify Clone - Player Interaction
const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.btn.play');
const progressBar = document.querySelector('.progress-fill');
const currentTimeElem = document.querySelector('.current-time');
const durationElem = document.querySelector('.duration');

// Format waktu (mm:ss)
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Update progress bar dan waktu
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
});

// Play/Pause lagu
playButton.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.textContent = '⏸'; // Ikon pause
  } else {
    audioPlayer.pause();
    playButton.textContent = '▶'; // Ikon play
  }
});

// Load metadata (durasi)
audioPlayer.addEventListener('loadedmetadata', () => {
  durationElem.textContent = formatTime(audioPlayer.duration);
});
