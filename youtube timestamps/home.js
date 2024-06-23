function processInput() {
    const videoUrl = document.getElementById('videoUrl').value;
    const timestampText = document.getElementById('timestamps').value;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert('Invalid YouTube URL');
        return;
    }

    const timestamps = parseTimestamps(timestampText);

    // Store video ID and timestamps in sessionStorage
    sessionStorage.setItem('videoId', videoId);
    sessionStorage.setItem('timestamps', JSON.stringify(timestamps));

    // Redirect to the viewer page
    window.location.href = 'viewer.html';
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function parseTimestamps(text) {
    return text.split('\n').map(line => {
        const [time, description] = line.split(' - ');
        return { time: time.trim(), description: description.trim() };
    });
}
