/*
custom implemented Priority Queue
with Binary Min-Heap, i.e. The key with minimum required
value (distance, in these algorithmic implementation) will have 
highest priority.
*/

class PriorityQueue {
    constructor() {
        this.arr = new Array(1000);
        this.size = 0;
        // left of Node at index i
        this.left = function (i) {
            return (i << 1) + 1;
        };
        // right of Node at index i
        this.right = function (i) {
            return (i << 1) + 2;
        };
        // parent of Node at index i
        this.parent = function (i) {
            return Math.floor((i - 1) >>> 2);
        };
        // check whether priority queue is empty or not
        this.isEmpty = function () {
            return (this.size === 0);
        };
        // insert a key into priority queue
        this.insert = function (key) {
            if (this.size >= 1000) {return;}
            this.size += 1;
            this.arr[this.size - 1] = key;
            var i = this.size - 1;
            while (i!==0 && this.arr[i][1] < this.arr[this.parent(i)][1]) {
                let tmp = this.arr[i];
                this.arr[i] = this.arr[this.parent(i)];
			    this.arr[this.parent(i)] = tmp;
			    i = this.parent(i);
            }
        };
        // heapify the priority queue
        this.heapify = function (i) {
            if (i >= this.size) {return;}
            var smaller = i;
            var l = this.left(i);
            var r = this.right(i);
            if (l < this.size && this.arr[l][1] < this.arr[smaller][1]) {
                smaller = l;
            }
            if (r < this.size && this.arr[r][1] < this.arr[smaller][1]) {
                smaller = r;
            }
            if (smaller !== i) {
                let tmp = this.arr[smaller];
                this.arr[smaller] = this.arr[i];
                this.arr[i] = tmp;
                this.heapify(smaller);
            }
        };
        // extract minimum from priority queue
        this.extractMin = function () {
            if (this.size === 0) {return Infinity;}
            var tmp = this.arr[0];
            this.arr[0] = this.arr[this.size-1];
            this.size -= 1;
            this.heapify(0);
            return tmp;
        };
        // decrease key value
        this.decreaseKey = function (i, value) {
            if (i >= this.size) {return;}
            this.arr[i][1] = value;
            while (i!==0 && this.arr[i][1] < this.arr[this.parent(i)][1]) {
                var tmp = this.arr[this.parent(i)];
                this.arr[this.parent(i)] = this.arr[i];
                this.arr[i] = tmp;
                i = this.parent(i);
            }
        };
        // delete key from priority queue
        this.deleteKey = function (thisX, thisY) {
            for (let i=0; i<this.size; i++) {
                if (this.arr[i][0].x === thisX && this.arr[i][0].y === thisY) {
                    this.decreaseKey(i, -Infinity);
                    this.extractMin();
                    break;
                }
            }
        };
    }
}

export default PriorityQueue;