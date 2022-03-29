
var audioTrack = WaveSurfer.create({
    container: ".audio",
    backend: 'MediaElement',
    normalize: true,
    minimap: true,
    waveColor: "black",
    progressColor: "cyan",
    cursorColor: 'red',
    cursorWidth: 3,
    barGap: 3,
    plugins: [
        WaveSurfer.cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': 'blue',
                color: '#fff',
                padding: '2px',
                'font-size': '10px',
                'border-radius': ' 10px'
            }
        }),
        WaveSurfer.timeline.create({
            container: ".audio-timeline"
        }),
        WaveSurfer.playhead.create({
            returnOnPause: true,
            moveOnSeek: true,
            draw: true
        }),
        WaveSurfer.regions.create({
            regionsMinLength: 2,
            regions: [

            ],
            dragSelection: {
                slop: 0
            }
        })
    ]
});

audioTrack.load("audio/Kendrick Lamar - HUMBLE. (Official Instrumental).mp3");

audioTrack.on('ready', function () {
    console.log("track loaded")
});
const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const pauseBtn = document.querySelector(".pause-btn");
const volumeSlider = document.querySelector(".volume-slider");
const muteBtn = document.querySelector(".mute-btn")
const zoomSlider = document.querySelector(".zoom-slider");
playBtn.addEventListener("click", function () {
    audioTrack.playPause();
    if (audioTrack.isPlaying()) {
        playBtn.classList.add("playing");
    } else {
        playBtn.classList.remove("playing");
    }
});
stopBtn.addEventListener("click", function () {
    audioTrack.stop();
    playBtn.classList.remove("playing");

});
volumeSlider.addEventListener("input", function () {
    changeVolume(volumeSlider.value);
});
zoomSlider.oninput = function () {
    audioTrack.zoom(Number(zoomSlider.value));
};
muteBtn.addEventListener("click", () => {
    if (muteBtn.classList.contains("muted")) {
        muteBtn.classList.remove("muted");
        audioTrack.setVolume(0.7);
        volumeSlider.value = 0.7;
    } else {
        audioTrack.setVolume(0);
        muteBtn.classList.add("muted");
        volumeSlider.value = 0;
    }
});
const changeVolume = (volume) => {
    audioTrack.setVolume(volume);
    if (volume < 0.01)
        muteBtn.classList.add("muted");
    else
        muteBtn.classList.remove("muted")


};
