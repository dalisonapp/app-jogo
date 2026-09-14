import React, { useState, useEffect, useMemo } from 'react';
import { GameEngine } from './lib/game/engine';
import { GameCanvas } from './components/GameCanvas';
import { SalesPage } from './components/SalesPage';
import { Home, ArrowLeft, RotateCcw, Trophy, Pause, Play } from 'lucide-react';

export default function App() {
  const engine = useMemo(() => new GameEngine(), []);
  const [currentView, setCurrentView] = useState<'sales' | 'game'>('sales');
  const [gameState, setGameState] = useState(engine.status);
  const [score, setScore] = useState(engine.score);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bubbles2_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });
  const [misses, setMisses] = useState(engine.misses);
  const [nextColor, setNextColor] = useState(engine.nextBubbleColor);

  useEffect(() => {
    engine.onStateChange = () => {
      setGameState(engine.status);
      setScore(engine.score);
      setMisses(engine.misses);
      setNextColor(engine.nextBubbleColor);

      if (engine.score > highScore) {
        setHighScore(engine.score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bubbles2_highscore', String(engine.score));
        }
      }
    };
    return () => {
      engine.onStateChange = undefined;
    };
  }, [engine, highScore]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && engine.status === 'playing' && currentView === 'game') {
        engine.status = 'paused';
        engine.notify();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [engine, currentView]);

  const handleStartGame = () => {
    setCurrentView('game');
    engine.reset();
  };

  const handleBackToSales = () => {
    if (engine.status === 'playing') {
      engine.status = 'paused';
      engine.notify();
    }
    setCurrentView('sales');
  };

  const handleTogglePause = () => {
    if (engine.status === 'playing') {
      engine.status = 'paused';
    } else if (engine.status === 'paused') {
      engine.status = 'playing';
    }
    engine.notify();
  };

  if (currentView === 'sales') {
    return <SalesPage onPlay={handleStartGame} highScore={highScore} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 sm:p-4 font-sans text-slate-100 select-none">
      <div className="max-w-md w-full flex flex-col gap-3">
        {/* Navigation Bar & Header */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={handleBackToSales}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            title="Voltar à Página de Vendas / Início"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Página Inicial</span>
          </button>

          <div className="flex items-center gap-2">
            {highScore > 0 && (
              <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{highScore}</span>
              </div>
            )}

            {gameState === 'playing' || gameState === 'paused' ? (
              <button
                type="button"
                onClick={handleTogglePause}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={gameState === 'paused' ? 'Continuar Jogo' : 'Pausar Jogo'}
              >
                {gameState === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            ) : null}
          </div>
        </div>

        {/* HUD: Score, Next & Misses */}
        <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-800">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Score</span>
            <span className="text-2xl font-black text-white">{score}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Next</span>
              <div
                className="w-6 h-6 rounded-full shadow-inner border border-white/20"
                style={{ backgroundColor: nextColor }}
              />
            </div>

            <div className="flex flex-col items-end">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Misses</span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i < misses ? 'bg-red-500 shadow-sm shadow-red-500' : 'bg-slate-800 border border-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-[440/640] w-full max-h-[70vh] mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          <GameCanvas engine={engine} />

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 mb-6 drop-shadow-lg">
                BUBBLES 2
              </h1>
              <p className="text-slate-300 text-sm max-w-xs mb-8">
                Mire com o mouse ou toque, junte 3 bolhas da mesma cor e não deixe o teto descer!
              </p>
              <button
                type="button"
                onClick={() => engine.reset()}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-purple-500/30 text-white cursor-pointer"
              >
                COMEÇAR AGORA
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <h2 className="text-4xl font-black text-red-500 mb-2">FIM DE JOGO</h2>
              <p className="text-slate-300 mb-6 text-lg">
                Pontuação Final: <span className="text-white font-bold">{score}</span>
              </p>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => engine.reset()}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>JOGAR NOVAMENTE</span>
                </button>

                <button
                  type="button"
                  onClick={handleBackToSales}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Voltar para a Página Inicial</span>
                </button>
              </div>
            </div>
          )}

          {/* Pause Overlay */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <h2 className="text-3xl font-black text-white mb-6">JOGO PAUSADO</h2>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  <span>CONTINUAR</span>
                </button>

                <button
                  type="button"
                  onClick={() => engine.reset()}
                  className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>REINICIAR</span>
                </button>

                <button
                  type="button"
                  onClick={handleBackToSales}
                  className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Voltar à Página Inicial</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls Hint */}
        <div className="flex items-center justify-between px-1 text-slate-400 text-xs">
          <span>Mire com o mouse ou dedo e clique para disparar.</span>
          <button
            type="button"
            onClick={handleBackToSales}
            className="hover:text-slate-200 underline cursor-pointer"
          >
            Apresentação
          </button>
        </div>
      </div>
    </div>
  );
}

