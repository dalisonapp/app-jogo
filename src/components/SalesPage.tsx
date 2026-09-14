import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  Zap,
  Flame,
  ShieldCheck,
  Smartphone,
  Monitor,
  Trophy,
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Gamepad2,
} from 'lucide-react';

interface SalesPageProps {
  onPlay: () => void;
  highScore?: number;
}

export function SalesPage({ onPlay, highScore = 0 }: SalesPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-16">
      {/* Sticky Header / Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400">
              BUBBLES 2
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Edição Oficial Web
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
            <a href="#features" className="hover:text-white transition-colors">
              Recursos
            </a>
            <a href="#how-to-play" className="hover:text-white transition-colors">
              Como Jogar
            </a>
            <a href="#compare" className="hover:text-white transition-colors">
              Vantagens
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Dúvidas
            </a>
          </div>

          {highScore > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-300 font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Seu Recorde: {highScore}</span>
            </div>
          )}

          {/* Primary Navbar CTA Button */}
          <button
            type="button"
            onClick={onPlay}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>JOGAR GRÁTIS</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>O Bubble Shooter Mais Viciante da Web</span>
            <span className="text-amber-400">★ 4.9/5</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
            Estoure Bolhas, Crie Combos Épicos e{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400">
              Domine o Tabuleiro!
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed mb-8 sm:mb-10">
            A evolução definitiva do clássico dos arcades. Física precisa de ricochete nas paredes, avalanches de bolhas desconectadas e diversão instantânea no seu navegador.
          </p>

          {/* Big CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              type="button"
              onClick={onPlay}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>JOGAR GRÁTIS AGORA</span>
              <ArrowRight className="w-5 h-5 opacity-80" />
            </button>

            <a
              href="#how-to-play"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-base text-slate-300 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Instruções</span>
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl text-xs sm:text-sm text-slate-400">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Grátis Para Sempre</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sem Instalação (0 MB)</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Celular & Computador</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <Flame className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Física Fluida a 60 FPS</span>
            </div>
          </div>
        </div>

        {/* Interactive Game Showcase Card */}
        <div className="mt-14 relative max-w-3xl mx-auto">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-blue-500/30 via-indigo-500/20 to-slate-900 border border-slate-800 shadow-2xl shadow-indigo-950/50 overflow-hidden">
            <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
              {/* Simulated arcade board preview */}
              <div className="w-full flex justify-between items-center pb-4 border-b border-slate-800 mb-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="font-semibold text-slate-300 ml-2">Bubbles 2 Arena v2.0</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-400">60 FPS</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">LIVE</span>
                </div>
              </div>

              {/* Decorative bubbles grid preview */}
              <div className="w-full max-w-sm flex flex-col items-center gap-2 py-6">
                <div className="flex gap-2 justify-center">
                  <div className="w-9 h-9 rounded-full bg-rose-500 shadow-lg shadow-rose-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40 border border-white/30" />
                </div>
                <div className="flex gap-2 justify-center -mt-1">
                  <div className="w-9 h-9 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-rose-500 shadow-lg shadow-rose-500/40 border border-white/30" />
                </div>
                <div className="flex gap-2 justify-center -mt-1">
                  <div className="w-9 h-9 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 border border-white/30" />
                  <div className="w-9 h-9 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/40 border border-white/30" />
                </div>

                {/* Cannon shooter graphic */}
                <div className="mt-8 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-xl shadow-blue-500/50 border-2 border-white flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-16 h-4 rounded-full bg-slate-800 mt-2 border border-slate-700" />
                </div>
              </div>

              {/* Action Banner over preview */}
              <div className="w-full mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h3 className="font-bold text-white text-base">Pronto para a ação?</h3>
                  <p className="text-xs text-slate-400">Clique para abrir o tabuleiro e começar a atirar.</p>
                </div>

                <button
                  type="button"
                  onClick={onPlay}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>ENTRAR NA PARTIDA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Mecânicas Inovadoras</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">Por que o Bubbles 2 é tão viciante?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ricochete nas Paredes</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Use as bordas laterais para desviar de obstáculos e acertar aglomerados escondidos no topo do tabuleiro com tiros de tabela.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Avalanches de Gravidade</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Corte a sustentação de bolhas conectadas ao teto e veja dezenas caírem de uma só vez, garantindo bônus massivos de pontuação.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tensão do Teto Descendente</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A cada sequência de erros, o teto com espigões metálicos desce um nível. Mantenha a pontaria afiada antes que cruzem a linha final!
            </p>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto bg-slate-900/30 rounded-3xl border border-slate-800/80 my-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Guia Rápido</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">Como Jogar em 3 Passos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 font-black text-xl flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-2">Mire com Precisão</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              No computador, mova o mouse para apontar a mira. No celular, toque e arraste o dedo na tela para ajustar o ângulo.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-black text-xl flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-2">Junte 3 da Mesma Cor</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Dispare para conectar 3 ou mais bolhas de cor idêntica. Elas estouram instantaneamente liberando espaço no tabuleiro.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xl flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-2">Limpe Todo o Tabuleiro</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Elimine todas as esferas antes que elas ultrapassem a linha vermelha inferior para bater seu recorde histórico!
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={onPlay}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-500/30 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>COMEÇAR UMA PARTIDA AGORA</span>
          </button>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="compare" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Comparativo</h2>
          <p className="text-3xl font-black text-white">Bubbles 2 vs Jogos Antigos</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                <th className="p-4 font-semibold">Recurso</th>
                <th className="p-4 font-bold text-blue-400">Bubbles 2 (Nossa Versão)</th>
                <th className="p-4 font-semibold text-slate-500">Outros Jogos Flash/Web</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-4 font-medium">Tempo de Carregamento</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Instantâneo (&lt; 1s)
                </td>
                <td className="p-4 text-slate-500">Lento (vários downloads)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Anúncios Obrigatórios Interrompendo</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Zero Anúncios Bloqueantes
                </td>
                <td className="p-4 text-slate-500">Popups a cada 2 minutos</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Suporte para Celular</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Controles Touch Suaves
                </td>
                <td className="p-4 text-slate-500">Geralmente quebrado ou bugado</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Física de Ricochete</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Cálculo Matemático Preciso
                </td>
                <td className="p-4 text-slate-500">Ângulos travados e imprecisos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Comunidade</h2>
          <p className="text-3xl font-black text-white">O que os jogadores estão dizendo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic mb-4">
              "Sensacional! Roda lisinho no navegador do celular, sem travamento e sem precisar baixar nada na loja."
            </p>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">Lucas S.</span>
              <span className="text-[11px] text-slate-400 block">Jogador diário</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic mb-4">
              "A física de ricochete é perfeita. Dá pra fazer jogadas incríveis nas tabelas e derrubar o tabuleiro todo de uma vez."
            </p>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">Renata M.</span>
              <span className="text-[11px] text-slate-400 block">Fã de quebra-cabeças</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic mb-4">
              "Lembrei das tardes jogando na web nos anos 2000, só que com gráficos modernos e resposta muito mais rápida!"
            </p>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">Thiago B.</span>
              <span className="text-[11px] text-slate-400 block">Casual Gamer</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">FAQ</h2>
          <p className="text-3xl font-black text-white">Perguntas Frequentes</p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              q: 'O jogo é realmente gratuito?',
              a: 'Sim, 100% gratuito! Você pode jogar quantas partidas quiser sem nenhum custo, sem cadastros obrigatórios e sem compras no aplicativo.',
            },
            {
              q: 'Preciso instalar ou baixar alguma coisa?',
              a: 'Não! Bubbles 2 roda direto no seu navegador web (Chrome, Safari, Edge, Firefox). Basta clicar em "Jogar Grátis" e a partida começa na mesma hora.',
            },
            {
              q: 'Funciona em smartphones e tablets?',
              a: 'Sim! O jogo foi desenvolvido com suporte completo a toque na tela para celulares Android e iOS, adaptando-se perfeitamente ao tamanho do seu display.',
            },
            {
              q: 'Como funciona o teto descendo?',
              a: 'Cada tiro que não estoura pelo menos 3 bolhas conta como um erro (miss). Após 5 erros, o teto metálico desce um nível, aumentando a emoção do desafio!',
            },
          ].map((item, index) => (
            <div key={index} className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full px-5 py-4 text-left flex justify-between items-center font-bold text-white text-sm sm:text-base hover:bg-slate-800/50 transition-colors"
              >
                <span>{item.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-blue-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Conversion Banner */}
      <section className="mt-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Pronto para quebrar todos os recordes?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-lg mb-8">
              Junte-se a milhares de jogadores agora mesmo. É grátis, rápido e não requer download.
            </p>
            <button
              type="button"
              onClick={onPlay}
              className="px-10 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>JOGAR GRÁTIS AGORA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-400">
        <p>© 2026 Bubbles 2 Arcade. Todos os direitos reservados.</p>
        <p className="mt-1 text-slate-400">Desenvolvido para máxima diversão casual na web.</p>
      </footer>
    </div>
  );
}
