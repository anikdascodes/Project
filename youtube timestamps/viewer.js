let player;
let timestamps = [];

function onYouTubeIframeAPIReady() {
    const videoId = sessionStorage.getItem('videoId');
    if (videoId) {
        createPlayer(videoId);
    }

    timestamps = JSON.parse(sessionStorage.getItem('timestamps')) || [];
    displayTimestamps();
}

function createPlayer(videoId) {
    player = new YT.Player('videoPlayer', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
}

function displayTimestamps() {
    const list = document.getElementById('timestampList');
    list.innerHTML = '';
    timestamps.forEach(stamp => {
        const li = document.createElement('li');
        li.textContent = `${stamp.time} - ${stamp.description}`;
        li.onclick = () => jumpToTimestamp(stamp.time);
        list.appendChild(li);
    });
}

function jumpToTimestamp(time) {
    const seconds = convertToSeconds(time);
    player.seekTo(seconds, true);
}

function convertToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
}
