
window.onload = init;
var context;
var bufferLoader;
var bufferList;
var worker = new Worker('client/sound/intervalWorker.js')
function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let soundArray = [
      //These are the drum samples
      './samples/kick.wav',
      './samples/donk.wav',
      './samples/snare2.wav',
      './samples/hihat2.wav',
    ];

  // if (typeof name === 'string') { soundArray.push('./samples/' + name)}
  // console.log('in init', soundArray)
  
  // context = null;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    soundArray,
    finishedLoading
    );
  console.log(bufferLoader)
  bufferLoader.load();
}

function finishedLoading(buffers) {
	bufferList = buffers;
}

function loadNewSound(name) {
  const url = './samples/' + name;
  const index = bufferList.length;
  bufferLoader.loadBuffer(url, index, function(buffer) {
    bufferList.push(buffer);
  });
}
