const audio = document.getElementById('audio');
        const playButton = document.getElementById('play-button');
        const pauseButton = document.getElementById('pause-button');
        const nextButton = document.getElementById('next-button');
        const jumpButton = document.getElementById('jump-button');
        const progressBar = document.getElementById('progress-bar');
        const scrubberBar = document.getElementById('scrubber-bar');
        const playlist = document.getElementById('playlist');
        let currentTrackIndex = 0;
        let playbackPosition = 0;
        function playTrack(trackIndex) {
            const trackElement = playlist.children[trackIndex];
            const trackSrc = trackElement.getAttribute('data-src');
            audio.src = trackSrc;
            audio.currentTime = playbackPosition; // Set the playback position
            audio.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
            nextButton.style.display = 'inline-block';
            jumpButton.style.display = 'inline-block';
            currentTrackIndex = trackIndex;
        }
        function playNextTrack() {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.children.length;
            playbackPosition = 0; // Reset the playback position when changing tracks
            playTrack(currentTrackIndex);
        }
        playButton.addEventListener('click', () => {
            playTrack(currentTrackIndex);
        });
        pauseButton.addEventListener('click', () => {
            audio.pause();
            playbackPosition = audio.currentTime; // Save the playback position
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
            nextButton.style.display = 'inline-block';
            jumpButton.style.display = 'inline-block';
        });
        nextButton.addEventListener('click', () => {
            playNextTrack();
        });
        jumpButton.addEventListener('click', () => {
            audio.src = playlist.children[2].getAttribute('data-src'); // Jump to track 3
            audio.currentTime = 5 * 60; // 5 minutes in seconds
            audio.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
            nextButton.style.display = 'inline-block';
            jumpButton.style.display = 'inline-block';
            currentTrackIndex = 2; // Set the current track index to track 3
        });
        audio.addEventListener('timeupdate', () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const progress = (currentTime / duration) * 100;
            progressBar.style.width = progress + '%';
        });
        scrubberBar.addEventListener('click', (e) => {
            const scrubberBarRect = scrubberBar.getBoundingClientRect();
            const clickX = e.clientX - scrubberBarRect.left;
            const scrubberBarWidth = scrubberBarRect.width;
            const seekTime = (clickX / scrubberBarWidth) * audio.duration;
            audio.currentTime = seekTime;
        });
        audio.addEventListener('ended', () => {
            playNextTrack();
        });
        // Add click event listeners to the playlist items
        const playlistItems = Array.from(playlist.children);
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                playbackPosition = 0; // Reset the playback position when selecting a new track
                playTrack(index);
            });
        });