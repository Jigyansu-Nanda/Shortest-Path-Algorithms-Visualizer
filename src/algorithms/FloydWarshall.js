import "../components/node.css";

const num_of_rows = 10;
const num_of_cols = 10;

function FloydWarshall(grid, src, dst) {
    /*
    childNode matrix to keep track of child Node of 
    Nodes included in the shortest path 
    from source to destination. Number of rows =
    number of columns = 100 (total possible vertices).
    childNode[a][b]: first intermediate Node in shortest path
    from Node a to Node b.

    Initialize:
    childNode[a][b] = -1 (if no edge connecting from Node a to Node b)
    childNode[a][b] = b (if b is adjacent reachable Node from Node a)

    Update:
    childNode[a][b] = childNode[a][c] (if distance[a][b] > distance[a][c] + distance[c][b])
    */
    var childNode = new Array(num_of_rows*num_of_cols);
    for (let i=0; i<num_of_rows*num_of_cols; i++) {
        childNode[i] = new Array(num_of_rows*num_of_cols);
    }
    /*
    distance matrix of number of rows = 100
    and number of cols = 100 (as total 100 possible vertices)

    Initialize:
    distance[i][j] = Infinity (if no edge connecting from Node i to Node j)
    distance[i][j] = weight of edge connecting from Node i to Node j
    */
    var distance = [];
    for (let i=0; i<num_of_rows*num_of_cols; i++) {
        distance[i] = new Array(num_of_rows*num_of_cols);
    }
    for (let i=0; i<num_of_rows; i++) {
        for (let j=0; j<num_of_cols; j++) {
            var index = i*(num_of_cols) + j;
            for (let k=0; k<num_of_rows*num_of_cols; k++) {
                if (k===index) {distance[index][k] = 0;}
                else {
                    distance[index][k] = Infinity;
                    childNode[index][k] = -1;
                }
            }
            var u = grid[i][j];
            for (let k=0; k<u.adjacentNodes.length; k++) {
                var v = u.adjacentNodes[k];
                var nextIndex = v.x*(num_of_cols) + v.y;
                distance[index][nextIndex] = v.weight;
                childNode[index][nextIndex] = nextIndex;
            }
        }
    }
    var time = 1;
    // Floyd Warshall
    for (let k=0; k<num_of_rows*num_of_cols; k++) {
        var currimdR = Math.floor(k/num_of_cols);
        var currimdC = k - (currimdR*num_of_cols);
        var imdNode = grid[currimdR][currimdC];
        if ((currimdR!==src.x || currimdC!==src.y) && (currimdR!==dst.x || currimdC!==dst.y)) {
            animateNode([imdNode, "fw-imd-processing", time]);
        }
        // animateNode([imdNode, "fw-imd-processing", time]);
        time += 1;
        for (let i=0; i<num_of_rows*num_of_cols; i++) {
            if (distance[i][k] === Infinity) {continue;}
            var currsrcR = Math.floor(i/num_of_cols);
            var currsrcC = i - (currsrcR*num_of_cols);

            // if (currsrcR!==currimdR || currsrcC!==currimdC) {
                // animateNode([grid[currsrcR][currsrcC], "fw-src-processing", time]);
                // time += 0.5;
            // }
            time += 1;
            for (let j=0; j<num_of_rows*num_of_cols; j++) {
                if (distance[k][j] === Infinity) {
                    continue;
                }
                var currdstR = Math.floor(j/num_of_cols);
                var currdstC = j - (currdstR*num_of_cols);

                // if (currdstR!==currimdR || currdstC!==currimdC) {
                    // animateNode([grid[currdstR][currdstC], "fw-dst-processing", time]);
                    // time += 3;
                // }
                // time += 0.5;
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j];
                    childNode[i][j] = childNode[i][k];
                }
                // time += 0.5;
                // if (currdstR!==currimdR || currdstC!==currimdC) {
                    // animateNode([grid[currdstR][currdstC], "fw-processed", time]);
                    // time += 1;
                // }
            }
            // if (currsrcR!==currimdR || currsrcC!==currimdC) {
                // animateNode([grid[currsrcR][currsrcC], "fw-processed", time]);
                // time += 0.5;
            // }
            // time += 0.5;
        }
        if ((currimdR!==src.x || currimdC!==src.y) && (currimdR!==dst.x || currimdC!==dst.y)) {
            animateNode([imdNode, "fw-processed", time]);
        }
        // animateNode([grid[currimdR][currimdC], "fw-processed", time]);
        time += 1;
    }
    var startIndex = src.x*(num_of_cols) + src.y;
    var endIndex = dst.x*(num_of_cols) + dst.y;
    console.log(distance[startIndex][endIndex]+src.weight);
    var shortestDistance = distance[startIndex][endIndex]+src.weight;
    var shortestPath = [];
    while (startIndex !== endIndex) {
        var r = Math.floor(startIndex/num_of_cols);
        var c = startIndex - (r*num_of_cols);
        if ((r!==src.x || c!==src.y) && (r!==dst.x || c!==dst.y)) {
            shortestPath.push(grid[r][c]);
        }
        startIndex = childNode[startIndex][endIndex];
    }
    // shortestPath.push(grid[dst.x][dst.y]);
    for (let k=0; k<shortestPath.length; k++) {
        console.log(shortestPath[k]);
    }
    animateShortestPath(shortestPath, time);
    return [shortestDistance, time];
}

function animateNode(toBeAnimated) {
    var node = toBeAnimated[0];
    var newClass = toBeAnimated[1];
    var time = toBeAnimated[2];
    setTimeout(() => {
        document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
    }, 10*time);
}

function animateShortestPath(shortestPath, time) {
    for (let i=0; i<shortestPath.length; i++) {
        setTimeout(() => {
            var node = shortestPath[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = 'fw-shortest-path';
        }, 10*time);
    }
}

export default FloydWarshall;