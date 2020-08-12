import React, {Component} from 'react';
import Node from "./Node";
import "./node.css";
import "./visualizer.css";
import Dijkstra from "../algorithms/Dijkstra";
import BellmanFord from "../algorithms/BellmanFord";
import BFS from "../algorithms/BFS";
import FloydWarshall from "../algorithms/FloydWarshall";

function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rows = 10;
const cols = 10;

var src_row = generateRandomNumber(0, 9);
var src_col = generateRandomNumber(0, 9);
var dst_row = 0;
if (src_row === dst_row) {
    if (src_row > 0) {
        dst_row = src_row - 1;
    }else {
        dst_row = src_row + 1;
    }
}
var dst_col = generateRandomNumber(0, 9);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

var newGrid = [];

var selectedAlgorithm = "";

var isPathClear = true;

export default class Visualizer extends Component {

    constructor () {
        super();
        this.state = {
            grid: [],
        };
    }

    componentDidMount () {
        const grid = createGrid();
        this.setState({grid});
    }

    /* clear path with source, destination and weights unchanged */
    clearPath () {
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = "";
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                }, 5);
            }
        }
        chooseAlgorithm("");
        setPathClear(true);
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
    }

    /* re-intialize grid with different weights */
    reconfigureGrid () {
        resetSourceAndDestination();
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = "";
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                    var x = document.getElementById(`node-${node.x}-${node.y}`);
                    x.querySelector(".weighted").innerHTML= newGrid[i][j].weight;
                }, 5);
            }
        }
        this.componentDidMount();
        chooseAlgorithm("");
        setPathClear(true);
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
    }

    /* Visualize BFS Algorithm onClick */
    visualizeBFS () {
        const src = newGrid[src_row][src_col];
        const dst = newGrid[dst_row][dst_col];
        const result = BFS(newGrid, src, dst);
        const shortestPathLength = result[0];
        const time = result[1];
        const newclass = "shortest-path-length path-found";
        setTimeout(() => {
            document.getElementsByClassName("shortest-path-length")[0].className = newclass;
            document.getElementsByClassName("shortest-path-length")[0].innerHTML = "Total cost associated with Minimum Cost Path is " + shortestPathLength;
            document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        }, 40*time);
        setPathClear(false);
        console.log(shortestPathLength);
    }

    /* Visualize Dijkstra's Algorithm onClick */
    visualizeDijkstra () {
        const src = newGrid[src_row][src_col];
        const dst = newGrid[dst_row][dst_col];
        const result = Dijkstra(newGrid, src, dst);
        const shortestPathLength = result[0];
        const time = result[1];
        const newclass = "shortest-path-length path-found";
        setTimeout(() => {
            document.getElementsByClassName("shortest-path-length")[0].className = newclass;
            document.getElementsByClassName("shortest-path-length")[0].innerHTML = "Total cost associated with Minimum Cost Path is " + shortestPathLength;
            document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        }, 40*time);
        setPathClear(false);
        console.log(shortestPathLength);
    }

    /* Visualize Bellman Ford Algorithm onClick */
    visualizeBellmanFord () {
        const src = newGrid[src_row][src_col];
        const dst = newGrid[dst_row][dst_col];
        const result = BellmanFord(newGrid, src, dst);
        const shortestPathLength = result[0];
        const time = result[1];
        const newclass = "shortest-path-length path-found";
        setTimeout(() => {
            document.getElementsByClassName("shortest-path-length")[0].className = newclass;
            document.getElementsByClassName("shortest-path-length")[0].innerHTML = "Total cost associated with Minimum Cost Path is " + shortestPathLength;
            document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        }, 10*time);
        setPathClear(false);
        console.log(shortestPathLength);
    }

    /* Visualize Floyd Warshall Algorithm onClick */
    visualizeFloydWarshall () {
        const src = newGrid[src_row][src_col];
        const dst = newGrid[dst_row][dst_col];
        const result = FloydWarshall(newGrid, src, dst);
        const shortestPathLength = result[0];
        const time = result[1];
        const newclass = "shortest-path-length path-found";
        setTimeout(() => {
            document.getElementsByClassName("shortest-path-length")[0].className = newclass;
            document.getElementsByClassName("shortest-path-length")[0].innerHTML = "Total cost associated with Minimum Cost Path is " + shortestPathLength;
            document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Select Algorithm to Visualize';
        }, 10*time);
        setPathClear(false);
        console.log(shortestPathLength);
    }

    handleClickBFS () {
        console.log("BFS got selected");
        chooseAlgorithm("BFS");
        setPathClear(true);
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = '';
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                    var x = document.getElementById(`node-${node.x}-${node.y}`);
                    x.querySelector(".weighted").innerHTML= "";
                }, 5);
            }
        }
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Visualize Breadth First Search';
    }

    handleClickDijkstra () {
        console.log("Dijkstra got selected");
        chooseAlgorithm("Dijkstra");
        setPathClear(true);
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = '';
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                    var x = document.getElementById(`node-${node.x}-${node.y}`);
                    x.querySelector(".weighted").innerHTML= newGrid[i][j].weight;
                }, 5);
            }
        }
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Visualize Dijkstra\'s Algorithm';
    }

    handleClickBellmanFord () {
        console.log("Bellman Ford got selected");
        chooseAlgorithm("BellmanFord");
        setPathClear(true);
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = '';
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                    var x = document.getElementById(`node-${node.x}-${node.y}`);
                    x.querySelector(".weighted").innerHTML= newGrid[i][j].weight;
                }, 5);
            }
        }
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Visualize Bellman Ford Algorithm';
    }

    handleClickFloydWarshall () {
        console.log("Floyd Warshall got selected");
        chooseAlgorithm("FloydWarshall");
        setPathClear(true);
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                setTimeout(() => {
                    var node = newGrid[i][j];
                    var newClass = '';
                    if (node.x===src_row && node.y===src_col) {
                        newClass = 'node-src';
                    }
                    else if (node.x===dst_row && node.y===dst_col) {
                        newClass = 'node-dst';
                    }
                    else {
                        newClass = 'node-other';
                    }
                    document.getElementById(`node-${node.x}-${node.y}`).className = newClass;
                    var x = document.getElementById(`node-${node.x}-${node.y}`);
                    x.querySelector(".weighted").innerHTML= newGrid[i][j].weight;
                }, 5);
            }
        }
        const newclass = "shortest-path-length path-not-found";
        document.getElementsByClassName("shortest-path-length")[0].className = newclass;
        document.getElementsByClassName("shortest-path-length")[0].innerHTML = "";
        document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Visualize Floyd Warshall Algorithm';
    }

    initiateVisualizer () {
        if (!isPathClear) {
            alert("Clear Path First");
        }
        else if (selectedAlgorithm==="BFS") {
            document.getElementsByClassName("current-algorithm")[0].innerHTML = 'Visualize BFS Algorithm';
            this.visualizeBFS();
        }
        else if (selectedAlgorithm==="Dijkstra") {
            this.visualizeDijkstra();
        }
        else if (selectedAlgorithm==="BellmanFord") {
            this.visualizeBellmanFord();
        }
        else if (selectedAlgorithm==="FloydWarshall") {
            this.visualizeFloydWarshall();
        }
        else {
            alert("First Select an Algorithm to Visualize");
        }
        selectedAlgorithm = "";
    }

    render () {
        const {grid} = this.state;

        return (
            <div className="full-grid">

                <div className="dropdown grid">
                    <button className="btn btn-primary dropdown-toggle a-selector" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Algorithm</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item mybutton" href="#" onClick={() => this.handleClickBFS()}>Breadth First Search</button>
                        <button className="dropdown-item mybutton" href="#" onClick={() => this.handleClickDijkstra()}>Dijkstra's Algorithm</button>
                        <button className="dropdown-item mybutton" href="#" onClick={() => this.handleClickBellmanFord()}>Bellman Ford Algorithm</button>
                        <button className="dropdown-item mybutton" href="#" onClick={() => this.handleClickFloydWarshall()}>Floyd Warshall Algorithm</button>
                    </div>

                    <button className="btn btn-primary mybutton edit-button" onClick={() => this.reconfigureGrid()}>
                        Reconfigure Grid
                    </button>
                    <button className="btn btn-primary mybutton current-algorithm" id="calgo" onClick={() => this.initiateVisualizer()}>
                        Select Algorithm to Visualize
                    </button>
                    <button className="btn btn-primary mybutton" onClick={() => this.clearPath()}>
                        Clear Path
                    </button>
                </div>

                <div className="nodeGrid">
                    {grid.map((row, rowIndex) => {
                    return (<div key={rowIndex} className="grid">
                        {row.map((col, colIndex) => {
                            const {isSrc, isDst, isOther, weight} = col;
                            return (
                                <Node 
                                    key={colIndex} 
                                    isSrc={isSrc} 
                                    isDst={isDst} 
                                    weight={weight}
                                    isOther={isOther}
                                    row={rowIndex} 
                                    col={colIndex}
                                />
                            )
                        })}
                    </div>)
                })}
                </div>

                <div id="shortest-path-notifier">
                    <p className="shortest-path-length"></p>
                </div>

            </div>
        );
    }
}

class Pair {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.weight = generateRandomNumber(1, 50);
        this.isSrc = (i===src_row && j===src_col);
        this.isDst = (i===dst_row && j===dst_col);
        this.isOther = ((i!==src_row || j!==src_col) && (i!==dst_row || j!==dst_col));
        this.adjacentNodes = [];
        this.getAdjacentNodes = function(grid) {
            for (let k=0; k<4; k++) {
                let r = this.x + dx[k];
                let c = this.y + dy[k];
                if (isValidPair(r, c)) {
                   this.adjacentNodes.push(grid[r][c]); 
                }
            }
        }
    }
}

function createGrid () {
    const grid = new Array(rows);
        for (let i=0; i<rows; i++) {
            grid[i] = new Array(cols);
        }
        createPair(grid);
        addAdjacentNodes(grid);
        newGrid = grid;
        return newGrid;
}

function createPair(grid) {
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            grid[i][j] = new Pair(i, j);
        }
    }
}

function isValidPair(i, j) {
    return (i >= 0 && j >= 0 && i < rows && j < cols);
}

function addAdjacentNodes(grid) {
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            grid[i][j].getAdjacentNodes(grid);
        }
    }
}

function resetSourceAndDestination() {
    src_row = generateRandomNumber(0, 9);
    src_col = generateRandomNumber(0, 9);
    dst_row = generateRandomNumber(0, 9);
    if (src_row === dst_row) {
        if (src_row > 0) {
            dst_row = src_row - 1;
        }else {
            dst_row = src_row + 1;
        }
    }
    dst_col = generateRandomNumber(0, 9);
}

function chooseAlgorithm(newAlgorithm) {
    selectedAlgorithm = newAlgorithm;
}

function setPathClear(current_status) {
    isPathClear = current_status;
}