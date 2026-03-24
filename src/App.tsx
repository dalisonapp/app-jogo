/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GameEngine } from './lib/game/engine';
import { GameCanvas } from './components/GameCanvas';

export default function App() {
  const engine = useMemo(() => new GameEngine(), []);
  const [gameState, setGameState] = useState(engine.status);
  const [score, setScore] = useState(engine.score);
  const [misses, setMisses] = useState(engine.misses);
  const [nextColor, setNextColor] = useState(engine.nextBubbleColor);

  useEffect(() => {
    engine.onStateChange = () => {
      setGameState(engine.status);
      setScore(engine.score);
      setMisses(engine.misses);
      setNextColor(engine.nextBubbleColor);
    };
    return () => {
      engine.onStateChange = undefined;
    };
  }, [engine]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && engine.status === 'playing') {
        engine.status = 'paused';
        engine.notify();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [engine]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-md w-full flex flex-col gap-4">
        
        {/* Header / HUD */}
        <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-800">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Score</span>
            <span className="text-2xl font-black text-white">{score}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Next</span>
              <div 
                className="w-6 h-6 rounded-full shadow-inner border border-black/20"
                style={{ backgroundColor: nextColor }}
              />
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Misses</span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < misses ? 'bg-red-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-[440/640] w-full max-h-[70vh] mx-auto">
          <GameCanvas engine={engine} />
          
          {/* Overlays */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 mb-8 drop-shadow-lg">
                BUBBLES 2
              </h1>
              <button 
                onClick={() => engine.reset()}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-purple-500/30"
              >
                PLAY NOW
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center rounded-lg">
              <h2 className="text-4xl font-black text-red-500 mb-2">GAME OVER</h2>
              <p className="text-slate-300 mb-8 text-lg">Final Score: <span className="text-white font-bold">{score}</span></p>
              <button 
                onClick={() => engine.reset()}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform shadow-xl"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
          
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <h2 className="text-3xl font-bold text-white mb-8">PAUSED</h2>
              <button 
                onClick={() => { engine.status = 'playing'; engine.notify(); }}
                className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-400 transition-colors"
              >
                RESUME
              </button>
            </div>
          )}
        </div>
        
        {/* Controls Hint */}
        <div className="text-center text-slate-500 text-sm">
          Aim with mouse/touch, click/tap to shoot.
        </div>
      </div>
    </div>
  );
}
