import { BUBBLE_RADIUS, BUBBLE_DIAMETER, ROW_HEIGHT, GRID_COLS, CANVAS_WIDTH, CANVAS_HEIGHT, COLORS, MAX_MISSES, SHOOT_SPEED } from './constants';
import { GridBubble, FlyingBubble, FallingBubble, PoppingBubble, BubbleColor } from './types';
import { getBubbleCenter, generateInitialGrid, findMatches, findFloatingBubbles } from './grid';

export class GameEngine {
  status: 'start' | 'playing' | 'paused' | 'gameover' = 'start';
  grid: GridBubble[] = [];
  flyingBubble: FlyingBubble | null = null;
  fallingBubbles: FallingBubble[] = [];
  poppingBubbles: PoppingBubble[] = [];
  currentBubbleColor: BubbleColor = COLORS[0];
  nextBubbleColor: BubbleColor = COLORS[1];
  score: number = 0;
  misses: number = 0;
  ceilingOffset: number = 0;
  mouseX: number = CANVAS_WIDTH / 2;
  mouseY: number = 0;
  
  onStateChange?: () => void;

  constructor() {
    this.reset();
  }

  reset() {
    this.grid = generateInitialGrid(5); // Start with 5 rows
    this.currentBubbleColor = this.getRandomColor();
    this.nextBubbleColor = this.getRandomColor();
    this.score = 0;
    this.misses = 0;
    this.ceilingOffset = 0;
    this.flyingBubble = null;
    this.fallingBubbles = [];
    this.poppingBubbles = [];
    this.status = 'playing';
    this.notify();
  }

  getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  setMousePos(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  shoot() {
    if (this.status !== 'playing' || this.flyingBubble) return;

    const startX = CANVAS_WIDTH / 2;
    const startY = CANVAS_HEIGHT - BUBBLE_RADIUS;
    
    const dx = this.mouseX - startX;
    const dy = this.mouseY - startY;
    const angle = Math.atan2(dy, dx);
    
    // Prevent shooting downwards or too horizontally
    if (angle > -0.1 || angle < -Math.PI + 0.1) return;

    this.flyingBubble = {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * SHOOT_SPEED,
      vy: Math.sin(angle) * SHOOT_SPEED,
      color: this.currentBubbleColor
    };
    
    this.notify();
  }

  update(dt: number) {
    if (this.status !== 'playing') return;
    
    let needsNotify = false;

    // We cap dt to avoid huge jumps if tab was inactive
    const cappedDt = Math.min(dt, 32);
    // Our physics is currently frame-based (assuming ~60fps).
    // We can scale velocity by (cappedDt / 16.66) if we want time-based,
    // but fixed step is fine for this casual game.
    const timeScale = cappedDt / 16.66;

    // Update flying bubble
    if (this.flyingBubble) {
      this.flyingBubble.x += this.flyingBubble.vx * timeScale;
      this.flyingBubble.y += this.flyingBubble.vy * timeScale;
      
      // Wall collision
      if (this.flyingBubble.x - BUBBLE_RADIUS <= 0) {
        this.flyingBubble.x = BUBBLE_RADIUS;
        this.flyingBubble.vx *= -1;
      } else if (this.flyingBubble.x + BUBBLE_RADIUS >= CANVAS_WIDTH) {
        this.flyingBubble.x = CANVAS_WIDTH - BUBBLE_RADIUS;
        this.flyingBubble.vx *= -1;
      }
      
      // Collision detection
      let collided = false;
      if (this.flyingBubble.y - BUBBLE_RADIUS <= this.ceilingOffset * ROW_HEIGHT) {
        collided = true;
      } else {
        for (const bubble of this.grid) {
          const dx = this.flyingBubble.x - bubble.x;
          const dy = this.flyingBubble.y - bubble.y;
          const distSq = dx * dx + dy * dy;
          if (distSq <= (BUBBLE_DIAMETER - 2) * (BUBBLE_DIAMETER - 2)) {
            collided = true;
            break;
          }
        }
      }
      
      if (collided) {
        this.handleCollision();
      }
      needsNotify = true;
    }

    // Update falling bubbles
    if (this.fallingBubbles.length > 0) {
      for (let i = this.fallingBubbles.length - 1; i >= 0; i--) {
        const b = this.fallingBubbles[i];
        b.x += b.vx * timeScale;
        b.y += b.vy * timeScale;
        b.vy += 0.5 * timeScale; // gravity
        if (b.y > CANVAS_HEIGHT + BUBBLE_RADIUS) {
          this.fallingBubbles.splice(i, 1);
        }
      }
      needsNotify = true;
    }

    // Update popping bubbles
    if (this.poppingBubbles.length > 0) {
      for (let i = this.poppingBubbles.length - 1; i >= 0; i--) {
        const b = this.poppingBubbles[i];
        b.radius += 2 * timeScale;
        b.alpha -= 0.1 * timeScale;
        if (b.alpha <= 0) {
          this.poppingBubbles.splice(i, 1);
        }
      }
      needsNotify = true;
    }

    if (needsNotify) this.notify();
  }

  handleCollision() {
    if (!this.flyingBubble) return;

    const { row, col } = this.getClosestEmptySlot(this.flyingBubble.x, this.flyingBubble.y);
    const { x, y } = getBubbleCenter(row, col, this.ceilingOffset);
    
    const newBubble: GridBubble = {
      row, col, color: this.flyingBubble.color, x, y
    };
    
    this.grid.push(newBubble);
    this.flyingBubble = null;
    
    const matches = findMatches(this.grid, newBubble);
    if (matches.length >= 3) {
      this.grid = this.grid.filter(b => !matches.includes(b));
      this.score += matches.length * 10;
      
      matches.forEach(m => {
        this.poppingBubbles.push({ x: m.x, y: m.y, color: m.color, radius: BUBBLE_RADIUS, alpha: 1 });
      });
      
      const floating = findFloatingBubbles(this.grid);
      if (floating.length > 0) {
        this.grid = this.grid.filter(b => !floating.includes(b));
        this.score += floating.length * 20;
        
        floating.forEach(f => {
          this.fallingBubbles.push({
            x: f.x, y: f.y, color: f.color,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * -5 - 2 // initial upward bounce
          });
        });
      }
    } else {
      this.misses++;
      if (this.misses >= MAX_MISSES) {
        this.misses = 0;
        this.ceilingOffset++;
        this.grid.forEach(b => {
          const pos = getBubbleCenter(b.row, b.col, this.ceilingOffset);
          b.x = pos.x;
          b.y = pos.y;
        });
      }
    }
    
    // Check Game Over
    const bottomLimit = CANVAS_HEIGHT - BUBBLE_DIAMETER * 2;
    if (this.grid.some(b => b.y + BUBBLE_RADIUS >= bottomLimit)) {
      this.status = 'gameover';
    } else {
      this.currentBubbleColor = this.nextBubbleColor;
      // Ensure we only spawn colors that exist in the grid, unless grid is empty
      const existingColors = Array.from(new Set(this.grid.map(b => b.color)));
      if (existingColors.length > 0) {
        this.nextBubbleColor = existingColors[Math.floor(Math.random() * existingColors.length)];
      } else {
        this.nextBubbleColor = this.getRandomColor();
      }
    }
    
    // Win condition
    if (this.grid.length === 0) {
      this.status = 'gameover'; // Or 'win'
    }
  }

  getClosestEmptySlot(x: number, y: number) {
    let bestDist = Infinity;
    let bestR = 0;
    let bestC = 0;
    
    const estRow = Math.max(0, Math.round((y - this.ceilingOffset * ROW_HEIGHT - BUBBLE_RADIUS) / ROW_HEIGHT));
    
    for (let r = Math.max(0, estRow - 2); r <= estRow + 2; r++) {
      const maxCols = r % 2 === 0 ? GRID_COLS : GRID_COLS - 1;
      for (let c = 0; c < maxCols; c++) {
        if (!this.grid.some(b => b.row === r && b.col === c)) {
          const center = getBubbleCenter(r, c, this.ceilingOffset);
          const dSq = (center.x - x)**2 + (center.y - y)**2;
          if (dSq < bestDist) {
            bestDist = dSq;
            bestR = r;
            bestC = c;
          }
        }
      }
    }
    return { row: bestR, col: bestC };
  }

  notify() {
    if (this.onStateChange) {
      this.onStateChange();
    }
  }
}
