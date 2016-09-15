const MS_TO_BPM_RATIO = 60000;
const EIGTH_NOTES_RATIO = 0.5;
let timerID;

self.onmessage = function(e) {
	clearInterval(timerID);
	
  if (e.data.type === 'start' || e.data.type === 'changeBpm') {
    const beatLength = MS_TO_BPM_RATIO * EIGTH_NOTES_RATIO / e.data.bpm; // length of each beat in milliseconds
    self.postMessage('tick');
    timerID = setInterval(() => {
      self.postMessage('tick');
    }, beatLength)
  }
}