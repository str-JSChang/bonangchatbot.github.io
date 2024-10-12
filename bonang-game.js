(function() {
  const bonangGame = (() => {
    const gongs = [
      { id: 1, note: '4.', soundFile: 'gong1.mp3' },
      { id: 2, note: '6.', soundFile: 'gong2.mp3' },
      { id: 3, note: '5.', soundFile: 'gong3.mp3' },
      { id: 4, note: '3.', soundFile: 'gong4.mp3' },
      { id: 5, note: '2.', soundFile: 'gong5.mp3' },
      { id: 6, note: '7.', soundFile: 'gong6.mp3' },
      { id: 7, note: '1..', soundFile: 'gong7.mp3' },
      { id: 8, note: '1.', soundFile: 'gong8.mp3' },
      { id: 9, note: '7', soundFile: 'gong9.mp3' },
      { id: 10, note: '2', soundFile: 'gong10.mp3' },
      { id: 11, note: '3', soundFile: 'gong11.mp3' },
      { id: 12, note: '5', soundFile: 'gong12.mp3' },
      { id: 13, note: '6', soundFile: 'gong13.mp3' },
      { id: 14, note: '4', soundFile: 'gong14.mp3' }
    ];

    const audioCache = {};
    let hitCount = 0;
    
    const popupImages = [
      { src: 'images/popup1.png', },
      { src: 'images/popup2.png', },
      { src: 'images/popup3.png', },
      { src: 'images/popup4.png', },
      { src: 'images/popup5.png', },
      { src: 'images/popup6.png', },
      { src: 'images/popup7.png', },
      { src: 'images/popup8.png', },
      { src: 'images/popup9.png', },
      { src: 'images/popup10.png', }
    ];


    
    function preloadAudio() {
      console.log('Starting audio preload...');
      return Promise.all(gongs.map(gong => {
        return new Promise((resolve, reject) => {
          const audio = new Audio(`sounds/${gong.soundFile}`);
          audio.addEventListener('canplaythrough', () => {
            audioCache[gong.soundFile] = audio;
            console.log(`Loaded: ${gong.soundFile}`);
            resolve();
          }, { once: true });
          audio.addEventListener('error', (e) => {
            console.error(`Error loading ${gong.soundFile}:`, e);
            reject(e);
          });
          audio.load();
        });
      })).then(() => {
        console.log('All audio preloaded successfully');
      }).catch(error => {
        console.error('Error during audio preload:', error);
      });
    }

    function playSound(soundFile) {
      console.log(`Attempting to play: ${soundFile}`);
      if (audioCache[soundFile]) {
        audioCache[soundFile].currentTime = 0;
        audioCache[soundFile].play().then(() => {
          console.log(`Playing ${soundFile}`);
        }).catch(error => {
          console.error(`Error playing ${soundFile}:`, error);
          fallbackPlaySound(soundFile);
        });
      } else {
        console.warn(`Audio not in cache: ${soundFile}. Trying fallback.`);
        fallbackPlaySound(soundFile);
      }
    }

    function fallbackPlaySound(soundFile) {
      const audio = new Audio(`sounds/${soundFile}`);
      audio.play().then(() => {
        console.log(`Fallback playing ${soundFile}`);
      }).catch(error => {
        console.error(`Fallback failed for ${soundFile}:`, error);
      });
    }

    function handleGongClick(gong) {
      console.log(`Gong clicked: ${gong.note}`);
      playSound(gong.soundFile);
      hitCount++;
      if (hitCount === 10) {
        showRandomPopup();
        hitCount = 0;
      }
    }

    function showRandomPopup() {
      const popup = document.getElementById('popup');
      const popupImage = document.getElementById('popupImage');
      const popupText = document.getElementById('popupText');
      
      const randomPopup = popupImages[Math.floor(Math.random() * popupImages.length)];
      
      popupImage.src = randomPopup.src;
      popupText.textContent = randomPopup.text;
      
      popup.style.display = 'block';
      
      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000); // Hide popup 
    }

    function createUI() {
      const gameContainer = document.getElementById('bonang-game-container');
      if (!gameContainer) {
        console.error('Game container not found');
        return;
      }
    
      function showRandomPopup() {
        popup.classList.add('show');
        
        setTimeout(() => {
          popup.classList.remove('show');
        }, 3000);
      }

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

        const textLabel = document.createElement('span');
        textLabel.className = 'gong-label';
        textLabel.textContent = gong.note;
        gongButton.appendChild(textLabel);

        if (index < 7) {
          upperRow.appendChild(gongButton);
        } else {
          lowerRow.appendChild(gongButton);
        }
      });

      gameContainer.appendChild(upperRow);
      gameContainer.appendChild(lowerRow);
      console.log('UI created successfully');
    }

    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.display = 'none';
    popup.innerHTML = `
      <img id="popupImage" src="" alt="Popup Image">
      <p id="popupText"></p>
    `;
    document.body.appendChild(popup);
    

    return {
      init: function() {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM content loaded');
            createUI();
            preloadAudio();
            // initNavbarAutoHide();
          });
        } else {
          console.log('DOM already loaded');
          createUI();
          preloadAudio();
          // initNavbarAutoHide();
        }
      }
    };
  })();


  bonangGame.init();
})();
