/**
  * Definition of stopwatch object
*/
class Stopwatch {
  // object properties
  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.watch;
  }

  // object methods

  /**
    * Runs incrementation of stopwatch
  */
  run() {
    this.watch = setTimeout(this.increment.bind(this), 1000);
  }

  /**
    * Increments properties of stopwatch
  */
  increment() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }

    // update label
    var label = document.getElementById('label_stopwatch')
    label.innerHTML = '';
    if (this.hours > 9) {
      label.innerHTML += this.hours + ':';
    } else {
      label.innerHTML += '0' + this.hours + ':';
    }
    if (this.minutes > 9) {
      label.innerHTML += this.minutes + ':';
    } else {
      label.innerHTML += '0' + this.minutes + ':';
    }
    if (this.seconds > 9) {
      label.innerHTML += this.seconds;
    } else {
      label.innerHTML += '0' + this.seconds;
    }

    // call function to continue stopwatch
    this.run();
  };

  /**
    * Sets increment values to member variables
  */
  setIncrement(seconds, minutes, hours) {
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
  }

  /**
    * Haults increment of stopwatch by clearing timeout
    * Does not reset object properties
  */
  stop() {
    clearTimeout(this.watch);
  }

  /**
    * Clears set timeout and resets stopwatch variables
  */
  reset() {
    clearTimeout(this.watch);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  };
}
