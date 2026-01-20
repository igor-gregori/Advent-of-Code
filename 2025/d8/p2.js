import { realInput } from "./input";

const input = realInput;

function parseInput(input) {
  return input.map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });
}

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
    this.numCircuits = size;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false;
    }

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.numCircuits--;
    return true;
  }

  isFullyConnected() {
    return this.numCircuits === 1;
  }

  getCircuitSizes() {
    const circuits = {};
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      circuits[root] = (circuits[root] || 0) + 1;
    }
    return Object.values(circuits);
  }
}

function solve(input) {
  const points = parseInput(input);
  const n = points.length;

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({
        i,
        j,
        dist: distance(points[i], points[j]),
      });
    }
  }

  edges.sort((a, b) => a.dist - b.dist);

  const uf = new UnionFind(n);
  let lastConnection = null;

  for (const edge of edges) {
    if (uf.union(edge.i, edge.j)) {
      lastConnection = edge;
      if (uf.isFullyConnected()) {
        break;
      }
    }
  }

  if (lastConnection) {
    const x1 = points[lastConnection.i].x;
    const x2 = points[lastConnection.j].x;
    const result = x1 * x2;

    console.log(
      `Last connection: ${input[lastConnection.i]} <-> ${input[lastConnection.j]}`,
    );
    console.log(`X coordinates: ${x1} × ${x2} = ${result}`);

    return result;
  }

  return null;
}

const result = solve(input);
console.log(`Result: ${result}`);
