// Bonang Game JavaScript
(function() {
    const bonangGame = (() => {
      const gongs = [
        { id: 1, note: 'C', soundFile: 'gong1.mp3' },
        { id: 2, note: 'D', soundFile: 'gong2.mp3' },
        { id: 3, note: 'E', soundFile: 'gong3.mp3' },
        { id: 4, note: 'F', soundFile: 'gong4.mp3' },
        { id: 5, note: 'G', soundFile: 'gong5.mp3' },
        { id: 6, note: 'A', soundFile: 'gong6.mp3' },
        { id: 7, note: 'B', soundFile: 'gong7.mp3' },
        { id: 8, note: 'C2', soundFile: 'gong8.mp3' },
        { id: 9, note: 'D2', soundFile: 'gong9.mp3' },
        { id: 10, note: 'E2', soundFile: 'gong10.mp3' },
        { id: 11, note: 'F2', soundFile: 'gong11.mp3' },
        { id: 12, note: 'G2', soundFile: 'gong12.mp3' },
        { id: 13, note: 'A2', soundFile: 'gong13.mp3' },
        { id: 14, note: 'B2', soundFile: 'gong14.mp3' }
      ];
  
      function playSound(soundFile) {
        const audio = new Audio(`sounds/${soundFile}`);
        audio.play().catch(error => console.error('Error playing sound:', error));
      }
  
      function handleGongClick(gong) {
        playSound(gong.soundFile);
      }
  
      function createUI() {
        const gameContainer = document.getElementById('bonang-game-container');
        if (!gameContainer) return; // Exit if the container doesn't exist yet
  
        const upperRow = document.createElement('div');
        upperRow.className = 'gong-row upper-row';
        const lowerRow = document.createElement('div');
        lowerRow.className = 'gong-row lower-row';
  
        gongs.forEach((gong, index) => {
          const gongButton = document.createElement('button');
          gongButton.className = 'gong-button';
          gongButton.style.backgroundImage = `url('images/gong.png')`;
          gongButton.setAttribute('aria-label', `Play ${gong.note} note`);
          gongButton.onclick = () => handleGongClick(gong);
  
          if (index < 7) {
            upperRow.appendChild(gongButton);
          } else {
            lowerRow.appendChild(gongButton);
          }
        });
  
        gameContainer.appendChild(upperRow);
        gameContainer.appendChild(lowerRow);
      }
  
      return {
        init: function() {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createUI);
          } else {
            createUI();
          }
        }
      };
    })();
  
    // Initialize the game
    bonangGame.init();
  })();
