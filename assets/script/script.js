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

let currentSongIndex = 0;

const progressBar = document.getElementById("progress-bar");
const music = $(".music-playing-content h2");
const singer = $(".music-playing-content p");
const dvd = $(".dvd");
const audio = $("audio");

const toggleBtn = $(".circle");
const playBtn = $(".circle .play-button");
const pauseBtn = $(".circle .pause-button");

const shuffleBtn = $(".shuffle-button");
let isShuffle = false;
const repeatBtn = $(".repeat-button");
let isRepeat = false;

const musicListIsPlaying = () => {
  const musicLists = $$(".music-list");

  musicLists.forEach((musicList, index) => {
    musicList.classList.toggle("is-playing", index === currentSongIndex);
  });
};

const chooseMusic = () => {
  const musicLists = $$(".music-list");

  musicLists.forEach((musicList, index) => {
    musicList.addEventListener("click", () => {
      loadCurrentSong(index);
    });
  });
};

const renderMusic = () => {
  const html = $(".music-lists");

  html.innerHTML = musics.reduce((acc, music) => {
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
  }, "");

  musicListIsPlaying();
  chooseMusic();
  return html;
};

const progressBarHandle = () => {
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    let percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, violet ${percentage}%, whitesmoke ${percentage}%)`;
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

let isPlaying = false;

const playing = () => {
  isPlaying = false;
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";

  pauseBtn.style.color = "whitesmoke";
  toggleBtn.style.border = "2px solid whitesmoke";

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

// Playing next song
audio.addEventListener("ended", () => {
  if (isRepeat == false && isShuffle == false) {
    loadCurrentSong(++currentSongIndex);
    audio.play();
  }
});

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
      isPlaying = true;

      playBtn.style.color = "whitesmoke";
      pauseBtn.style.color = "violet";
      toggleBtn.style.border = "2px solid violet";
    }
  });
};

const loadCurrentSong = (i) => {
  progressBar.style.background = "whitesmoke";
  currentSongIndex = i;
  music.innerText = musics[i].name;
  singer.innerText = musics[i].singer;
  dvd.style.background = `url('${musics[i].image}') no-repeat center/cover`;
  audio.src = `${musics[i].song}`;

  musicListIsPlaying();
};

const nextSong = () => {
  const nextBtn = $(".next-button");
  nextBtn.addEventListener("click", () => {
    if (currentSongIndex < musics.length - 1) {
      loadCurrentSong(++currentSongIndex);
    } else {
      currentSongIndex = 0;
      loadCurrentSong(currentSongIndex);
    }
    animation.cancel();
    pausing();
  });
};

const prevSong = () => {
  const prevBtn = $(".prev-button");
  prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
      loadCurrentSong(--currentSongIndex);
    } else {
      currentSongIndex = musics.length - 1;
      loadCurrentSong(currentSongIndex);
    }
    animation.cancel();
      pausing();
  });
};

const getRandomNumberExpectCurrent = () => {
  if (musics.length <= 1) {
    return currentSongIndex;
  }

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * musics.length);
  } while (randomNumber === currentSongIndex);

  return randomNumber;
};

let shuffleEndedHandler = null;

const shuffling = () => {
  if (shuffleEndedHandler) {
    audio.removeEventListener("ended", shuffleEndedHandler);
  }

  shuffleEndedHandler = () => {
    const newIndex = getRandomNumberExpectCurrent();
    currentSongIndex = newIndex;
    loadCurrentSong(newIndex);
    audio.currentTime = 0;
    audio.play();
  };

  audio.addEventListener("ended", shuffleEndedHandler);
};

const shuffleHandle = () => {
  shuffleBtn.addEventListener("click", () => {
    if (isShuffle) {
      isShuffle = false;
      shuffleBtn.style.color = "whitesmoke";
      if (shuffleEndedHandler) {
        audio.removeEventListener("ended", shuffleEndedHandler);
        shuffleEndedHandler = null;
      }
    } else {
      if (isRepeat) {
        isRepeat = false;
        repeatBtn.style.color = "whitesmoke";
        audio.removeEventListener("ended", repeatEndedHandler);
      }
      isShuffle = true;
      shuffleBtn.style.color = "violet";
      shuffling();
    }
  });
};

let repeatEndedHandler = null;

const repeating = () => {
  if (repeatEndedHandler) {
    audio.removeEventListener("ended", repeatEndedHandler);
  }

  repeatEndedHandler = () => {
    audio.currentTime = 0;
    audio.play();
  };
  audio.addEventListener("ended", repeatEndedHandler);
};

const repeatHandle = () => {
  repeatBtn.addEventListener("click", () => {
    if (isRepeat) {
      isRepeat = false;
      repeatBtn.style.color = "whitesmoke";
      if (repeatEndedHandler) {
        audio.removeEventListener("ended", repeatEndedHandler);
        repeatEndedHandler = null;
      }
    } else {
      if (isShuffle) {
        isShuffle = false;
        shuffleBtn.style.color = "whitesmoke";
        audio.removeEventListener("ended", shuffleEndedHandler);
      }
      isRepeat = true;
      repeatBtn.style.color = "violet";
      repeating();
    }
  });
};

const btnHandle = () => {
  playPauseHandle();
  nextSong();
  prevSong();
  shuffleHandle();
  repeatHandle();
};

const start = () => {
  renderMusic();
  loadCurrentSong(currentSongIndex);
  progressBarHandle();
  scrollHandle();
  btnHandle();
};

start();
