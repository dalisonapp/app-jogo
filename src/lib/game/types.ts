export type BubbleColor = string;

export interface GridBubble {
  row: number;
  col: number;
  color: BubbleColor;
  x: number;
  y: number;
}

export interface FlyingBubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: BubbleColor;
}

export interface FallingBubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: BubbleColor;
}

export interface PoppingBubble {
  x: number;
  y: number;
  color: BubbleColor;
  radius: number;
  alpha: number;
}
