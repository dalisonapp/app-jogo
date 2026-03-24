import { BUBBLE_RADIUS, BUBBLE_DIAMETER, ROW_HEIGHT, GRID_COLS, COLORS } from './constants';
import { GridBubble } from './types';

export function getBubbleCenter(row: number, col: number, ceilingOffset: number = 0): { x: number, y: number } {
  const x = col * BUBBLE_DIAMETER + BUBBLE_RADIUS + (row % 2 !== 0 ? BUBBLE_RADIUS : 0);
  const y = row * ROW_HEIGHT + BUBBLE_RADIUS + ceilingOffset * ROW_HEIGHT;
  return { x, y };
}

export function getNeighbors(row: number, col: number): { row: number, col: number }[] {
  const isOdd = row % 2 !== 0;
  const neighbors = [
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
    { row: row - 1, col: col },
    { row: row + 1, col: col },
    { row: row - 1, col: isOdd ? col + 1 : col - 1 },
    { row: row + 1, col: isOdd ? col + 1 : col - 1 },
  ];
  
  return neighbors.filter(n => {
    const maxCols = n.row % 2 === 0 ? GRID_COLS : GRID_COLS - 1;
    return n.row >= 0 && n.col >= 0 && n.col < maxCols;
  });
}

export function generateInitialGrid(rows: number): GridBubble[] {
  const grid: GridBubble[] = [];
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? GRID_COLS : GRID_COLS - 1;
    for (let c = 0; c < cols; c++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const { x, y } = getBubbleCenter(r, c);
      grid.push({ row: r, col: c, color, x, y });
    }
  }
  return grid;
}

export function findMatches(grid: GridBubble[], startBubble: GridBubble): GridBubble[] {
  const matches: GridBubble[] = [];
  const visited = new Set<string>();
  const queue: GridBubble[] = [startBubble];
  const targetColor = startBubble.color;
  
  visited.add(`${startBubble.row},${startBubble.col}`);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    matches.push(current);
    
    const neighbors = getNeighbors(current.row, current.col);
    for (const n of neighbors) {
      const key = `${n.row},${n.col}`;
      if (!visited.has(key)) {
        const neighborBubble = grid.find(b => b.row === n.row && b.col === n.col);
        if (neighborBubble && neighborBubble.color === targetColor) {
          visited.add(key);
          queue.push(neighborBubble);
        }
      }
    }
  }
  
  return matches;
}

export function findFloatingBubbles(grid: GridBubble[]): GridBubble[] {
  const connected = new Set<string>();
  const queue: GridBubble[] = [];
  
  for (const bubble of grid) {
    if (bubble.row === 0) {
      connected.add(`${bubble.row},${bubble.col}`);
      queue.push(bubble);
    }
  }
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    const neighbors = getNeighbors(current.row, current.col);
    
    for (const n of neighbors) {
      const key = `${n.row},${n.col}`;
      if (!connected.has(key)) {
        const neighborBubble = grid.find(b => b.row === n.row && b.col === n.col);
        if (neighborBubble) {
          connected.add(key);
          queue.push(neighborBubble);
        }
      }
    }
  }
  
  return grid.filter(b => !connected.has(`${b.row},${b.col}`));
}
