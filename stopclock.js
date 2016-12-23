/**
 * Simple stopclock for performing time measurements in nanoseconds
 * using [process.hrtime]{@link https://nodejs.org/api/process.html#process_process_hrtime_time}.
 */
class Stopclock {

    /**
     * Creates a new stopclock.
     * @param {string} name Name of the stopclock
     * @param {string} unit Unit for printing measurements (possible values: s, ms, µs, or ns)
     * @throw {Error} Throws an error if an unknown unit is used.
     */
    constructor(name, unit) {
        this.measurements = [];
        this.name = name;
        this.unit = unit;
        if (['s', 'ms', 'µs', 'ns'].indexOf(unit) === -1) {
            throw new Error('Unit is not supported. Use s, ms, µs, or ns');
        }
    }

    /**
     * Start measurement.
     */
    start() {
        this.startTime = process.hrtime();
    }

    /**
     * Stop measurement.
     * @param {boolean} printToConsole If true, the elapsed time is printed to the console.
     * @throw {Error} Throws an error if no measurement is currently running.
	 * @return {number} Time in nanoseconds since the measure has been started
     */
    stop(printToConsole) {
        if (this.startTime) {
            let [s, ns] = process.hrtime(this.startTime);
            let time = s * 1e9 + ns;
            this.measurements.push(time);
            delete this.startTime;
            if(printToConsole) {
                console.log(this.name + ' (#' + this.measurements.length + '): ' + this.convertTime(time) + this.unit);
            }
			return time;
        } else {
            throw new Error('Nothing to be stopped');
        }
    }

    /**
     * Calculates and returns the average in ns.
     * @return {number} Average of all measurements in ns
     */
    get avg() {
        let avg = 0;
        if (this.measurements.length) {
            this.measurements.forEach((measurement) => avg += measurement);
            avg /= this.measurements.length;
        }
        return avg;
    }

    /**
     * Calculates the average, converts it to the unit of stopclock and returns it as a string.
     * @return {string} Readable average in the unit of the stopclock
     */
    get readableAvg() {
        return this.convertTime(this.avg) + this.unit;
    }

    /**
     * Prints a readable average to the console.
     */
    printAvg() {
        console.log(this.name + ' (average): ' + this.readableAvg);
    }

    /**
     * Convert a time in nanoseconds into the desired unit.
     * @param {number} timeInNs Time in nanoseconds
     * @param {string} [unit] Desired output unit or empty if unit of stopclock shall be used
     * @return {number} time converted to the desired output unit.
     */
    convertTime(timeInNs, unit) {
        if (!unit) {
            unit = this.unit;
        }
        switch (unit) {
            case 's':
                return timeInNs / 1e9;
            case 'ms':
                return timeInNs / 1e6;
            case 'µs':
                return timeInNs / 1e3;
            case 'ns':
                return timeInNs;
            default:
                throw new Error('Unit is not supported. Use s, ms, µs, or ns');
        }
    }
}

module.exports = Stopclock;
