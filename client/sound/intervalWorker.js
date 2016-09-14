
let timerID;
self.onmessage = function(e) {
	clearInterval(timerID);
	
  if (e.data.type === 'start' || e.data.type === 'changeBpm') {
    self.postMessage('tick');
    timerID = setInterval(()=> {
      self.postMessage('tick');
    }, 60 / e.data.bpm * 1000 / 2)
  }
}