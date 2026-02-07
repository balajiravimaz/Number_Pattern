// ---------- setting start ---------------
var _preloadData, _pageData;
var _pagePreloadArray = {
  image: 1,
  audio: 1,
  video: 1,
  data: -1,
}; // item not availble please assign value 1.
var jsonSRC = "pages/module_1/page_5/data/m1_p5_data.json?v=";
_pageAudioSync = true;
_forceNavigation = false;
_audioRequired = false;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;
_globalCicked = 0;
_currentAudio = null;
_isPlayed = false;
_checkAudioFlag = false;
_tweenTimeline = null;
_popTweenTimeline = null;
var lastPatternId = null;

var _audioIndex = 0;
_videoId = null;
_audioId = null;
// ---------- setting end ---------------
var sectionCnt = 0;
var totalSection = 0;
var prevSectionCnt = -1;
var sectionTopPos = [];
var playMainAudio = false;
// ------------------ common function start ------------------------------------------------------------------------
$(document).ready(function () {
  //console.log('Page ready')
  _preloadData = new PagePreload();
  _preloadData.initObj(_pagePreloadArray, jsonSRC);
  _preloadData.addCustomEvent("ready", _pageLoaded);
  //console.log('Page ready 1', _preloadData)
});

function _pageLoaded() {
  //console.log('_pageLoaded')
  _pageData = _preloadData.jsonData;
  if (_audioRequired) {
    _audioId = _pageData.mainAudio.audioSRC;
    _audioIndex = _pageData.mainAudio.audioIndex;
  }

  if (_videoRequired) _videoId = "courseVideo";

  //addSlideData();
  console.log(_pageData.sections, _pageData.sections[0].backBtnSrc, "pageDAtat")
  addSectionData();
  appState.pageCount = _controller.pageCnt - 1;
  $("#f_header").css({ backgroundImage: `url(${_pageData.sections[0].headerImg})` });
  $("#f_header").find("#f_courseTitle").css({ backgroundImage: `url(${_pageData.sections[0].headerText})` });
  $(".home_btn").css({ backgroundImage: `url(${_pageData.sections[0].backBtnSrc})` });
  $(".home_btn").attr("data-tooltip", "Back");
  // playBtnSounds(_pageData.sections[sectionCnt - 1].endAudio);
  //   showEndAnimations();
  checkGlobalAudio();
  assignAudio(
    _audioId,
    _audioIndex,
    _pageAudioSync,
    _forceNavigation,
    _videoId,
    _popupAudio,
    _reloadRequired
  );
  pagePreLoad();
}

// ------------------ common function end ------------------------------------------------------------------------

// -------- adding slide data ------------
function addSectionData() {
  totalSection = _pageData.sections.length;
  for (let n = 0; n < _pageData.sections.length; n++) {
    sectionCnt = n + 1;
    if (sectionCnt == 1) {
      playBtnSounds(_pageData.sections[sectionCnt - 1].introAudio);
      audioEnd(function () {
        $(".dummy-patch").hide();
        resetSimulationAudio();
        // resetIdleTimer();
        window.enableCaterpillarMovement();
      })
      $("#section-" + sectionCnt)
        .find(".content-holder")
        .find(".col-left")
        .find(".content")
        .find(".content-bg")
        .find(".content-style")
        .append(
          '<div class="inst"><p tabindex="0" aria-label="' +
          removeTags(_pageData.sections[sectionCnt - 1].iText) +
          '">' +
          _pageData.sections[sectionCnt - 1].iText +
          "</p></div>"
        );


      /* $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').append(_pageData.sections[sectionCnt - 1].headerTitle);*/

      /*let titletext = $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').text()
            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').find('h1').attr('aria-label', titletext)*/

      // $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style')

      //    let textObject = '', listObject = '';


      // console.log(_pageData.sections[sectionCnt - 1].content.numberObjects, _pageData.sections[sectionCnt - 1].content.numberObjects.length, "lneght")

      const numberObjects =
        _pageData.sections[sectionCnt - 1].content.numberObjects;

      // pick ONE random pattern

      let htmlContent = "";
      // htmlContent += `<div class="game-area">`;      


      // htmlContent += `<div id="game-container">`
      // htmlContent += `<div class="game-grid"></div>`
      // htmlContent += `<div id="game-canvas"></div>`
      // htmlContent += `</div>`
      // htmlContent += `<div class="dpad">`
      // htmlContent += `<div class="dpad-center"></div>`
      // htmlContent += `<button class="dpad-btn dpad-up" data-dir="up">
      //       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M18 15l-6-6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      //   </button>`
      // htmlContent += `<button class="dpad-btn dpad-down" data-dir="down">
      //       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      //   </button>`
      // htmlContent += ` <button class="dpad-btn dpad-left" data-dir="left">
      //       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      //   </button>`
      // htmlContent += `<button class="dpad-btn dpad-right" data-dir="right">
      //       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      //   </button>`
      // htmlContent += `</div>`
      // htmlContent += `</div>`;


      let headerConent = "";
      let popupDiv = "";

      headerConent += `<div class="confetti"></div>`;
      popupDiv += '<div class="popup">';
      popupDiv += '<div class="popup-wrap">';

      popupDiv += '<div class="popBtns">';
      popupDiv += '<button id="refresh" data-tooltip="Replay"></button>';
      popupDiv += '<button id="homeBack" data-tooltip="Back"></button>';
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += '<div class="greetingsPop">';
      popupDiv += '<div class="popup-wrap">';
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += `<div id="introPopup-1"><div class="popup-content">
                    <button class="introPopAudio mute" onclick="togglePopAudio(this, '${_pageData.sections[sectionCnt - 1].infoAudio}')"></button>
                    <button class="introPopclose" data-tooltip="Close" onClick="closeIntroPop('introPopup-1')"></button>
                    <img src="${_pageData.sections[sectionCnt - 1].infoImg}" alt="">
                </div>
            </div>`;

      popupDiv += `<div id="home-popup" class="popup-home" role="dialog" aria-label="Exit confirmation" aria-hidden="false">
    <div class="popup-content modal-box">
      <h2 class="modal-title">Oops!</h2>
      <div class="modal-message">
        <p>If you leave the fun game then you have to start from beginning.</p>     
        <p class="modal-question">Are you sure you want to leave?</p>   
      </div>      
      <div class="modal-buttons">
        <button id="stay-btn" class="modal-btn" onClick="stayPage()">Stay</button>
        <button id="leave-btn" class="modal-btn" onClick="leavePage()">Leave</button>
      </div>
    </div>
  </div>`;

      $("#section-" + sectionCnt)
        .find(".content-holder")
        .find(".col-left")
        .find(".content")
        .find(".content-bg")
        .find(".content-style")
        .append(
          popupDiv +
          headerConent +
          '<div class="body"><div class="animat-container"> <div class="dummy-patch"></div></div> </div>'
        );

      const mountEl = $("#section-" + sectionCnt)
        .find(".content-holder")
        .find(".col-left")
        .find(".content")
        .find(".content-bg")
        .find(".content-style")
        .find(".body")
        .find(".animat-container")[0]; // 👈 important

      initSnakeGameAtMount(mountEl);




      // $(".flip-card").on("click", onClickHanlder);



      // $("#refresh").on("click", restartActivity);
      // $("#home,#homeBack").on("click", jumtoPage)  

      $("#refresh").on("click", function () {
        jumtoPage(_controller.pageCnt);
        startGame();
      });
      $("#homeBack").on("click", function () {
        jumtoPage(_controller.pageCnt - 1)
      });
      // $("#home").on("click", function () {
      //   playClickThen();
      //   $("#home-popup").css('display', 'flex');
      //   AudioController.pause();
      // });
      // $(".music").on("click", function (event) {
      //   playClickThen();
      //   let el = event.currentTarget;
      //     toggleAudio(el);
      // });
      // _currentAudio = _pageData.sections[sectionCnt - 1].content.flipObjects[0].instAudio;
      $(".flipTextAudio").on("click", replayLastAudio);
      // document.querySelector("#info").addEventListener("click", function (event) {
      //   playClickThen();
      //   AudioController.pause();
      //   const el = event.currentTarget;
      //   // console.log("its wokring")
      //   $("#introPopup-1").css('display', 'flex')
      //   $("#introPopup-1").css('opacity', '1')
      //   $(".introPopAudio").removeClass('playing');
      //   $(".introPopAudio").addClass('mute');

      //   // $(".introPopAudio").on("click",function(){  
      //   //     console.log("its working");

      //   // })       
      // });

      // setCSS(sectionCnt);
    }
  }
}


function initSnakeGameAtMount(mountEl) {
  if (!mountEl || !mountEl.appendChild) {
    throw new Error("Invalid mount element");
  }

  const originalBody = document.body;

  try {
    Object.defineProperty(document, "body", {
      value: mountEl,
      configurable: true
    });

    // 🔽 this runs your existing game code
    initSnakeGame();

  } finally {
    Object.defineProperty(document, "body", {
      value: originalBody,
      configurable: true
    });
  }
}

function initSnakeGame() {
  /* =========================
     DOM CREATION
  ========================= */
  function createElement(tag, className, parent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (parent) parent.appendChild(el);
    return el;
  }

  let numberSequence = [];
  const app = createElement("div", "game-container", document.body);
  const gameWrapper = createElement("div", "game-wrapper", app);
  const canvas = createElement("canvas", null, gameWrapper);
  const ctx = canvas.getContext("2d");

  let headScale = 1; // 1 = normal
  let eatingAnimation = null;
  let controlsDisabled = false;


  // 👇 NEW VARIABLES FOR WAVE ANIMATION
  let waveAnimation = null;
  let waveStartTime = 0;
  const WAVE_DURATION = 800;

  /* =========================
     GAME CONFIG & STATE
  ========================= */
  const BASE_TILE_COUNT = 10;
  let tileCountX = 10;
  let tileCountY = 10;
  let tileSize = 0;
  let particles = [];

  // Idle System Variables
  let idleTimer = null;
  let isIdle = false;
  let animationFrameId = null;
  const IDLE_DURATION = 10000; // 5 Seconds

  let idleInterval = null;      // Tracks the loop
  let idleAudioInstance = null; // Tracks the actual Audio player
  const IDLE_REPEAT_TIME = 10000;

  // Offsets to center the grid
  let gridOffsetX = 0;
  let gridOffsetY = 0;

  const PATTERNS = [
    { start: 1, end: 10 },
    { start: 11, end: 20 }
  ];

  let currentPattern;
  let nextValue;
  let foods = [];
  let snake = [];

  // State Flags
  let isGameActive = false;
  let isProcessingMove = false;
  const MOVE_DELAY = 300;

  /* =========================
     CONTROLS DOM
  ========================= */
  const controls = createElement("div", "controls", app);

  function createButton(dir, parent = controls) {
    const btn = createElement("button", null, parent);
    btn.dataset.dir = dir;

    // add image inside button
    const img = document.createElement("img");
    img.src = `pages/module_1/page_7/images/${dir}.png`; // directly use dir for image filename
    // img.style.width = "100%";
    img.style.height = "auto";
    btn.appendChild(img);
    return btn;
  }

  // create buttons
  createButton("up");
  const mid = createElement("div", "middle", controls);
  createButton("left", mid);
  createButton("right", mid);
  createButton("down");


  function playIdleSoundNow() {
    if (!isIdle || !isGameActive) return;

    // Safety: stop any existing sound
    if (idleAudioInstance) {
      idleAudioInstance.pause();
      idleAudioInstance.currentTime = 0;
    }

    const audioPath = _pageData.sections[sectionCnt - 1].idleAudio;
    idleAudioInstance = new Audio(audioPath);

    idleAudioInstance.onended = () => {
      if (!isIdle || !isGameActive) return;

      // ⏳ AFTER audio ends → start idleTimer again
      idleTimer = setTimeout(triggerIdleState, IDLE_DURATION);
    };

    idleAudioInstance.play().catch(e => {
      console.log("Idle audio error:", e);
    });
  }



  function stopIdleSoundNow() {
    // 1. Stop the 5s Loop
    if (idleInterval) {
      clearInterval(idleInterval);
      idleInterval = null;
    }

    // 2. Stop the Audio immediately
    if (idleAudioInstance) {
      idleAudioInstance.pause();
      idleAudioInstance.currentTime = 0;
      idleAudioInstance = null;
    }
  }



  function createParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0, // 100% opacity
        color: color
      });
    }
  }

  function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.05; // Fade out speed

      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, tileSize * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
  }



  /* =========================
     CANVAS HELPERS
  ========================= */
  function resizeCanvas() {
    const rect = gameWrapper.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      requestAnimationFrame(resizeCanvas);
      return;
    }

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Calculate tile size based on both width and height
    tileSize = Math.min(canvas.width, canvas.height) / (BASE_TILE_COUNT + 1);

    // Integer tile counts
    tileCountX = Math.floor(canvas.width / tileSize) - 1;
    tileCountY = Math.floor(canvas.height / tileSize) - 1;

    // Center grid
    const usedWidth = tileCountX * tileSize;
    const usedHeight = tileCountY * tileSize;

    gridOffsetX = (canvas.width - usedWidth) / 2;
    gridOffsetY = (canvas.height - usedHeight) / 2;

    render();
  }


  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawGrid() {
    ctx.save();
    const radius = 3;
    const color = "#b0b0b0";
    ctx.fillStyle = color;

    for (let y = 0; y <= tileCountY; y++) {
      for (let x = 0; x <= tileCountX; x++) {
        // Draw dots at corners
        const px = gridOffsetX + (x * tileSize) - (tileSize / 2);
        const py = gridOffsetY + (y * tileSize) - (tileSize / 2);

        ctx.beginPath();
        // Shift drawing by +tileSize/2 so dots surround the cells
        ctx.arc(px + tileSize / 2, py + tileSize / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  /* =========================
     DRAW FUNCTIONS
  ========================= */
  function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawText(text, x, y) {
    ctx.save();

    ctx.font = `bold ${tileSize * 0.5}px Alphakind`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = "5";

    // 👇 soft shadow for contrast
    ctx.shadowColor = "rgba(255,255,255,0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillStyle = "#000000";
    ctx.fillText(text, x, y);

    ctx.restore();
  }


  const headImg = new Image();
  headImg.src = "pages/module_1/page_7/images/head.png";
  const bodyImg = new Image();
  bodyImg.src = "pages/module_1/page_7/images/body.png";

  function drawSnake() {
    // 1. Base Sizes
    const baseBodySize = tileSize * 1.02;

    // 2. Draw BODY segments (Tail to Neck)
    for (let i = snake.length - 1; i > 0; i--) {
      const seg = snake[i];
      let x = gridOffsetX + (seg.x * tileSize);
      let y = gridOffsetY + (seg.y * tileSize);
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;

      /* ----------------------------------------------------
         🌊 NEW: WAVE ANIMATION LOGIC
      ----------------------------------------------------- */
      let currentSegmentScale = 1;

      if (waveAnimation) {
        const now = performance.now();
        const elapsed = now - waveStartTime;
        const progress = elapsed / WAVE_DURATION; // 0.0 to 1.0

        // Calculate "Travel Position" of the wave (Head -> Tail)
        // We multiply by length + buffer so the wave exits the tail completely
        const peakIndex = progress * (snake.length + 2);

        // Distance of this segment from the wave peak
        const dist = Math.abs(peakIndex - i);

        // If segment is near the peak, scale it up (max 1.3x)
        if (dist < 1.5) {
          currentSegmentScale = 1 + 0.3 * Math.cos(dist * Math.PI / 3);
        }
      }

      // Apply the scale
      const drawnSize = baseBodySize * currentSegmentScale;

      ctx.drawImage(bodyImg, cx - drawnSize / 2, cy - drawnSize / 2, drawnSize, drawnSize);

      if (numberSequence[i - 1] != null) {
        // Optional: Scale text too
        ctx.save();
        if (currentSegmentScale > 1) {
          ctx.font = `bold ${tileSize * 0.5 * currentSegmentScale}px Alphakind`;
        }
        drawText(numberSequence[i - 1], cx, cy);
        ctx.restore();
      }
    }

    // 3. Draw HEAD (Existing logic with idle pulse)
    if (snake.length > 0) {
      const seg = snake[0];
      let x = gridOffsetX + (seg.x * tileSize);
      let y = gridOffsetY + (seg.y * tileSize);
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;

      ctx.save();
      ctx.translate(cx, cy);

      if (snake.length > 1 && seg.x < snake[1].x) {
        ctx.scale(-1, 1);
      }

      // Combine Head Scale (Eating) + Idle Pulse
      let currentScale = headScale;
      if (isIdle && !eatingAnimation && !waveAnimation) {
        currentScale = Math.sin(Date.now() / 300) * 0.1 + 1.1;
      }

      const scaledHeadSize = tileSize * 1.4 * currentScale;

      ctx.drawImage(
        headImg,
        -scaledHeadSize / 2,
        (-scaledHeadSize / 2) - tileSize * 0.15,
        scaledHeadSize,
        scaledHeadSize
      );
      ctx.restore();
    }
  }

  function triggerWave() {
    if (waveAnimation) cancelAnimationFrame(waveAnimation);
    waveStartTime = performance.now();

    function loop() {
      const elapsed = performance.now() - waveStartTime;

      // Keep rendering while time is within duration
      if (elapsed < WAVE_DURATION) {
        render(); // This calls drawSnake(), which calculates the wave
        waveAnimation = requestAnimationFrame(loop);
      } else {
        waveAnimation = null;
        render(); // Final draw to snap back to normal
      }
    }

    waveAnimation = requestAnimationFrame(loop);
  }

  let startTime = Date.now();

  function drawFood() {
    // ⚠️ Ensure you are using 'cachedPolygon' if you implemented the optimization, 
    // otherwise keep using getPolygonPoints(canvas.width, canvas.height);
    const polygon = getPolygonPoints(canvas.width, canvas.height);
    const now = Date.now();

    foods.forEach(f => {
      if (f.eaten) return;

      const cx = gridOffsetX + f.x * tileSize + tileSize / 2;
      const cy = gridOffsetY + f.y * tileSize + tileSize / 2;

      if (!isPointInPolygon(cx, cy, polygon)) return;

      /* -----------------------------------------------
         ✨ NEW: POP-IN & FLOAT ANIMATION
      ----------------------------------------------- */
      // 1. Pop-In: Scale from 0 to 1 over 400ms (Elastic feel)
      const age = now - f.spawnTime;
      let scale = 1;
      if (age < 400) {
        // Elastic ease-out math
        const t = age / 400;
        scale = Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1 + 1; // Overshoot 1
        if (scale > 1) scale = 1; // Clamp if math gets weird, or keep for bounce
        if (age < 50) scale = 0; // seamless start
      } else {
        // 2. Float: Gentle bobbing up and down
        scale = 1 + 0.05 * Math.sin(now / 300);
      }

      const radius = tileSize * 0.45 * scale; // Apply scale to radius

      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(0, radius), 0, Math.PI * 2);
      ctx.fillStyle = "#ffd17c";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#c08737";
      ctx.stroke();

      // Only draw text if bubble is big enough
      if (scale > 0.5) {
        ctx.fillStyle = "#000";
        // Scale font too!
        ctx.font = `${tileSize * 0.45 * scale}px Alphakind`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(f.value, cx, cy);
      }
    });
  }



  function render() {
    clearCanvas();

    ctx.save();
    const polygon = getPolygonPoints(canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(polygon[0][0], polygon[0][1]);
    for (let i = 1; i < polygon.length; i++) ctx.lineTo(polygon[i][0], polygon[i][1]);
    ctx.closePath();
    ctx.clip();

    drawGrid();
    drawFood();        // Draw food (under particles)
    drawParticles();   // 👈 Add this line here!
    drawSnake();       // Draw snake (on top)

    ctx.restore();
  }

  // Keep this global or inside initSnakeGame
  const clipPolygon = [
    [0, 15],
    [0, 0],
    [15, 0],
    [85, 0],
    [100, 0],
    [100, 15],
    [100, 65],
    [82, 65],
    [82, 100],
    [15, 100],
    [0, 100],
    [0, 85]
  ];


  function getPolygonPoints(canvasWidth, canvasHeight) {
    return clipPolygon.map(([px, py]) => [px / 100 * canvasWidth, py / 100 * canvasHeight]);
  }


  function isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / ((yj - yi) || 0.00001) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }


  function canMoveToTile(tileX, tileY) {
    const polygon = getPolygonPoints(canvas.width, canvas.height);

    const corners = [
      { cx: gridOffsetX + tileX * tileSize, cy: gridOffsetY + tileY * tileSize }, // top-left
      { cx: gridOffsetX + (tileX + 1) * tileSize, cy: gridOffsetY + tileY * tileSize }, // top-right
      { cx: gridOffsetX + tileX * tileSize, cy: gridOffsetY + (tileY + 1) * tileSize }, // bottom-left
      { cx: gridOffsetX + (tileX + 1) * tileSize, cy: gridOffsetY + (tileY + 1) * tileSize } // bottom-right
    ];

    return corners.every(c => isPointInPolygon(c.cx, c.cy, polygon));
  }



  function playIdleAudio() {
    // 1. If audio is already playing, stop it first to prevent overlapping
    stopIdleAudio();

    const audioPath = _pageData.sections[sectionCnt - 1].idleAudio;
    console.log("🔊 Playing idle audio:", audioPath);

    // 2. Play and store the reference
    // NOTE: Your playBtnSounds function MUST return the audio object for this to work.
    // e.g., return new Audio(src);
    currentIdleAudio = playBtnSounds(audioPath);
  }

  function stopIdleAudio() {
    // Stop the 10s interval
    if (idleAudioInterval) {
      clearInterval(idleAudioInterval);
      idleAudioInterval = null;
    }

    // Stop the actual sound immediately
    if (currentIdleAudio) {
      // Check if the object has a pause method (HTML5 Audio)
      if (typeof currentIdleAudio.pause === "function") {
        currentIdleAudio.pause();
        currentIdleAudio.currentTime = 0; // Reset to start
      }
      currentIdleAudio = null;
    }
  }

  /* =========================
     GAME LOGIC
  ========================= */
  function randomEmptyCell() {
    const polygon = getPolygonPoints(canvas.width, canvas.height);
    let pos, attempts = 0;
    do {
      pos = {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
      };
      attempts++;
    } while (
      attempts < 100 &&
      (!canMoveToTile(pos.x, pos.y) || snake.some(s => s.x === pos.x && s.y === pos.y) || foods.some(f => f.x === pos.x && f.y === pos.y))
    );
    return pos;
  }


  function getPolygonBounds(polygon) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    polygon.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });
    return { minX, minY, maxX, maxY };
  }


  function spawnFoods() {
    const correctPos = randomEmptyCell();
    let wrongPos;
    let attempts = 0;
    do {
      wrongPos = randomEmptyCell();
      attempts++;
    } while (attempts < 100 && wrongPos.x === correctPos.x && wrongPos.y === correctPos.y);

    // Logic to ensure we don't pick a number already on the snake
    let wrongValue;
    const possibleValues = [];
    for (let i = currentPattern.start; i <= currentPattern.end; i++) {
      possibleValues.push(i);
    }
    const validWrongOptions = possibleValues.filter(val =>
      val !== nextValue && !numberSequence.includes(val)
    );

    if (validWrongOptions.length > 0) {
      wrongValue = validWrongOptions[Math.floor(Math.random() * validWrongOptions.length)];
    } else {
      wrongValue = nextValue + 1 + Math.floor(Math.random() * 3);
    }

    const now = Date.now(); // 👈 Capture creation time

    foods = [
      { ...correctPos, value: nextValue, correct: true, spawnTime: now }, // 👈 Add spawnTime
      { ...wrongPos, value: wrongValue, correct: false, spawnTime: now }  // 👈 Add spawnTime
    ];
  }

  function moveSnake(dir) {
    const head = snake[0];
    const newX = head.x + dir.x;
    const newY = head.y + dir.y;

    if (!canMoveToTile(newX, newY)) return;

    // Check Bounds & Self Collision
    if (newX < 0 || newX >= tileCountX || newY < 0 || newY >= tileCountY) return;
    const newHead = { x: newX, y: newY };
    if (snake.some((s, index) => index !== 0 && s.x === newHead.x && s.y === newHead.y)) return;

    const hitFood = foods.find(f => f.x === newHead.x && f.y === newHead.y);

    snake.unshift(newHead);

    if (hitFood && hitFood.correct) {
      hitFood.eaten = true;
      render(); // Hide food immediately

      // ✨ Trigger Confetti at food position
      const cx = gridOffsetX + hitFood.x * tileSize + tileSize / 2;
      const cy = gridOffsetY + hitFood.y * tileSize + tileSize / 2;
      createParticles(cx, cy, "#FFD700"); // Gold confetti

      triggerWave();

      numberSequence.push(nextValue);
      nextValue++;
      isCorrect(hitFood);
      animateEating();
      animateFoodToHead(hitFood);

      foods = foods.filter(f => !f.eaten);

      if (nextValue > currentPattern.end) {
        render();
        isGameActive = false;
        playBtnSounds(_pageData.sections[sectionCnt - 1].finalAudio);
        showEndAnimations();
        return;
      }

      /* -----------------------------------------------
         🛠 BUG FIX: DELAYED SPAWN
         We wait 300ms before spawning new food.
         This prevents the "Double Draw" glitch and
         lets the user enjoy the "Pop-in" animation.
      ----------------------------------------------- */
      setTimeout(() => {
        spawnFoods();
        // Force a render so the animation loop (if idle) picks up the new food
        if (!eatingAnimation && !waveAnimation) render();
      }, 300);

    } else if (hitFood && !hitFood.correct) {
      // Wrong food logic...
      snake.shift();
      playBtnSounds(_pageData.sections[sectionCnt - 1].wrongAudio);
      audioEnd(function () { inCorrectFood(); });
      isProcessingMove = false;
      return;
    } else {
      snake.pop(); // Normal move
    }
    render();
  }

  /* =========================
     STATE MANAGEMENT
  ========================= */

  window.enableCaterpillarMovement = function () {
    console.log("Caterpillar inputs unlocked");
    isGameActive = true;
    resetIdleTimer();
    // resetIdleTimer(); // Ensure timer starts when game is enabled
  };

  function animateEating() {
    if (eatingAnimation) cancelAnimationFrame(eatingAnimation);

    const duration = 200; // scale-up 200ms
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      if (elapsed < duration) {
        // scale from 1 → 1.3 → back to 1
        headScale = 1 + 0.3 * Math.sin((elapsed / duration) * Math.PI);
        render();
        eatingAnimation = requestAnimationFrame(step);
      } else {
        headScale = 1;
        eatingAnimation = null;
        render();
      }
    }

    requestAnimationFrame(step);
  }

  function animateFoodToHead(food) {
    const startX = gridOffsetX + food.x * tileSize + tileSize / 2;
    const startY = gridOffsetY + food.y * tileSize + tileSize / 2;
    const head = snake[0];
    const endX = gridOffsetX + head.x * tileSize + tileSize / 2;
    const endY = gridOffsetY + head.y * tileSize + tileSize / 2;
    const duration = 250; // ms
    const start = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const cx = startX + (endX - startX) * t;
      const cy = startY + (endY - startY) * t;

      render(); // redraw everything

      // draw the food flying
      const radius = tileSize * 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd17c";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#c08737";
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.font = `${tileSize * 0.4}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(food.value, cx, cy);

      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }


  // replayBtn.onclick = startGame;

  function resetSnakeSamePattern() {
    numberSequence = [];
    snake = [
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 5 },
      { x: 1, y: 5 },
      { x: 0, y: 5 }
    ];
    for (let i = 1; i < snake.length; i++) {
      numberSequence.push(currentPattern.start + i - 1);
    }
    spawnFoods();
    render();
  }

  function getNextPattern() {
    let p;
    do {
      p = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    } while (p === currentPattern);
    return p;
  }

  function isCorrect(food) {
    playBtnSounds(_pageData.sections[sectionCnt - 1].correctAudio)
    console.log("✅ Correct food eaten:", food.value);
  }


  function initSnake(pattern) {
    numberSequence = [];
    const body = [
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 5 },
      { x: 1, y: 5 },
      { x: 0, y: 5 }
    ];
    for (let i = 1; i < body.length; i++) {
      numberSequence.push(pattern.start + i - 1);
    }
    return body;
  }

  let imagesLoaded = 0;
  headImg.onload = bodyImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
      startGame();
    }
  };


  function startGame() {
    // 1. Reset Game State
    // popup.classList.add("hidden");
    // wrongPopup.classList.add("hidden");

    currentPattern = getNextPattern();
    snake = initSnake(currentPattern);
    nextValue = currentPattern.start + snake.length - 1;
    foods = []; // Reset foods

    isGameActive = false;
    isProcessingMove = false;

    // 2. Start Idle Timer
    // resetIdleTimer();

    resizeCanvas();
    spawnFoods();

    /* -----------------------------------------------------------
       🛠 FIX: Force Animation Loop on Start
       We loop 'render' for 600ms so the food "Pop-in" animation 
       plays out immediately. Otherwise, it stays at scale 0 (invisible).
    ----------------------------------------------------------- */
    let start = performance.now();
    function introLoop() {
      // Keep rendering for 600ms (enough for the 400ms pop-in)
      if (performance.now() - start < 600) {
        render();
        requestAnimationFrame(introLoop);
      } else {
        render(); // Final draw to ensure it's crisp
      }
    }
    introLoop();
  }


  /* =========================
     INPUT HANDLERS
  ========================= */

  function setDirection(dirKey) {
    /* -----------------------------------------------
       UPDATED LOGIC: Reset Idle Timer on Input
    ----------------------------------------------- */
    resetIdleTimer();

    if (!isGameActive) return;
    if (isProcessingMove) return;

    let dirVec = { x: 0, y: 0 };
    if (dirKey === "up") dirVec = { x: 0, y: -1 };
    if (dirKey === "down") dirVec = { x: 0, y: 1 };
    if (dirKey === "left") dirVec = { x: -1, y: 0 };
    if (dirKey === "right") dirVec = { x: 1, y: 0 };

    if (snake.length > 1) {
      const head = snake[0];
      const neck = snake[1];
      if (head.x + dirVec.x === neck.x && head.y + dirVec.y === neck.y) {
        return;
      }
    }

    isProcessingMove = true;
    moveSnake(dirVec);

    setTimeout(() => {
      isProcessingMove = false;
    }, MOVE_DELAY);
  }

  document.addEventListener("keydown", e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }

    if (e.key === "ArrowUp") setDirection("up");
    if (e.key === "ArrowDown") setDirection("down");
    if (e.key === "ArrowLeft") setDirection("left");
    if (e.key === "ArrowRight") setDirection("right");
  });

  document.querySelectorAll(".controls button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setDirection(btn.dataset.dir)
    });
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
  });
  window.addEventListener("orientationchange", resizeCanvas);

  /* =========================
     IDLE SYSTEM HELPERS
  ========================= */


  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = null; // 👈 ADD THIS

    stopIdleSoundNow();

    if (isIdle) {
      isIdle = false;
      cancelAnimationFrame(animationFrameId);
      render();
    }

    if (isGameActive) {
      idleTimer = setTimeout(triggerIdleState, IDLE_DURATION);
    }
  }


  function triggerIdleState() {
    if (!isGameActive) return;

    isIdle = true;
    console.log("👋 It's your turn!");

    // 🔒 Stop idleTimer while audio is playing
    clearTimeout(idleTimer);
    idleTimer = null;

    playIdleSoundNow();
    animateIdleLoop();
  }


  function animateIdleLoop() {
    if (!isIdle) return;
    render(); // Redraws canvas with wiggle math via drawSnake
    animationFrameId = requestAnimationFrame(animateIdleLoop);
  }

  function inCorrectFood() {
    const correctFood = foods.find(f => f.correct);
    const wrongFood = foods.find(f => !f.correct);

    const newCorrectPos = randomEmptyCell();
    let newWrongPos;
    let attempts = 0;

    do {
      newWrongPos = randomEmptyCell();
      attempts++;
    } while (
      attempts < 100 &&
      newWrongPos.x === newCorrectPos.x &&
      newWrongPos.y === newCorrectPos.y
    );

    foods = [
      { ...newCorrectPos, value: correctFood.value, correct: true },
      { ...newWrongPos, value: wrongFood.value, correct: false }
    ];

    render(); // redraw immediately
  }

}

function playFeedbackAudio(_audio) {
  $(".dummy-patch").show();
  playBtnSounds(_audio)
  audioEnd(function () {
    $(".dummy-patch").hide();
  })
}




function stayPage() {
  playClickThen();
  AudioController.play();
  $("#home-popup").hide();
}
function leavePage() {
  playClickThen();
  var audio = document.getElementById("simulationAudio");
  if (audio) {
    // Stop audio whether it's playing or paused
    audio.pause();
    audio.currentTime = 0;
  }

  jumtoPage(_controller.pageCnt - 1);
}

function jumtoPage(pageNo) {
  playClickThen();

  _controller.pageCnt = pageNo;
  console.log(pageNo, "pageNumber");

  _controller.updateViewNow();
}


var activeAudio = null;

function playBtnSounds(soundFile) {
  if (!soundFile) {
    console.warn("Audio source missing!");
    return;
  }

  console.log("calling audios");

  const audio = document.getElementById("simulationAudio");

  // Stop previous audio if it exists
  if (activeAudio && !activeAudio.paused) {
    activeAudio.pause();
    // Do NOT reset src yet, let it finish
  }

  audio.loop = false;
  audio.src = soundFile;
  audio.load();

  activeAudio = audio;

  audio.play().catch((err) => {
    console.warn("Audio play error:", err);
  });
}



function resetSimulationAudio() {
  console.log("Balajia");

  const audioElement = document.getElementById("simulationAudio");
  if (!audioElement) return;

  audioElement.pause();

  audioElement.src = "";
  audioElement.removeAttribute("src");

  const source = audioElement.querySelector("source");
  if (source) source.src = "";

  audioElement.load();
  audioElement.onended = null;
}





function audioEnd(callback) {
  const audio = document.getElementById("simulationAudio");
  audio.onended = null;
  audio.onended = () => {
    if (typeof callback === "function") callback();
  };
}


function toggleAudio(el) {
  playClickThen();
  // console.log(event, "current e")
  // const el = event.currentTarget; 
  const audio = document.getElementById("audio_src");

  // console.log(el, "Target class");

  if (audio.paused) {
    audio.muted = false;
    audio.play();
    el.classList.remove("mute");
    el.classList.add("playing");
    _controller._globalMusicPlaying = true;
  } else {
    audio.pause();
    el.classList.remove("playing");
    el.classList.add("mute");
    _controller._globalMusicPlaying = false;
  }
}

var AudioController = (() => {
  const audio = document.getElementById("simulationAudio");

  const hasAudio = () => audio && audio.src;

  return {
    play() {
      if (hasAudio()) audio.play();
    },
    pause() {
      if (hasAudio()) audio.pause();
    }
  };
})();






function restartActivity() {
  $(".popup").css("opacity", "0");
  setTimeout(function () {
    $(".popup").css("display", "none");
  }, 500);
  _globalCicked = 0;
  restartPage();
}

function showEndAnimations() {
  var $audio = $("#simulationAudio");
  closePopup('introPopup-1');
  console.log("Audio ending");
  pageVisited();

  $audio.on("timeupdate", function () {
    var currentTime = this.currentTime;
    $(".greetingsPop").css("visibility", "visible");
    $(".greetingsPop").css("opacity", "1");

    if (currentTime >= 5) {
      $(".confetti").addClass("show");
      // $(".confetti").show();
      setTimeout(function () {
        $(".greetingsPop").css("visibility", "hidden");
        $(".greetingsPop").css("opacity", "0");
        $(".popup").css("visibility", "visible");
        $(".popup").css("opacity", "1");
      }, 1500)
      setTimeout(function () {
        $(".confetti").removeClass("show");
        // $(".confetti").hide();                
      }, 2000);

      $audio.off("timeupdate");
    }

  });
}



function closeIntroPop(ldx) {
  playClickThen();
  AudioController.play();
  document.getElementById(ldx).style.display = 'none';
  let audio = document.getElementById("popupAudio");
  if (audio.src) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function replayLastAudio() {
  playClickThen();
  console.log(_currentAudio, "Audio plaing");
  playBtnSounds(_currentAudio);
  disableButtons();
  audioEnd(function () {
    resetSimulationAudio();
    enableButtons();
  })
}




function enableButtons() {
  $(".flip-card").prop("disabled", false);
  $(".flipTextAudio").prop("disabled", false);
}

function disableButtons() {
  $(".flip-card").prop("disabled", true);
  $(".flipTextAudio").prop("disabled", true);
}

function resetToggle() {
  $(".flip-card").removeClass('flipped');
}

// -------- update CSS ------------
function setCSS(sectionCnt) {
  _wrapperWidth = $("#f_wrapper").outerWidth();
  _wrapperHeight = $("#f_wrapper").outerHeight();
  // ---- checking device width and height ----
  if (_wrapperWidth > 768) {
    for (var i = 0; i < _pageData.imgCollage.desktop.length; i++) {
      $("#section-1")
        .find(".bg-img")
        .eq(i)
        .css({
          "background-image":
            "url(" + _pageData.imgCollage.desktop[i].imageSRC + ")",
          "background-size": "cover",
        });
    }
  } else {
    for (var j = 0; j < _pageData.imgCollage.portrait.length; j++) {
      $("#section-1")
        .find(".bg-img")
        .eq(j)
        .css({
          "background-image":
            "url(" + _pageData.imgCollage.portrait[j].imageSRC + ")",
          "background-size": "cover",
        });
    }
  }
}

// -------- animations ------------
//function updateCurrentTime(_currTime) {
//    _tweenTimeline.seek(_currTime)
//}

/*
function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}*/
function removeTags(str) {
  //console.log('removeTags 0', str)
  if (str === null || str === "") {
    return false;
  } else {
    str = _controller.removeTags(str);
    return str;
  }
}
function initPageAnimations() {
  if (_tweenTimeline) {
    _tweenTimeline.kill();
  }
  _tweenTimeline = new TimelineLite();

  mainAnimation();
  if (_pageAudioSync && !_pageData.mainAudio.isEmptyAudio) {
    withAudioSync();
  } else {
    withoutAudioSync();
  }
}

function mainAnimation() {
  $(".f_page_content").animate(
    {
      opacity: 1,
    },
    300
  );
}

function withAudioSync() {
  _tweenTimeline.play();

  _tweenTimeline.add(animateFadeIn($("h1"), 0.5).play(), 0.5);

  _tweenTimeline.add(animateFadeIn($(".ost"), 0.5).play(), 0.1);
  _tweenTimeline.add(animateFadeOut($(".ost"), 0.5).play(), 4.5);
  _tweenTimeline.add(animateFadeOut($(".dummy-patch"), 0.5).play(), 3);
  // _tweenTimeline.add(animateFadeIn($(".inst"), 0.5).play(), 5);

  _tweenTimeline.add(
    animateFadeIn($(".animat-container"), 0.5, 0).play(),
    0.3
  );

  var rightListTiming = [0.3];
  // for (var k = 0; k < rightListTiming.length; k++) {
  //   _tweenTimeline.add(
  //     animateFadeIn(
  //       $(".animat-container").find(".flip-container").eq(k),
  //       0.5,
  //       0
  //     ).play(),
  //     rightListTiming[k]
  //   );
  // }
}

// function withoutAudioSync() {
//   _tweenTimeline.play();
//   _tweenTimeline.add(animateFadeIn($("h1"), 0.5).play(), 0.5);
//   _tweenTimeline.add(animateFadeIn($(".animat-container"), 0.5, 0).play(), 0.1);
//   let time = 1,
//     t = 0,
//     pTag = 0,
//     listTag = 0,
//     divTag = 0;
//   let time1 = time;
//   for (let j = 0; j < _pageData.sections[0].content.listText.length; j++) {
//     t = time1 + j * 0.5;
//     _tweenTimeline.add(
//       animateFromRight(
//         $(".animat-container").find(".list li").eq(listTag),
//         0.5,
//         0
//       ).play(),
//       t
//     );
//     listTag++;
//   }
// }
// -------- resize page details ------------
/*window.onresize = function() {
    //setCSS()
}*/
