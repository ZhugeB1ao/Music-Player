var music = [
  {
    name: "Từng ngày yêu em",
    author: "Bùi Trường Linh",
    duration: "4:17",
    image: "../assets/image/image1.webp",
    song: "../assets/music/song1.mp3",
  },
  {
    name: "Lạnh thôi đừng mưa",
    author: "Hải Sâm",
    duration: "4:17",
    image: "../assets/image/image2.webp",
    song: "../assets/music/song3.mp3",
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audioPlayer = $("#audio-player");
const playButton = $(".play-button");
const progressBar = $("#progress-bar");
const dvd = $(".dvd");

let isPlaying = false;
let currentAngle = 0;

function getComputedAngle(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform === "none") return 0;

  const values = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

function toggleRotation() {
  if (isPlaying) {
    dvd.style.transform = `rotate(${currentAngle}deg)`;
    dvd.style.animationPlayState = "paused";
  } else {
    dvd.style.setProperty("--start-angle", `${currentAngle}deg`);
    dvd.style.animationPlayState = "running";
  }
  isPlaying = !isPlaying;
}

audioPlayer.addEventListener("loadedmetadata", () => {
  progressBar.max = Math.floor(audioPlayer.duration);
});

playButton.addEventListener("click", () => {
  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play();
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
    currentAngle = getComputedAngle(dvd);
    toggleRotation();
  } else {
    audioPlayer.pause();
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
    currentAngle = getComputedAngle(dvd);
    toggleRotation();
  }
});

progressBar.addEventListener("input", (event) => {
  audioPlayer.currentTime = event.target.value;
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audioPlayer.currentTime);
});
