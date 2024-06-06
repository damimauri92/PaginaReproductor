document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    const links = document.querySelectorAll('a');
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    const audios = document.querySelectorAll('audio');
    const videos = document.querySelectorAll('video');
    const playPauseButton = document.getElementById('playPauseButton');
    const audioElement = document.getElementById('audioElement');
    const videoElement = document.getElementById('videoElement');

    function showToast(message, icon) {
        toast.innerHTML = `<img src="${icon}" alt="icon"> ${message}`;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    function updatePageStatus(online) {
        links.forEach(link => link.style.pointerEvents = online ? 'auto' : 'none');
        submitButtons.forEach(button => button.disabled = !online);
        playPauseButton.disabled = !online;

        if (!online) {
            audios.forEach(audio => {
                audio.pause();
                audio.removeAttribute('controls');
            });
            videos.forEach(video => {
                video.pause();
                video.removeAttribute('controls');
            });
            playPauseButton.textContent = 'Play'; // Reset button text
        } else {
            audios.forEach(audio => audio.setAttribute('controls', 'controls'));
            videos.forEach(video => video.setAttribute('controls', 'controls'));
        }
    }

    function handleConnectionChange() {
        if (navigator.onLine) {
            showToast('Conexión restaurada', 'online-icon.png');
            updatePageStatus(true);
        } else {
            showToast('Conexión perdida', 'offline-icon.png');
            updatePageStatus(false);
        }
    }

    function togglePlayPause() {
        if (audioElement.paused && videoElement.paused) {
            audioElement.play();
            videoElement.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioElement.pause();
            videoElement.pause();
            playPauseButton.textContent = 'Play';
        }
    }

    playPauseButton.addEventListener('click', togglePlayPause);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    handleConnectionChange();
});
