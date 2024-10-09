// Bonang Game JavaScript
(function() {
  const bonangGame = (() => {
    const gongs = [
      { id: 1, note: 'C', soundFile: 'gong1.MP3' },
      { id: 2, note: 'D', soundFile: 'gong2.MP3' },
      { id: 3, note: 'E', soundFile: 'gong3.MP3' },
      { id: 4, note: 'F', soundFile: 'gong4.MP3' },
      { id: 5, note: 'G', soundFile: 'gong5.MP3' },
      { id: 6, note: 'A', soundFile: 'gong6.MP3' },
      { id: 7, note: 'B', soundFile: 'gong7.MP3' },
      { id: 8, note: 'C2', soundFile: 'gong8.MP3' },
      { id: 9, note: 'D2', soundFile: 'gong9.MP3' },
      { id: 10, note: 'E2', soundFile: 'gong10.MP3' },
      { id: 11, note: 'F2', soundFile: 'gong11.MP3' },
      { id: 12, note: 'G2', soundFile: 'gong12.MP3' },
      { id: 13, note: 'A2', soundFile: 'gong13.MP3' },
      { id: 14, note: 'B2', soundFile: 'gong14.MP3' }
    ];

    const audioCache = {};

    function preloadAudio() {
      gongs.forEach(gong => {
        const audio = new Audio(`sounds/${gong.soundFile}`);
        audio.preload = 'auto';
        audio.load();
        audioCache[gong.soundFile] = audio;

        audio.onerror = function() {
          console.error(`Error loading audio file: ${gong.soundFile}`);
        };
      });
    }

    function playSound(soundFile) {
      if (audioCache[soundFile]) {
        audioCache[soundFile].currentTime = 0;
        audioCache[soundFile].play().catch(error => {
          console.error(`Error playing sound ${soundFile}:`, error);
        });
      } else {
        console.error(`Audio file not loaded: ${soundFile}`);
      }
    }

    function handleGongClick(gong) {
      playSound(gong.soundFile);
    }

    // ... rest of your code (createUI function, etc.) ...

    return {
      init: function() {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            createUI();
            preloadAudio();
          });
        } else {
          createUI();
          preloadAudio();
        }
      }
    };
  })();

  // Initialize the game
  bonangGame.init();
})();
