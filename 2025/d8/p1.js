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
    return true;
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

function solve(input, connectionsToMake) {
  const points = parseInput(input);
  const n = points.length;

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({ i, j, dist: distance(points[i], points[j]) });
    }
  }

  edges.sort((a, b) => a.dist - b.dist);

  const uf = new UnionFind(n);
  let connectionsMade = 0;

  for (const edge of edges) {
    uf.union(edge.i, edge.j);
    connectionsMade++;
    if (connectionsMade >= connectionsToMake) break;
  }

  const circuitSizes = uf.getCircuitSizes();
  circuitSizes.sort((a, b) => b - a);

  const threeLargest = circuitSizes.slice(0, 3);
  const result = threeLargest.reduce((prod, size) => prod * size, 1);

  console.log(`After ${connectionsToMake} connections:`);
  console.log(`Circuit sizes: ${circuitSizes.join(", ")}`);
  console.log(`Three largest: ${threeLargest.join(" × ")} = ${result}`);

  return result;
}

solve(input, input.length / 2);
