import React, { useState, useEffect } from "react";
import { 
  Star, 
  Lock, 
  Zap, 
  Download, 
  Check, 
  Printer, 
  BookOpen, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  X, 
  Award, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  Eye, 
  FileCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Crown,
  Scroll,
  User,
  Leaf,
  Baby,
  Smile,
  Gift,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";


const TESTIMONIAL_IMAGES = [
  "https://i.ibb.co/cK4yKJrd/dp02.webp",
  "https://i.ibb.co/yBB34TQ1/dp05.webp",
  "https://i.ibb.co/Rk2J6MrX/dp03.webp"
];

const CAROUSEL_ONE_IMAGES = [
  "https://i.ibb.co/wFqYnVFb/01.png",
  "https://i.ibb.co/Z62TjN6h/02.png",
  "https://i.ibb.co/nhy8KzS/03.png",
  "https://i.ibb.co/B5ygLsy0/04.png",
  "https://i.ibb.co/N0tFB2B/05.png",
  "https://i.ibb.co/jkynfZKB/06.png",
  "https://i.ibb.co/XxQJvsTk/07.png",
  "https://i.ibb.co/pBC44Y0x/08.png",
  "https://i.ibb.co/kgSS4hCQ/09.png",
  "https://i.ibb.co/60Q9YmNx/10.png",
  "https://i.ibb.co/6c1pv0Xx/11.png",
  "https://i.ibb.co/7JJNgVd4/12.png",
  "https://i.ibb.co/whLVVxh5/13.png",
  "https://i.ibb.co/hJCZRHqM/14.png",
  "https://i.ibb.co/fd0wfZpG/15.png",
  "https://i.ibb.co/rGXScKQ2/16.png",
  "https://i.ibb.co/rRc1VthF/17.png",
  "https://i.ibb.co/vvsHMfWP/18.png",
  "https://i.ibb.co/HDKkdpyv/19.png",
  "https://i.ibb.co/jP0PVQTQ/20.png",
  "https://i.ibb.co/Gv7QbNC0/21.png",
  "https://i.ibb.co/dwv9RqRV/22.png",
  "https://i.ibb.co/fYSsWPqS/23.png",
  "https://i.ibb.co/zVwpXHCK/24.png",
  "https://i.ibb.co/DP0wnmmJ/25.png"
];

const CAROUSEL_TWO_IMAGES = [
  "https://i.ibb.co/0jKddRwj/26.png",
  "https://i.ibb.co/Wp6xP8CB/27.png",
  "https://i.ibb.co/bRJhQzxY/28.png",
  "https://i.ibb.co/qLMcXz2y/29.png",
  "https://i.ibb.co/N2H09r92/30.png",
  "https://i.ibb.co/N6wnsFpg/31.png",
  "https://i.ibb.co/4Z3h7Dp4/32.png",
  "https://i.ibb.co/G4ryWWts/33.png",
  "https://i.ibb.co/xKznyg3r/34.png",
  "https://i.ibb.co/gLVHVKXJ/35.png",
  "https://i.ibb.co/vvjfsKxL/36.png",
  "https://i.ibb.co/r2JY0bLy/37.png",
  "https://i.ibb.co/5x1zZpVQ/38.png",
  "https://i.ibb.co/7J9RDG75/39.png",
  "https://i.ibb.co/v46L4J43/40.png",
  "https://i.ibb.co/qFJvCZmw/41salmos.png",
  "https://i.ibb.co/fzPjvkCj/42.png",
  "https://i.ibb.co/prNvf9sJ/43.png",
  "https://i.ibb.co/b5DN1qTx/44.png",
  "https://i.ibb.co/zVqf1j64/45.png",
  "https://i.ibb.co/8D9CNMHp/46.png",
  "https://i.ibb.co/99BJHcmN/47.png",
  "https://i.ibb.co/pBr0PrSg/48.png",
  "https://i.ibb.co/DP6PwpyF/49.png",
  "https://i.ibb.co/LzVmkR8p/50.png"
];


export default function App() {
  // Real-time 9 minutes countdown timer (540 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(540);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Checkout simulation state
  const [checkoutStep, setCheckoutStep] = useState<"form" | "processing" | "success">("form");
  const [checkoutName, setCheckoutName] = useState<string>("");
  const [checkoutEmail, setCheckoutEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Audio state (discreet click or confirmation sound placeholder)
  const playSfx = () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, context.currentTime);
      gainNode.gain.setValueAtTime(0.02, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
    } catch (e) {
      // Ignored if browser blocks audio autoplay context
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 540)); // Restart at 9 mins when hitting 0 to keep offer active
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    playSfx();
  };

  const startCheckout = () => {
    setIsCheckoutOpen(true);
    setCheckoutStep("form");
    playSfx();
  };

  const scrollToOffer = () => {
    document.getElementById("oferta-principal")?.scrollIntoView({ behavior: "smooth" });
    playSfx();
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail) return;
    
    setCheckoutStep("processing");
    playSfx();
    
    setTimeout(() => {
      setCheckoutStep("success");
      playSfx();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased relative selection:bg-brand-lightgold selection:text-brand-darkblue overflow-x-hidden">
      
      {/* 1. NO TOPO: Barra Horizontal Azul Escuro e Contador Regressivo */}
      <div id="top-promo-banner" className="bg-brand-darkblue border-b border-brand-gold/20 py-2.5 px-4 text-center sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm">
          <div className="flex items-center gap-2 text-brand-lightgold font-medium tracking-wide">
            <span className="inline-block animate-pulse text-lg">⚡</span>
            <span>Oferta Especial por Tempo Limitado</span>
          </div>
          
          <div className="flex items-center gap-2 text-white">
            <span className="text-white/70 text-xs uppercase tracking-widest font-semibold mr-1">A oferta termina em:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-base bg-black/40 border border-brand-gold/30 px-3 py-0.5 rounded-md text-brand-lightgold shadow-inner">
              <span>{formatNumber(minutes)}</span>
              <span className="animate-pulse">:</span>
              <span>{formatNumber(seconds)}</span>
            </div>
            <span className="text-[11px] text-brand-lightgold/80 italic font-medium hidden sm:inline-block">
              (95% das vagas esgotadas hoje)
            </span>
          </div>
        </div>
      </div>

      {/* Main Container Wrapper with generous white space and organic background grid pattern */}
      <main className="relative py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Subtle Luxury Decorative Background Details */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-brand-gold filter blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-brand-blue filter blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#C89B3C_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>

        {/* 2. ABAIXO: Selo arredondado branco com borda dourada (pequeno) */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="premium-seal"
          className="inline-flex items-center gap-1 bg-white border border-brand-gold/40 px-2.5 py-0.5 rounded-full shadow-xs hover:shadow-sm transition-shadow duration-300 mb-4 cursor-default overflow-hidden max-w-full"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
            <Star className="w-2 h-2 text-brand-gold fill-brand-gold" />
          </div>
          <span className="text-[8.5px] sm:text-[10px] uppercase tracking-wider font-bold text-brand-darkblue font-sans whitespace-nowrap">
            Coleção Premium <span className="text-brand-gold mx-0.5">•</span> +150 Modelos Exclusivos
          </span>
        </motion.div>

        {/* 3. HEADLINE: Título grande centralizado e tipografia elegante em Poppins */}
        <div id="headline-container" className="text-center max-w-4xl mx-auto mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-poppins font-extrabold tracking-tight text-brand-darkblue leading-[1.2]"
          >
            +150 <span className="text-brand-blue font-poppins font-extrabold">Marcadores Cristãos</span><br/>
            de Páginas<br/>
            <span className="text-brand-gold font-poppins block mt-2.5 font-bold text-xl sm:text-2xl md:text-3.5xl tracking-wide uppercase">
              prontos para imprimir
            </span>
          </motion.h1>
        </div>

        {/* 4. MOCKUP: Imagem limpa sem fundo branco ou bordas decorativas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          id="mockup-container"
          className="relative max-w-2xl w-full mb-4 group flex justify-center"
        >
          <div className="relative overflow-hidden rounded-xl max-w-md">
            <img 
              src="https://i.ibb.co/1f20PDCS/Chat-GPT-Image-26-de-jun-de-2026-14-43-43.png" 
              alt="Mockup do Kit +150 Marcadores Cristãos" 
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={448}
              height={448}
              className="w-full h-auto object-cover rounded-xl"
              id="mockup-image"
            />
          </div>
        </motion.div>

        {/* 5. SUBTÍTULO: Texto menor centralizado */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          id="subtitle"
          className="text-center max-w-2xl mx-auto mb-5 text-brand-text/90 px-2"
        >
          <p className="text-sm sm:text-base leading-relaxed">
            Uma coleção exclusiva de marcadores Cristãos em alta resolução para imprimir e utilizar em sua Bíblia, livros, devocionais, presentes, lembranças e evangelismo.
          </p>
        </motion.div>

        {/* 6. BOTÃO: Grande, 420px de largura aproximada, cor #D4A63C, hover #B88A24 */}
        <div id="cta-button-container" className="w-full flex flex-col items-center gap-3 mb-3 z-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToOffer}
            className="w-full max-w-[420px] bg-[#D4A63C] hover:bg-[#B88A24] text-white font-sans text-sm sm:text-base font-bold tracking-wider py-3.5 sm:py-4 px-6 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center animate-shimmer relative overflow-hidden flex items-center justify-center gap-2.5 border-b-4 border-[#9C751E] whitespace-nowrap flex-nowrap"
            id="main-cta-button"
          >
            <Zap className="w-4 h-4 text-white fill-white animate-bounce shrink-0" />
            <span className="whitespace-nowrap">QUERO MEUS MARCADORES</span>
          </motion.button>
        </div>

        {/* 7. ABAIXO DO BOTÃO: Três itens discretos pequenos e sem fundo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          id="trust-indicators"
          className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-1.5 text-center text-[10px] text-brand-text/70 font-sans px-4 mb-10"
        >
          <div className="flex items-center gap-0.5">
            <span>🔒</span>
            <span className="font-semibold text-brand-darkblue">Compra 100% Segura</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span>⚡</span>
            <span className="font-semibold text-brand-darkblue">Acesso Imediato</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span>📥</span>
            <span className="font-semibold text-brand-darkblue">Download Instantâneo</span>
          </div>
        </motion.div>

        {/* --- SECTION 5: GALERIA DE MODELOS EXCLUSIVOS --- */}
        <section id="exclusive-gallery-section" className="w-full bg-white py-12 mt-2 mb-8 border-t border-[#C89B3C]/10 overflow-hidden relative content-visibility-auto">

          <div className="text-center max-w-3xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0F3157] tracking-tight mb-3 leading-tight">
              Veja o que você vai Receber
            </h2>
            
            {/* Highlighting phrase */}
            <div className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E4C97A]/15 rounded-full border border-[#C89B3C]/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B3C] shrink-0 animate-pulse" />
              <p className="text-[11px] sm:text-xs text-[#0F3157] font-semibold font-sans">
                Conheça alguns dos mais de 150 modelos disponíveis.
              </p>
            </div>
          </div>

          {/* Imagem Premium Substituta dos Carrosséis com Nitidez Realçada e no Limite Máximo da Página (Edge-to-Edge) */}
          <div className="w-full mt-6">
            <img 
              src="https://i.ibb.co/7tWhdZ7t/Chat-GPT-Image-3-de-jul-de-2026-11-26-51.png" 
              alt="Descubra uma coleção exclusiva de Marcadores Cristãos Premium"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover sm:object-contain contrast-[1.04] saturate-[1.03] brightness-[1.01] transition-all duration-300"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Segunda Imagem Premium logo abaixo com espaçamento sutil para perfeita continuidade visual */}
          <div className="w-full mt-3">
            <img 
              src="https://i.ibb.co/6JyKX0pN/Chat-GPT-Image-3-de-jul-de-2026-13-00-23.webp" 
              alt="Modelos de Marcadores Cristãos Detalhes"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover sm:object-contain contrast-[1.04] saturate-[1.03] brightness-[1.01] transition-all duration-300"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Terceira Imagem Premium logo abaixo com espaçamento sutil para perfeita continuidade visual */}
          <div className="w-full mt-3">
            <img 
              src="https://i.ibb.co/qLCtrWG2/Chat-GPT-Image-3-de-jul-de-2026-14-32-20.webp" 
              alt="Mais Modelos de Marcadores Cristãos Detalhes"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover sm:object-contain contrast-[1.04] saturate-[1.03] brightness-[1.01] transition-all duration-300"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Botão de CTA para a coleção */}
          <div className="w-full flex flex-col items-center gap-3 mt-8 px-4 z-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToOffer}
              className="w-full max-w-[420px] bg-[#D4A63C] hover:bg-[#B88A24] text-white font-sans text-sm sm:text-base font-bold tracking-wider py-3.5 sm:py-4 px-6 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center animate-shimmer relative overflow-hidden flex items-center justify-center gap-2.5 border-b-4 border-[#9C751E] whitespace-nowrap"
              id="gallery-cta-button"
            >
              <Zap className="w-4 h-4 text-white fill-white animate-bounce shrink-0" />
              <span>QUERO ESSA COLEÇÃO</span>
            </motion.button>
          </div>

        </section>

        {/* --- SECTION 2: PROVA SOCIAL (TESTIMONIALS) --- */}
        <section id="social-proof-section" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-2 mb-2 border-t border-brand-gold/15 content-visibility-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-brand-darkblue tracking-tight mb-3">
              Quem já adquiriu, recomenda
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2B2B]/95 leading-relaxed font-sans">
              Veja o que nossos clientes estão dizendo sobre os Marcadores Cristãos Premium. Milhares de pessoas já imprimiram, presentearam familiares, utilizaram em suas Bíblias e ficaram encantadas com a qualidade da coleção.
            </p>
          </div>

          {/* Testimonial cards grid: 3 per row on desktop, 1 per row on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIAL_IMAGES.map((imgUrl, index) => (
              <div 
                key={index}
                className="flex flex-col justify-center items-center overflow-hidden"
              >
                <img 
                  src={imgUrl} 
                  alt={`Depoimento de cliente ${index + 1}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={350}
                  height={450}
                  className="w-full h-auto rounded-2xl border border-[#C89B3C]/20 p-1 bg-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: COMO UTILIZAR (3 PASSO) --- */}
        <section id="how-to-use-section" className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-2 mb-6 content-visibility-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0F3157] tracking-tight mb-3 max-w-xl mx-auto leading-tight">
              Em apenas 3 passos<br className="hidden sm:inline" /> seus marcadores estarão prontos
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2B2B]/90 leading-relaxed font-sans">
              Baixe, imprima e utilize. Em poucos minutos você terá marcadores cristãos premium para acompanhar sua leitura da Bíblia, devocionais, estudos e momentos de oração.
            </p>
          </div>

          {/* Centered Image replacing the Card */}
          <div className="w-full max-w-4xl mx-auto flex justify-center items-center rounded-[24px] overflow-hidden border border-[#C89B3C]/10 shadow-sm bg-white p-2">
            <img 
              src="https://i.ibb.co/S8PTmG7/Chat-GPT-Image-26-de-jun-de-2026-18-36-39.png"
              alt="Passos para usar os Marcadores Cristãos Premium"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              width={896}
              height={500}
              className="w-full h-auto rounded-[18px] object-contain"
            />
          </div>

          {/* Section Footer */}
          <div className="text-center mt-8 px-4">
            <p className="text-xs sm:text-sm font-serif italic font-semibold text-[#0F3157] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
              Simples, rápido e feito para fortalecer sua caminhada com Deus todos os dias.
              <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            </p>
          </div>
        </section>

        {/* --- SECTION 4: SITUAÇÕES PERFEITAS (QUEM AMA A PALAVRA DE DEUS) --- */}
        <section id="perfect-for-section" className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-2 mb-10 content-visibility-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0F3157] tracking-tight mb-2">
              Para cada momento da sua caminhada com Deus
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed font-sans max-w-2xl mx-auto">
              Uma coleção criada para acompanhar sua Bíblia, seus devocionais, seus estudos, sua igreja e cada oportunidade de compartilhar a Palavra de Deus.
            </p>
          </div>

          {/* Grid Moderno de 6 Cards Premium e Compactos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <BookOpen className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para sua Bíblia
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Marque capítulos, versículos e estudos bíblicos com marcadores elegantes que tornam cada momento de leitura ainda mais especial.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <Scroll className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para seus devocionais
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Acompanhe seus momentos de oração, reflexão e comunhão com Deus utilizando marcadores inspiradores.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <Gift className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para presentear
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Surpreenda amigos, familiares, irmãos da igreja e pessoas especiais com um presente cristão bonito e significativo.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <Crown className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para igrejas e ministérios
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Ideal para escolas bíblicas, grupos de estudo, células, congressos, retiros, evangelismo e eventos cristãos.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <Bookmark className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para seus livros
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Use também em livros cristãos, devocionais, estudos bíblicos e materiais de discipulado.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-sm hover:border-[#C89B3C]/40 hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 flex flex-col text-left border border-[#C89B3C]/15 relative group">
              <div className="w-9 h-9 rounded-xl bg-[#E4C97A]/10 border border-[#C89B3C]/20 flex items-center justify-center mb-3.5">
                <Heart className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h3 className="text-sm sm:text-base font-poppins font-bold text-[#0F3157] mb-1.5">
                Para evangelizar
              </h3>
              <p className="text-[11px] sm:text-xs text-[#2B2B2B]/80 leading-relaxed font-sans">
                Compartilhe a Palavra de Deus através de um presente simples, bonito e cheio de significado.
              </p>
            </div>

          </div>
        </section>





        {/* --- SECTION 6: CATEGORIAS E ORGANIZAÇÃO PREMIUM --- */}
        <section id="collections-grid-section" className="w-full bg-[#0F3157] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden content-visibility-auto">
          
          {/* Subtle decorative background lights to feel extremely high-end */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#154979]/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#154979]/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* Header Content */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-white leading-tight tracking-tight mb-4">
                <span className="text-[#C89B3C]">+150 Marcadores Cristãos</span> organizados em 16 coleções exclusivas
              </h2>
              <p className="text-sm sm:text-base text-[#E7EEF7] leading-relaxed max-w-2xl mx-auto font-sans">
                Uma coleção completa criada para fortalecer sua caminhada com Deus. 
                Encontre marcadores para leitura da Bíblia, estudos, devocionais, presentes, evangelismo e muito mais.
              </p>
            </div>

            {/* Compact Modern Grid of Horizontal Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "Jesus Cristo", count: 25 },
                { name: "Profetas", count: 15 },
                { name: "Homens da Bíblia", count: 10 },
                { name: "Mulheres da Bíblia", count: 10 },
                { name: "Anjos", count: 10 },
                { name: "Salmos", count: 10 },
                { name: "Cruz e Salvação", count: 10 },
                { name: "Apóstolos", count: 10 },
                { name: "Milagres de Jesus", count: 10 },
                { name: "Natureza Cristã", count: 10 },
                { name: "Versículos Populares", count: 10 },
                { name: "Coleção Infantil", count: 10 },
                { name: "Coleção Feminina", count: 10 },
                { name: "Promessas de Deus", count: 5 },
                { name: "Fé e Esperança", count: 5 },
                { name: "Amor e Graça", count: 5 }
              ].map((category, index) => {
                return (
                  <div 
                    key={index}
                    className="bg-[#154979] rounded-[16px] p-3 sm:p-3.5 flex items-center justify-between shadow-xs border border-white/5 hover:border-[#C89B3C]/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-default"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-2">
                      {/* Category Name */}
                      <span className="text-white font-sans font-medium text-xs sm:text-sm tracking-wide leading-tight break-words">
                        {category.name}
                      </span>
                    </div>

                    {/* Gold Badge */}
                    <div className="bg-[#C89B3C] text-white font-sans font-bold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      {category.count}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* --- SECTION 7: PACOTE COMPLETO --- */}
        <section id="full-package-section" className="w-full bg-gradient-to-b from-[#F8F6F2] to-[#FFFDFC] py-10 px-4 sm:px-6 lg:px-8 border-y-2 border-[#C89B3C]/30 overflow-hidden relative shadow-inner content-visibility-auto">
          
          {/* Subtle elegant glowing background decorations to make it standout */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            
            {/* Title & Subtitle with Poppins Font */}
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-[#0F3157] leading-tight tracking-tight mb-3">
                Tudo o que você irá receber
              </h2>
              <p className="text-sm sm:text-base text-[#2B2B2B]/90 leading-relaxed max-w-2xl mx-auto font-sans">
                Receba acesso imediato a uma coleção exclusiva com <strong className="text-[#0F3157] font-semibold">+150 Marcadores Cristãos Premium</strong>, desenvolvidos em alta resolução e prontos para imprimir quantas vezes desejar.
              </p>
            </div>

            
            {/* Large Premium Card */}
            <div className="bg-white rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-md border border-[#C89B3C]/20 transition-all duration-300">
              
              {/* Product Mockup - Fully visible, uncut */}
              <div className="w-full flex justify-center mb-4">
                <div className="relative rounded-2xl overflow-hidden shadow-sm max-w-2xl w-full border border-neutral-100 bg-neutral-50 flex items-center justify-center p-2">
                  <img 
                    src="https://i.ibb.co/bjswWkF7/Chat-GPT-Image-26-de-jun-de-2026-20-55-33.png" 
                    alt="Mockup do Pacote Completo"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width={672}
                    height={480}
                    className="w-full h-auto object-contain max-h-[480px] transition-transform duration-700 hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Text details */}
              <div className="text-center max-w-2xl mx-auto">
                <p className="text-[10px] sm:text-xs font-bold text-[#C89B3C] tracking-widest uppercase mb-2">
                  PRODUTO PRINCIPAL
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0F3157] leading-tight mb-4">
                  +150 Marcadores Cristãos Premium para Imprimir
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#2B2B2B]/90 leading-relaxed mb-4 font-sans">
                  Uma coleção cuidadosamente desenvolvida para fortalecer sua caminhada com Deus através da leitura da Palavra. 
                  São mais de <strong className="text-[#0F3157] font-semibold">150 modelos exclusivos</strong>, organizados por temas bíblicos, prontos para baixar, imprimir e utilizar sempre que desejar.
                </p>

                {/* Checklist with elegant green icons - forced 2 columns for both desktop and mobile */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left bg-[#F8F6F2]/70 p-4 sm:p-6 rounded-2xl border border-[#C89B3C]/10 mb-4 max-w-xl mx-auto">
                  {[
                    "+150 modelos exclusivos",
                    "Arquivos em alta resolução",
                    "Formato PDF pronto para impressão",
                    "Tamanho 5x18 cm",
                    "Ideal para Bíblia, livros e devocionais",
                    "Temas organizados em categorias",
                    "Impressão ilimitada",
                    "Download imediato",
                    "Compatível com qualquer impressora",
                    "Utilize papel comum ou papel fotográfico"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 sm:gap-2.5">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </div>
                      <span className="text-[10px] sm:text-xs md:text-sm text-[#2B2B2B]/90 font-medium font-sans leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Premium gold banner */}
                <div className="bg-[#E4C97A]/15 border border-[#C89B3C]/20 rounded-xl p-4 sm:p-5 text-center shadow-xs">
                  <p className="text-xs sm:text-sm text-[#0F3157] font-medium leading-relaxed font-sans">
                    ✨ <strong>E ainda não acaba aqui...</strong>
                  </p>
                  <p className="text-xs sm:text-sm text-[#0F3157] mt-1 font-sans">
                    Você também receberá <strong className="text-[#C89B3C] font-semibold">3 bônus exclusivos</strong> sem custo adicional.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* --- SECTION 8: BÔNUS EXCLUSIVOS --- */}
        <section id="exclusive-bonuses-section" className="w-full bg-[#F8F6F2] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#C89B3C]/25 relative overflow-hidden content-visibility-auto">
          
          {/* Elegant background graphics */}
          <div className="absolute top-10 right-10 w-80 h-80 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0F3157]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* Header / Cabeçalho */}
            <div className="text-center mb-6">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-[#0F3157] leading-tight tracking-tight max-w-3xl mx-auto">
                Você ainda vai receber <br />
                <span className="text-[#C89B3C]">3 Bônus exclusivos:</span>
              </h2>
            </div>


            {/* Bonus Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
              
              {/* BÔNUS 01 */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-[#C89B3C]/15 flex flex-col group hover:-translate-y-1">
                
                {/* Mockup image container - compact and closer to text */}
                <div className="relative h-52 bg-[#F8F6F2] flex items-center justify-center p-3">
                  <div className="w-full h-full border border-[#C89B3C]/20 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center shadow-xs">
                    <img 
                      src="https://i.ibb.co/cKc1VSFm/img01.png" 
                      alt="Mockup Bônus 01" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={250}
                      height={200}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Card content - Centered and tightly packed */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center">
                  <div>
                    {/* Badge above title */}
                    <div className="mb-2">
                      <span className="bg-[#0F3157]/10 text-[#0F3157] font-sans text-[11px] font-bold px-3 py-1 rounded-full border border-[#0F3157]/20 tracking-wider uppercase inline-block">
                        🎁 BÔNUS 01
                      </span>
                    </div>

                    <h3 className="text-xl font-poppins font-bold text-[#0F3157] mb-2 leading-tight">
                      Guia de Impressão Perfeita
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed mb-4 font-sans">
                      Aprenda a imprimir seus marcadores com acabamento profissional: papel ideal, gramatura, recorte, plastificação e muito mais.
                    </p>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-4 border-t border-neutral-100 text-center">
                    <span className="text-xs sm:text-sm text-red-500 line-through font-sans font-semibold block mb-1">
                      De R$47
                    </span>
                    <div className="w-full py-1 text-emerald-600 font-sans font-bold text-sm sm:text-base tracking-wider uppercase select-none">
                      Por apenas R$00,00
                    </div>
                  </div>
                </div>

              </div>

              {/* BÔNUS 02 */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-[#C89B3C]/15 flex flex-col group hover:-translate-y-1">
                
                {/* Mockup image container - compact and closer to text */}
                <div className="relative h-52 bg-[#F8F6F2] flex items-center justify-center p-3">
                  <div className="w-full h-full border border-[#C89B3C]/20 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center shadow-xs">
                    <img 
                      src="https://i.ibb.co/wFH6NYqV/img02.png" 
                      alt="Mockup Bônus 02" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={250}
                      height={200}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Card content - Centered and tightly packed */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center">
                  <div>
                    {/* Badge above title */}
                    <div className="mb-2">
                      <span className="bg-[#0F3157]/10 text-[#0F3157] font-sans text-[11px] font-bold px-3 py-1 rounded-full border border-[#0F3157]/20 tracking-wider uppercase inline-block">
                        🎁 BÔNUS 02
                      </span>
                    </div>

                    <h3 className="text-xl font-poppins font-bold text-[#0F3157] mb-2 leading-tight">
                      +50 Marcadores Infantis Cristãos
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed mb-4 font-sans">
                      Uma coleção exclusiva de marcadores infantis com histórias bíblicas para aproximar as crianças da Palavra de Deus.
                    </p>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-4 border-t border-neutral-100 text-center">
                    <span className="text-xs sm:text-sm text-red-500 line-through font-sans font-semibold block mb-1">
                      De R$67
                    </span>
                    <div className="w-full py-1 text-emerald-600 font-sans font-bold text-sm sm:text-base tracking-wider uppercase select-none">
                      Por apenas R$00,00
                    </div>
                  </div>
                </div>

              </div>

              {/* BÔNUS 03 */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-[#C89B3C]/15 flex flex-col group hover:-translate-y-1">
                
                {/* Mockup image container - compact and closer to text */}
                <div className="relative h-52 bg-[#F8F6F2] flex items-center justify-center p-3">
                  <div className="w-full h-full border border-[#C89B3C]/20 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center shadow-xs">
                    <img 
                      src="https://i.ibb.co/1GnmMvkT/img03.png" 
                      alt="Mockup Bônus 03" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={250}
                      height={200}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Card content - Centered and tightly packed */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center">
                  <div>
                    {/* Badge above title */}
                    <div className="mb-2">
                      <span className="bg-[#0F3157]/10 text-[#0F3157] font-sans text-[11px] font-bold px-3 py-1 rounded-full border border-[#0F3157]/20 tracking-wider uppercase inline-block">
                        🎁 BÔNUS 03
                      </span>
                    </div>

                    <h3 className="text-xl font-poppins font-bold text-[#0F3157] mb-2 leading-tight">
                      +100 Devocionais Cristãos
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed mb-4 font-sans">
                      Uma coleção exclusiva de devocionais com versículos, reflexões, aplicações práticas e orações para fortalecer sua fé diariamente.
                    </p>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-4 border-t border-neutral-100 text-center">
                    <span className="text-xs sm:text-sm text-red-500 line-through font-sans font-semibold block mb-1">
                      De R$97
                    </span>
                    <div className="w-full py-1 text-emerald-600 font-sans font-bold text-sm sm:text-base tracking-wider uppercase select-none">
                      Por apenas R$00,00
                    </div>
                  </div>
                </div>

              </div>

            </div>


            {/* Section Footer: Large Elegant Gold Callout Card */}
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#E4C97A]/25 to-[#C89B3C]/20 border-2 border-[#C89B3C]/40 rounded-[28px] p-6 sm:p-8 text-center shadow-md relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C89B3C]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#E4C97A]/10 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-[10px] sm:text-xs font-bold text-[#0F3157] tracking-widest uppercase block mb-2 font-sans">
                Valor total dos bônus
              </span>

              <h3 className="text-4xl sm:text-5xl font-poppins font-black text-[#0F3157] tracking-tight mb-3 group-hover:scale-105 transition-transform duration-300">
                R$ 211,00
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-[#2B2B2B] leading-relaxed font-sans max-w-xl mx-auto">
                Hoje você recebe todos esses bônus gratuitamente junto com sua coleção de <strong className="text-[#0F3157] font-semibold">+150 Marcadores Cristãos Premium</strong>, sem pagar nada a mais.
              </p>
            </div>

            {/* Botão de CTA para os Bônus */}
            <div className="w-full flex flex-col items-center gap-3 mt-8 px-4 z-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToOffer}
                className="w-full max-w-[420px] bg-[#D4A63C] hover:bg-[#B88A24] text-white font-sans text-sm sm:text-base font-bold tracking-wider py-3.5 sm:py-4 px-6 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center animate-shimmer relative overflow-hidden flex items-center justify-center gap-2.5 border-b-4 border-[#9C751E] whitespace-nowrap"
                id="bonus-cta-button"
              >
                <Zap className="w-4 h-4 text-white fill-white animate-bounce shrink-0" />
                <span>QUERO MEUS BÔNUS</span>
              </motion.button>
            </div>

          </div>
        </section>


        {/* --- SECTION 9: SEÇÃO DE OFERTA PRINCIPAL --- */}
        <section id="oferta-principal" className="w-full bg-[#F8F6F2] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#C89B3C]/25 relative overflow-hidden content-visibility-auto">
          
          {/* Decorative elements */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto relative z-10">

            {/* Card Principal */}
            <div className="bg-white rounded-[24px] shadow-xl border border-[#C89B3C]/15 overflow-hidden max-w-2xl mx-auto p-5 sm:p-8 transition-all duration-300 hover:shadow-2xl">
              
              {/* Selo Dourado Centralizado */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full border border-[#C89B3C]/30 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89B3C] animate-pulse" />
                  <span className="text-[10px] sm:text-xs text-[#0F3157] font-black tracking-widest font-sans uppercase">
                    ✨ OFERTA ESPECIAL
                  </span>
                </div>
              </div>

              {/* Mockup (Larger and beautifully presented) */}
              <div className="w-full flex justify-center mb-6">
                <div className="relative rounded-2xl overflow-hidden border border-[#C89B3C]/15 bg-gradient-to-br from-[#FDFCFB] to-[#F8F6F2] p-4 flex items-center justify-center shadow-sm w-full max-w-xl">
                  <img 
                    src="https://i.ibb.co/1f20PDCS/Chat-GPT-Image-26-de-jun-de-2026-14-43-43.png" 
                    alt="Mockup +150 Marcadores Cristãos Premium" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width={576}
                    height={350}
                    className="w-full h-auto max-h-[350px] object-contain rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>


              {/* Nome do Produto */}
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F3157] tracking-tight">
                  +150 Marcadores Cristãos Premium para Imprimir
                </h3>
                <div className="w-16 h-0.5 bg-[#C89B3C] mx-auto mt-2 rounded-full"></div>
              </div>


              {/* Checklist com bônus incorporados na mesma lista */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6 bg-[#FDFCFB] p-5 rounded-xl border border-neutral-100">
                {[
                  "+150 marcadores exclusivos",
                  "Formato 5x18 cm",
                  "PDF pronto para impressão",
                  "Impressão ilimitada",
                  "Organizados em 16 categorias cristãs",
                  "Ideal para Bíblia, livros e devocionais",
                  "🎁 Bônus 01: Guia de Impressão Perfeita",
                  "🎁 Bônus 02: +50 Marcadores Infantis Cristãos",
                  "🎁 Bônus 03: +100 Devocionais Cristãos"
                ].map((item, i) => {
                  const isBonus = item.startsWith("🎁");
                  return (
                    <div key={i} className={`flex items-start gap-2.5 ${isBonus ? 'bg-amber-500/5 p-1 rounded border border-amber-500/10' : ''}`}>
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={`text-xs sm:text-sm font-sans ${isBonus ? 'text-[#0F3157] font-bold' : 'text-neutral-700 font-medium'}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>


              {/* Área de Preço (Larger numbers and elegant layout) */}
              <div className="text-center mb-6 bg-[#F8F6F2]/40 py-5 px-3 rounded-xl border border-neutral-100">
                <span className="text-xs sm:text-sm text-red-500 line-through font-sans block mb-1">
                  De R$ 67,90
                </span>
                
                <span className="text-xs text-neutral-500 tracking-wider uppercase block mb-1 font-bold">
                  Hoje por apenas
                </span>
                
                <div className="text-6xl sm:text-7xl font-poppins font-black text-[#C89B3C] tracking-tight mb-2 drop-shadow-xs whitespace-nowrap">
                  R$ 19,90
                </div>

                <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs text-[#0F3157] font-semibold font-sans">
                  <span>• Pagamento único</span>
                  <span>• Sem mensalidades</span>
                  <span>• Acesso imediato</span>
                </div>
              </div>


              {/* Botão de CTA com animação e texto em uma única linha */}
              <div className="mb-4">
                <motion.a 
                  href="https://pay.kiwify.com.br/En6PrGz"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playSfx}
                  className="w-full py-4.5 sm:py-5 bg-gradient-to-r from-[#C89B3C] to-[#E4C97A] hover:from-[#B88A24] hover:to-[#D4B55C] text-white font-poppins font-black text-sm sm:text-lg md:text-xl lg:text-2xl rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 border-b-4 border-[#9C751E] whitespace-nowrap flex-nowrap px-6 sm:px-8"
                >
                  <span className="whitespace-nowrap">⭐ GARANTIR MINHA COLEÇÃO ⭐</span>
                </motion.a>
              </div>


              {/* Rodapé do Card - Extremamente Compacto e Próximo ao Botão */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1.5 text-neutral-500 mt-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold font-sans tracking-wide text-neutral-600">
                    Compra 100% Segura
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
                  <span className="text-xs font-bold font-sans tracking-wide text-neutral-600">
                    Acesso Imediato
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* --- SECTION 10: GARANTIA DE 7 DIAS --- */}
        <section id="garantia-7-dias" className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8 border-t border-neutral-100 relative overflow-hidden content-visibility-auto">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-gradient-to-br from-[#FDFCFB] to-[#F8F6F2] rounded-[32px] p-6 sm:p-10 border border-[#C89B3C]/25 shadow-lg flex flex-col md:flex-row items-center gap-8">
              
              {/* Badge/Seal */}
              <div className="relative flex-shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#C89B3C] to-[#E4C97A] p-1.5 shadow-lg flex items-center justify-center relative group">
                  <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-white/40"></div>
                  <div className="w-full h-full rounded-full bg-[#0F3157] flex flex-col items-center justify-center text-center p-3 text-white">
                    <span className="font-poppins font-black text-4xl sm:text-5xl text-[#E4C97A] leading-none">7</span>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#E4C97A] mt-0.5">Dias</span>
                    <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white/80 mt-1">Garantia</span>
                  </div>
                </div>
                {/* Decorative sparkles */}
                <div className="absolute -top-1 -right-1 bg-[#E4C97A] text-[#0F3157] rounded-full p-1 shadow-xs animate-bounce">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 rounded-full border border-emerald-500/20 shadow-3xs mb-3.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider">
                    COMPRA 100% SEGURA & INCONDICIONAL
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-poppins font-bold text-[#0F3157] tracking-tight mb-3">
                  Garantia Incondicional de 7 Dias
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed font-medium">
                  Adquira com total segurança. Você tem 7 dias completos para testar todo o material. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro de forma imediata e sem burocracia.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* --- SECTION 11: PERGUNTAS FREQUENTES (FAQ) --- */}
        <section id="faq-section" className="w-full bg-[#F8F6F2] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#C89B3C]/20 content-visibility-auto">
          <div className="max-w-3xl mx-auto">
            
            {/* Cabeçalho do FAQ */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C89B3C]/10 text-[#C89B3C] rounded-full border border-[#C89B3C]/25 shadow-3xs mb-3">
                <span className="text-base">❓</span>
                <span className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-widest text-[#C89B3C]">
                  Tire suas dúvidas
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0F3157] tracking-tight mb-3">
                Perguntas Frequentes
              </h2>
              
              <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-2xl mx-auto leading-relaxed">
                Encontre abaixo as respostas para as dúvidas mais comuns sobre a coleção <strong className="text-[#0F3157] font-semibold">+150 Marcadores Cristãos Premium</strong>. Caso ainda precise de ajuda, nossa equipe estará à disposição.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3 mb-12">
              {[
                {
                  question: "Como vou receber os marcadores?",
                  answer: "Após a confirmação do pagamento, você receberá imediatamente um e-mail com o link para baixar todos os arquivos digitais."
                },
                {
                  question: "O produto é físico?",
                  answer: "Não. Este é um produto 100% digital. Você receberá os arquivos para imprimir quando desejar."
                },
                {
                  question: "O que está incluso na compra?",
                  answer: (
                    <div className="space-y-2">
                      <p>Você receberá:</p>
                      <ul className="list-disc list-inside space-y-1 font-semibold text-neutral-700">
                        <li>✨ +150 Marcadores Cristãos Premium</li>
                        <li>✨ Guia de Impressão Perfeita</li>
                        <li>✨ +50 Marcadores Infantis Cristãos</li>
                        <li>✨ 100 Devocionais Cristãos</li>
                      </ul>
                      <p className="mt-1">Tudo com acesso imediato.</p>
                    </div>
                  )
                },
                {
                  question: "Qual é o tamanho dos marcadores?",
                  answer: "Todos os marcadores possuem o formato 5 x 18 cm, ideal para Bíblias, livros, devocionais e cadernos."
                },
                {
                  question: "Posso imprimir quantas vezes quiser?",
                  answer: "Sim. Após a compra, você poderá imprimir seus marcadores sempre que desejar para uso pessoal."
                },
                {
                  question: "Posso presentear familiares e amigos?",
                  answer: "Sim. Os marcadores são perfeitos para presentear pessoas especiais e compartilhar mensagens de fé."
                },
                {
                  question: "Qual papel é recomendado?",
                  answer: "Recomendamos papel fotográfico ou papel couché entre 180g e 230g para um acabamento premium. Todas as orientações estão no bônus Guia de Impressão Perfeita."
                },
                {
                  question: "Preciso de uma impressora profissional?",
                  answer: "Não. Você pode imprimir em casa com uma impressora comum ou utilizar qualquer gráfica rápida."
                },
                {
                  question: "Funciona no celular?",
                  answer: "Sim. Você pode acessar os arquivos pelo celular, tablet ou computador."
                },
                {
                  question: "Em quais formatos os arquivos são entregues?",
                  answer: "Os arquivos são entregues em PDF de alta resolução, prontos para impressão."
                },
                {
                  question: "Os marcadores possuem versículos bíblicos?",
                  answer: "Sim. A coleção reúne versículos, personagens bíblicos, promessas de Deus e diversos temas cristãos inspiradores."
                },
                {
                  question: "Como recebo os bônus?",
                  answer: "Os três bônus são liberados automaticamente junto com a coleção principal logo após a confirmação do pagamento."
                },
                {
                  question: "A compra é segura?",
                  answer: "Sim. O pagamento é realizado em ambiente totalmente seguro e criptografado."
                },
                {
                  question: "Existe garantia?",
                  answer: "Sim. Você conta com a garantia da plataforma. Caso o produto não atenda às suas expectativas, poderá solicitar o reembolso dentro do prazo de 7 Dias."
                },
                {
                  question: "O acesso expira?",
                  answer: "Não. Após a compra, você poderá baixar seus arquivos e acessá-los sempre que precisar, conforme as condições da plataforma."
                }
              ].map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-sm transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => { setOpenFaqIndex(isOpen ? null : idx); playSfx(); }}
                      className="w-full flex items-center justify-between text-left p-4 sm:p-5 cursor-pointer hover:bg-neutral-50/50 transition-colors gap-4"
                    >
                      <span className="text-sm sm:text-base font-sans font-bold text-[#0F3157] leading-tight">
                        {item.question}
                      </span>
                      <span className={`w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#C89B3C]/10 text-[#C89B3C]' : ''}`}>
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-100/75">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* --- SECTION 12: FINAL CALL TO ACTION (MODELADO DA IMAGEM) --- */}
        <section id="final-cta-section" className="w-full bg-[#091F38] py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden content-visibility-auto">
          {/* Decorative subtle glowing background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
            
            {/* Bookmark Icon */}
            <div className="text-[#C89B3C] mb-6">
              <Bookmark className="w-14 h-14 stroke-[2] fill-[#C89B3C]/10" />
            </div>

            {/* Title styled exactly like the image in Poppins font, forced to 2 lines */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-white leading-[1.25] tracking-tight mb-4 max-w-2xl">
              Comece hoje a marcar sua fé <br />
              com <span className="text-[#E4C97A] font-poppins font-black">beleza e devoção</span>
            </h2>

            {/* Subtitle with highly readable text */}
            <p className="text-xs sm:text-sm md:text-base text-white font-medium font-sans max-w-xl mx-auto leading-relaxed mb-8">
              Acesso imediato. Garantia de 7 dias. 150 marcadores premium na sua Bíblia ainda hoje.
            </p>

            {/* Large Rich Golden CTA Button with Printer Icon */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToOffer}
              className="w-full max-w-[460px] bg-[#C89B3C] hover:bg-[#B3872E] text-white font-poppins text-xs xs:text-sm sm:text-base md:text-lg font-black tracking-widest py-4.5 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center relative overflow-hidden flex items-center justify-center gap-3 border-b-4 border-[#8A651E] hover:border-[#705014] whitespace-nowrap flex-nowrap"
            >
              <Printer className="w-5 h-5 text-white stroke-[2.5] shrink-0" />
              <span className="uppercase whitespace-nowrap">QUERO MEUS MARCADORES</span>
            </motion.button>

          </div>
        </section>


        {/* --- FOOTER SIMPLES E ELEGANTE --- */}
        <footer className="w-full bg-[#051424] py-8 px-4 sm:px-6 lg:px-8 border-t border-[#C89B3C]/10 text-center text-white/50 text-[11px] sm:text-xs font-sans">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
            <div className="text-white/40 font-bold">
              <span>© 2026 +150 Marcadores Cristãos Premium. Todos os direitos reservados.</span>
            </div>
            <p className="font-medium max-w-xl leading-relaxed text-[10px] sm:text-[11px] text-white/30">
              Este produto é 100% digital. A entrega dos arquivos é realizada de forma imediata via e-mail após a aprovação do seu pagamento.
            </p>
          </div>
        </footer>

      </main>



      {/* --- EXTRAS: SECURE CHECKOUT SIMULATED MODAL --- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-darkblue/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            id="checkout-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-brand-bg text-brand-text max-w-md w-full rounded-2xl shadow-2xl border border-brand-gold/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-darkblue text-white py-4 px-6 border-b border-brand-gold/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-lightgold" />
                  <span className="font-serif font-bold text-sm sm:text-base tracking-wide uppercase text-brand-lightgold">Ambiente de Compra Seguro</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-white/60 hover:text-white transition cursor-pointer"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Step */}
              {checkoutStep === "form" && (
                <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                  <div className="bg-white p-3.5 rounded-xl border border-brand-gold/15 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-gold/10 p-2 rounded">
                        <Award className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">PRODUTO DIGITAL</span>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-darkblue leading-none mt-1">
                          +150 Marcadores Cristãos de Páginas
                        </h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 border-t border-dashed border-gray-100 pt-2.5 text-xs text-brand-text">
                      <span>Valor Promocional do Lote Especial</span>
                      <div className="text-right">
                        <span className="text-[10px] text-red-500 line-through block font-mono">R$ 97,00</span>
                        <span className="font-bold text-brand-blue font-mono text-base">R$ 29,90</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-darkblue block">
                      Seu Nome Completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Maria de Souza Silva"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full bg-white border border-brand-gold/25 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-darkblue block">
                      Seu E-mail para Envio do Link *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Ex: maria@exemplo.com"
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      className="w-full bg-white border border-brand-gold/25 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                    />
                    <span className="text-[9px] text-brand-text/60 italic block mt-1">
                      Certifique-se de preencher o e-mail corretamente para receber o download instantâneo.
                    </span>
                  </div>

                  {/* Payment selection */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-darkblue block">
                      Forma de Pagamento Preferida
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setPaymentMethod("pix"); playSfx(); }}
                        className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          paymentMethod === "pix"
                            ? "bg-brand-blue text-white border-brand-blue"
                            : "bg-white text-brand-text border-brand-gold/15 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-base">⚡</span>
                        <span>Pix (Acesso na hora)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setPaymentMethod("card"); playSfx(); }}
                        className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          paymentMethod === "card"
                            ? "bg-brand-blue text-white border-brand-blue"
                            : "bg-white text-brand-text border-brand-gold/15 hover:bg-gray-50"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Cartão de Crédito</span>
                      </button>
                    </div>
                  </div>

                  {/* Guaranteed Safe Seal */}
                  <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg flex items-center gap-2 text-[10px] border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Garantia de Satisfação:</strong> Se não gostar de nenhum marcador, garantimos reembolso total de 7 dias sem burocracia.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4A63C] hover:bg-[#B88A24] text-white font-bold py-3 px-4 rounded-lg shadow-lg text-sm tracking-wide transition duration-300 mt-2 cursor-pointer flex items-center justify-center gap-2 border-b-2 border-[#9C751E]"
                  >
                    <span>ADQUIRIR AGORA COM DESCONTO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex justify-center gap-6 text-[10px] text-brand-text/60 pt-2 border-t border-dashed border-gray-100">
                    <span>💳 Pix seguro</span>
                    <span>🔒 SSL Encriptado</span>
                    <span>🛡️ Dados Protegidos</span>
                  </div>
                </form>
              )}

              {/* Processing Step */}
              {checkoutStep === "processing" && (
                <div className="p-10 flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-brand-gold/20 border-t-brand-gold animate-spin"></div>
                    <Lock className="w-4 h-4 text-brand-gold absolute inset-0 m-auto animate-pulse" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-brand-darkblue text-base">
                    Verificando Conexão Segura...
                  </h4>
                  <p className="text-xs text-brand-text/75 max-w-xs">
                    Estamos gerando seus dados de pagamento com criptografia avançada. Por favor, aguarde alguns instantes.
                  </p>
                </div>
              )}

              {/* Success Screen Step with mock printable download! */}
              {checkoutStep === "success" && (
                <div className="p-8 text-center space-y-5">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      PAGAMENTO RECONHECIDO COM SUCESSO
                    </span>
                    <h4 className="font-serif font-bold text-brand-darkblue text-lg mt-2">
                      Parabéns, {checkoutName}!
                    </h4>
                    <p className="text-xs text-brand-text/80 max-w-xs mx-auto">
                      Seu pedido de <strong>+150 Marcadores Cristãos de Páginas</strong> foi processado e o e-mail de acesso foi enviado para <strong>{checkoutEmail}</strong>.
                    </p>
                  </div>

                  {/* Immediate Download Showcase Container */}
                  <div className="bg-white border border-brand-gold/20 p-4 rounded-xl text-left space-y-3.5 shadow-inner">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Liberação Imediata da Amostra Premium
                    </span>
                    
                    <p className="text-[11px] text-brand-text/90">
                      Como recompensa instantânea, disponibilizamos o primeiro arquivo de alta resolução com <strong>5 marcadores selecionados em PDF</strong> prontos para imprimir agora mesmo!
                    </p>

                    {/* True PDF sample simulation download */}
                    <a
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-brand-blue hover:bg-brand-darkblue text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase text-center block shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4 text-brand-lightgold" />
                      <span>Baixar Amostra Pronta (PDF)</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="text-xs text-brand-blue hover:underline font-semibold cursor-pointer"
                    >
                      Voltar para a Página Principal
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
