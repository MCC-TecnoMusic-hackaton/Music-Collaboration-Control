
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
        WaveSurfer.regions.create()
    ]
});

audioTrack.load("audio/Kendrick Lamar - HUMBLE. (Official Instrumental).mp3");

audioTrack.on('ready', function () {
    console.log("track loaded");

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
function saveRegions() {
    localStorage.regions = JSON.stringify(
        Object.keys(wavesurfer.regions.list).map(function (id) {
            let region = wavesurfer.regions.list[id];
            return {
                start: region.start,
                end: region.end,
                attributes: region.attributes,
                data: region.data
            };
        })
    );
}
function loadRegions(regions) {
    regions.forEach(function (region) {
        region.color = randomColor(0.1);
        wavesurfer.addRegion(region);
    });
}
function randomColor(alpha) {
    return (
        'rgba(' +
        [
            ~~(Math.random() * 255),
            ~~(Math.random() * 255),
            ~~(Math.random() * 255),
            alpha || 1
        ] +
        ')'
    );
}
/*document.querySelector('[data-action="delete-region"]').addEventListener('click', function () {
    let form = document.forms.edit;
    let regionId = form.dataset.region;
    if (regionId) {
        wavesurfer.regions.list[regionId].remove();
        form.reset();
    }
});*/

function enableEditMode() {
    // Get the checkbox
    var checkBox = document.getElementById("edit-mode");
    // If the checkbox is checked,
    if (checkBox.checked == true) {
        audioTrack.enableDragSelection({
            slop: 5,
            color:randomColor(0.6)
        });
        console.log("add comments enabled");
    } else {
        audioTrack.disableDragSelection();
        console.log("add comments disabled");
    }
}