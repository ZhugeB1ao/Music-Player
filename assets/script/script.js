var musics = [
  {
    name: "Từng ngày yêu em",
    singer: "Bùi Trường Linh",
    duration: "4:17",
    image: "../assets/image/image1.webp",
    song: "../assets/music/song1.mp3",
  },
  {
    name: "Lạnh thôi đừng mưa",
    singer: "Hải Sâm",
    duration: "4:17",
    image: "../assets/image/image2.webp",
    song: "../assets/music/song2.mp3",
  },
  {
    name: "Phù du",
    singer: "Dalab",
    duration: "4:04",
    image: "../assets/image/image3.webp",
    song: "../assets/music/song3.mp3",
  },
  {
    name: "E là không thể",
    singer: "Anh Quân Idol",
    duration: "5:09",
    image: "../assets/image/image4.webp",
    song: "../assets/music/song4.mp3",
  },
  {
    name: "Nơi này có anh",
    singer: "Sơn Tùng M-TP",
    duration: "4:20",
    image: "../assets/image/image5.webp",
    song: "../assets/music/song5.mp3",
  },
  {
    name: "Anh đau từ lúc em đi",
    singer: "Trần Mạnh cường",
    duration: "6:13",
    image: "../assets/image/image6.webp",
    song: "../assets/music/song6.mp3",
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let firstSongIndex = 0;

const progressBar = document.getElementById("progress-bar");
const music = $(".music-playing-content h2");
const singer = $(".music-playing-content p");
const dvd = $(".dvd");
const audio = $("audio");

const toggleBtn = $(".circle");
const playBtn = $(".circle .play-button");
const pauseBtn = $(".circle .pause-button");

const renderMusic = () => {
  const html = $(".music-lists");

  return (html.innerHTML = musics.reduce((acc, music) => {
    return (
      acc +
      `<li class="music-list">
            <div class="circle" style="background: url(${music.image})no-repeat center/cover;">
            </div>
            <div class="music-content">
                <h4>${music.name}</h4>
                <p>${music.singer}</p>
            </div>
            <div class="music-duration">
                <p>${music.duration}</p>
            </div>
        </li>`
    );
  }, ""));
};

// const loadFirstSong = () => {
//   music.innerText = musics[firstSongIndex].name;
//   singer.innerText = musics[firstSongIndex].singer;
//   dvd.style.background = `url('${musics[firstSongIndex].image}') no-repeat center/cover`;
//   audio.src = `${musics[firstSongIndex].song}`;
// };

const progressBarHandle = () => {
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    let percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, grey ${percentage}%, whitesmoke ${percentage}%)`;
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });
};

const scrollHandle = () => {
  const scroll = $("section");
  const dvd = $(".dvd-content");
  const dvdW = dvd.offsetWidth;

  scroll.addEventListener("scroll", () => {
    const scrollValue = scroll.scrollTop;
    const result = dvdW - scrollValue;

    dvd.style.width = result > 0 ? result + "px" : "0px";
    dvd.style.opacity = result / dvdW;
  });
};

const dvdRotate = () => {
  return dvd.animate([{ transform: "rotate(360deg)" }], {
    duration: 30000,
    iterations: Infinity,
  });
};

const animation = dvdRotate();

const playing = () => {
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
  audio.pause();

  animation.pause();
};

const pausing = () => {
  pauseBtn.style.display = "block";
  playBtn.style.display = "none";
  audio.play();

  setTimeout(() => {
    animation.play();
  }, 500);
};

const playPauseHandle = () => {
  animation.pause();

  toggleBtn.addEventListener("click", () => {
    if (playBtn.style.display === "none") {
      playing();
    } else {
      pauseBtn.style.display = "block";
      playBtn.style.display = "none";
      audio.play();
      animation.play();
    }
  });
};

const loadCurrentSong = (i) => {
  music.innerText = musics[i].name;
  singer.innerText = musics[i].singer;
  dvd.style.background = `url('${musics[i].image}') no-repeat center/cover`;
  audio.src = `${musics[i].song}`;
};
console.log(musics.length);

const nextSong = () => {
  const nextBtn = $(".next-button");
  nextBtn.addEventListener("click", () => {
    if (firstSongIndex < musics.length - 1) {
      loadCurrentSong(++firstSongIndex);
      animation.cancel();
      pausing();
    } else {
      firstSongIndex = 0;
      loadCurrentSong(firstSongIndex);
      animation.cancel();
      pausing();
    }
  });
};

const prevSong = () => {
  const prevBtn = $(".prev-button");
  prevBtn.addEventListener("click", () => {
    if (firstSongIndex > 0) {
      loadCurrentSong(--firstSongIndex);
      animation.cancel();
      pausing();
    } else {
      firstSongIndex = musics.length - 1;
      loadCurrentSong(firstSongIndex);
      animation.cancel();
      pausing();
    }
  });
};

const btnHandle = () => {
  playPauseHandle();
  nextSong();
  prevSong();
};

const start = () => {
  renderMusic();
  loadCurrentSong(firstSongIndex);
  progressBarHandle();
  scrollHandle();
  btnHandle();
};

start();
