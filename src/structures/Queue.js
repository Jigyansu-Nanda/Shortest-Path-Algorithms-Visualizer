/*
custom implemented Queue (a FIFO data structure, i.e.
the item inserted first into the Queue gets processed/removed first),
to be used in Breadth First Search, Topological Sorting
*/

class Queue {
    constructor() {
        this.arr = [];
        // check whether queue is empty or not
        this.isEmpty = function () {
            return (this.arr.length === 0);
        };
        // insert item into queue
        this.insert = function (key) {
            this.arr.unshift(key);
            return;
        };
        // remove first inserted item from queue
        this.remove = function () {
            return this.arr.pop();
        };
    }
}

export default Queue;