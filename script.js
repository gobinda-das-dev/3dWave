const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const gui = new dat.GUI();
const params = {
  waveHeight: 4,
  y: -100,
  yoyo: true,
  amount: 1,
  pause: false,
  reverse: false,
  noOfCircle: 20,
  duration: 1,
  ease: 'power1.inOut', // Default ease
  color: '#ffffff', // Default color
};

const easeOptions = [
  'linear',
  'none',
  'power1.inOut',
  'power1.in',
  'power1.out',
  'power2.inOut',
  'power2.in',
  'power2.out',
  'power3.inOut',
  'power3.in',
  'power3.out',
  'power4.inOut',
  'power4.in',
  'power4.out',
  'back.inOut',
  'back.in',
  'back.out',
  'elastic.inOut',
  'elastic.in',
  'elastic.out',
  'bounce.inOut',
  'bounce.in',
  'bounce.out',
]; // Add all available ease options

gui.add(params, 'y').min(-400).max(400).step(0.001).onChange(updateAnimation);
gui.add(params, 'amount').min(0).max(10).step(0.001).name('stagger').onChange(updateAnimation);
gui.add(params, 'duration').min(0).max(10).step(0.001).onChange(updateAnimation);
gui.add(params, 'waveHeight').min(0).max(40).onChange(updateWaveHeight);
gui.add(params, 'noOfCircle').min(0).max(100).name('no of circle').onChange(updateCircle);
gui.add(params, 'yoyo').onChange(updateAnimation);
gui.add(params, 'pause').onChange(togglePause);
gui.add(params, 'reverse').onChange(toggleReverse);
gui.add(params, 'ease', easeOptions).onChange(updateAnimation); // Add ease dropdown
gui.addColor(params, 'color').onChange(updateBorder); // Add color picker

gsap.set('.wave-container > div', { yPercent: -50 });
let tween = null;

function updateAnimation() {
  tween && tween.kill();

  tween = gsap.fromTo('.wave-container > div', {
    y: -params.y,
  }, {
    y: params.y,
    repeat: params.repeat,
    yoyo: params.yoyo,
    stagger: {
      repeat: -1,
      yoyo: params.yoyo,
      amount: params.amount
    },
    duration: params.duration,
    ease: params.ease, // Update ease based on selected option
  });
}

function updateWaveHeight(value) {
  const waves = $$('.wave-container > div');
  waves.forEach((wave, index) => {
    wave.style.height = (index * value * 0.5) + 'vw';
  });
}

function togglePause() {
  if (params.pause) {
    tween.pause();
  } else {
    tween.resume();
  }
}

function toggleReverse() {
  if (params.reverse) {
    tween.reverse();
  } else {
    tween.play();
  }
}

function updateCircle(value) {
  const waveContainer = $('.wave-container');
  waveContainer.innerHTML = ''; // Clear existing waves

  for (let i = 0; i < value; i++) {
    const wave = document.createElement('div');
    wave.style.height = '0vw';

    waveContainer.appendChild(wave);
  }

  updateWaveHeight(params.waveHeight);
  updateAnimation();
}

function updateBorder() {
  gsap.set('.wave-container > div', {borderColor: params.color})
}

updateCircle(params.noOfCircle);