import Queue from "../structures/Queue";
import "../components/node.css";

const num_of_rows = 10;
const num_of_cols = 10;

function BFS(grid, src, dst) {
    // to store the distances
    var distance = [];
    for (let i=0; i<num_of_rows; i++) {
        distance[i] = new Array(num_of_cols);
        for (let j=0; j<num_of_cols; j++) {
            // Initialize all distances as Infinity
            distance[i][j] = Infinity;
        }
    }
    // initialize source distance as weight of source node
    distance[src.x][src.y] = 0;
    // to keep track of parent Node of 
    // Nodes included in the shortest path
    var parentNodes = [];
    // initialize all parent nodes as null
    for (let i=0; i<num_of_rows; i++) {
        parentNodes[i] = new Array(num_of_cols);
        for (let j=0; j<num_of_cols; j++) {
            parentNodes[i][j] = null;
        }
    }
    var time = 1;
    var q = new Queue();
    q.insert(src);
    while (q.isEmpty()===false) {
        var pathFound = false;
        var curr = q.remove();
        for (let k=0; k<curr.adjacentNodes.length; k++) {
            var adj = curr.adjacentNodes[k];
            if ((adj.x!==src.x || adj.y!==src.y) && (adj.x!==dst.x || adj.y!==dst.y) && (distance[adj.x][adj.y]===Infinity)) {
                animateNode([adj, "bfs-processed", time]);
            }
            time++;
            if (distance[adj.x][adj.y] === Infinity) {
                distance[adj.x][adj.y] = distance[curr.x][curr.y]+1;
                parentNodes[adj.x][adj.y] = curr;
                if (adj.x === dst.x && adj.y === dst.y)  {
                    pathFound = true;
                    break;
                }
                q.insert(adj);
            }
        }
        if (pathFound) {break;}
    }
    if (distance[dst.x][dst.y] !== Infinity) {
        console.log("Path Found!");
        console.log(distance[dst.x][dst.y]);
    }
    // to keep track of nodes included in
    // shortest path for animation
    var shortestPath = [];
    var end = parentNodes[dst.x][dst.y];
    while (end.x !== src.x || end.y !== src.y) {
        shortestPath.unshift(end);
        end = parentNodes[end.x][end.y];
    }
    for (var k=0; k<shortestPath.length; k++) {
        console.log(shortestPath[k]);
    }
    animateShortestPath(shortestPath, time);
    return [distance[dst.x][dst.y], time];
}

function animateNode(toBeAnimated) {
    var node = toBeAnimated[0];
    var newClass = toBeAnimated[1];
    var time = toBeAnimated[2];
    setTimeout(() => {
        document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
    }, 40*time);
}

function animateShortestPath(shortestPath, time) {
    for (let i=0; i<shortestPath.length; i++) {
        setTimeout(() => {
            var node = shortestPath[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = 'bfs-shortest-path';
        }, 40*time);
    }
}

export default BFS;