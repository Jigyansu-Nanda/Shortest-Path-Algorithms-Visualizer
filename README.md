![Preview of Bellman-Ford Algorithm Visualization](https://github.com/Jigyansu-Nanda/Shortest-Path-Algorithms-Visualizer/blob/source-code/preview.png "preview of Bellman Ford Shortest Path")
# Shortest Path Algorithms Visualizer
### Live version of this web application: [Shortest Path Algorithms Visualizer.](https://jigyansu-nanda.github.io/Shortest-Path-Algorithms-Visualizer/)
Welcome to Shortest Path Algorithms Visualizer. This is a visualization tool to help you visualize how the algorithms, used for solving Shortest Path Problem, work in real time. [Shortest Path Problem](https://en.wikipedia.org/wiki/Shortest_path_problem) in graph theory, is a [Combinatorial Optimization](https://en.wikipedia.org/wiki/Combinatorial_optimization) problem. The problem requires one, to find a path between a source vertex and a destination vertex, such that travelling through the found path, costs the least. The weight of an edge joining two vertices is attributed as the cost of tarvelling between those two vertices in the graph.

## Graph in the visualizer
The Visualizer computes the shortest path between a source vertex and a destination vertex on a 2-D Grid. Here, the graph can be visualized as 2-D grid, with each cell of the grid as a possible vertex of graph and the values represented by each cell represents the cost of travelling through that vertex. Travelling from one cell to another cell is only possible if and only if, they share one common edge. i.e. **possible moves from cell(i, j)**:

  - towards **Top: Cell (i-1, j)**
  - towards **Right: Cell (i, j+1)**
  - towards **Bottom: Cell (i+1, j)**
  - towards **Left: Cell (i, j-1)**

## Implemented Algorithms
This visualizer implements 4 shortest path finding algorithms:

  - **For unweighted Graph**
    - [Breadth First Search](https://en.wikipedia.org/wiki/Breadth-first_search)
  - **For weighted Graph**
    - [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
    - [Bellman Ford Algorithm](https://en.wikipedia.org/wiki/Bellman–Ford_algorithm)
    - [Floyd Warshall Algorithm](https://en.wikipedia.org/wiki/Floyd–Warshall_algorithm)

# Instructions
Follow these instructions for visualization.
  - Reset weights, source vertex and destination vertex by clicking on **`Reconfigure Grid`** <br/><br/>
  ![Reconfigure Grid](https://github.com/Jigyansu-Nanda/Shortest-Path-Algorithms-Visualizer/blob/source-code/reconfigure-grid.png)
  - Select an algorithm to visualize by clicking on **`Select Algorithm`** <br/><br/>
  ![Select Algorithm](https://github.com/Jigyansu-Nanda/Shortest-Path-Algorithms-Visualizer/blob/source-code/select-algorithm.png)
  - Visualize selected algorithm by clicking on **`Visualize Algorithm`** <br/><br/>
  ![Visualize Algorithm](https://github.com/Jigyansu-Nanda/Shortest-Path-Algorithms-Visualizer/blob/source-code/visualize.png)
  - Clear shortest path by clicking on **`Clear Path`** <br/><br/>
  ![Clear Path](https://github.com/Jigyansu-Nanda/Shortest-Path-Algorithms-Visualizer/blob/source-code/clear-path.png)
