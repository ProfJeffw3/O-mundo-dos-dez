document.addEventListener('DOMContentLoaded', () => {
    const backgroundAudio = document.getElementById('background-audio');

    // Play background audio on load
    playAudio(backgroundAudio);
});

function playAudio(audioElement) {
    audioElement.play().catch(error => {
        console.log('Playback prevented:', error);
        // Add a listener to play audio on user interaction
        document.body.addEventListener('click', () => {
            audioElement.play().catch(err => console.log('Playback prevented again:', err));
        }, { once: true });
    });
}
