# Stopclock
Simple stopclock for performing time measurements on node.js projects. 

## Install
```js
npm install stopclock
```

## Example usage

```js
const Stopclock = require('stopclock');

// Create a new Stopclock 
let myclock = new Stopclock('myclock', 'ms');

// Start a measurement
myclock.start();

for(let i = 0; i < 1e6; i++);

// Stop the measurement and directly print the result
myclock.stop(true);

// Start a second measurement
myclock.start();

setTimeout(function() {
	// Stop the measurement and save the passed time
	let time = myclock.stop();

	// Convert time into the unit specified on stopclock creation
	time = myclock.convertTime(time); 
	console.log(`#2: ${time}ms`);
	
	printResults();
}, 10);

function printResults() {
	// Print all measurements (given in nanoseconds)
	console.log('All measurements:', myclock.measurements);

	// Print average in nanoseconds
	console.log('Average:', myclock.avg);

	// Print readable average in the unit specified on stopclock creation
	console.log('Readable Average:', myclock.readableAvg);
}
```
