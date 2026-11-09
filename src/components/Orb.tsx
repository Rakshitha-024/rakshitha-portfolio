
import { useState, useRef } from 'react'
import { motion } from 'motion/react'
interface Props {
  onSecret: () => void
}

export function Orb({ onSecret }: Props) {
  const [happy, setHappy] = useState(false)
  const [reaction, setReaction] = useState(0)
  const taps = useRef({ n: 0, t: 0 })

  const interact = () => {
    setHappy(true)
    setReaction(v => v + 1)

    const now = performance.now()
    taps.current.n =
      now - taps.current.t < 700 ? taps.current.n + 1 : 1
    taps.current.t = now

    if (taps.current.n >= 5) {
      taps.current.n = 0
      onSecret()
    }
  }

  return (
    <div className="cute-bot-scene">
      <style>{`
        .cute-bot-scene {
          width: 100%;
          height: 370px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          perspective: 900px;
          overflow: visible;
          touch-action: manipulation;
        }

        .cute-bot {
          position: relative;
          width: 190px;
          height: 270px;
          cursor: pointer;
          transform-style: preserve-3d;
          animation: bot-float 3s ease-in-out infinite;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .cute-bot-glow {
          position: absolute;
          width: 230px;
          height: 230px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle,
            rgba(255,150,200,.25),
            rgba(190,150,255,.12) 48%,
            transparent 72%);
          filter: blur(16px);
          pointer-events: none;
        }

        .bot-antenna {
          position: absolute;
          top: 2px;
          left: 50%;
          width: 5px;
          height: 27px;
          background: #d8b8f2;
          border-radius: 5px;
          transform: translateX(-50%);
        }

        .bot-antenna::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ff9bc9;
          box-shadow: 0 0 15px #ff9bc9;
          animation: bot-light 1.5s infinite alternate;
        }

        .bot-head {
          position: absolute;
          left: 50%;
          top: 27px;
          width: 158px;
          height: 126px;
          transform: translateX(-50%);
          border-radius: 48px;
          background: linear-gradient(145deg,#fff,#f1e8fa);
          border: 3px solid #fff;
          box-shadow:
            inset -7px -8px 15px rgba(190,150,220,.16),
            0 12px 30px rgba(160,110,190,.18);
          z-index: 3;
        }

        .bot-screen {
          position: absolute;
          inset: 10px;
          border-radius: 39px;
          background: linear-gradient(145deg,#f8edff,#fceaf4);
          box-shadow: inset 0 2px 8px rgba(180,140,210,.12);
        }

        .bot-eyes {
          position: absolute;
          top: 37px;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        .bot-eye {
          width: 18px;
          height: 23px;
          border-radius: 50%;
          background: #54456c;
          position: relative;
          animation: bot-blink 4s infinite;
        }

        .bot-eye::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          width: 6px;
          height: 7px;
          border-radius: 50%;
          background: white;
        }

        .bot-blush {
          position: absolute;
          top: 72px;
          width: 23px;
          height: 11px;
          border-radius: 50%;
          background: #ff9fbd;
          filter: blur(2px);
        }

        .bot-blush.left { left: 15px; }
        .bot-blush.right { right: 15px; }

        .bot-mouth {
          position: absolute;
          top: 78px;
          left: 50%;
          width: 14px;
          height: 8px;
          transform: translateX(-50%);
          border-bottom: 3px solid #9f789c;
          border-radius: 50%;
        }

        .bot-body {
          position: absolute;
          top: 158px;
          left: 50%;
          transform: translateX(-50%);
          width: 105px;
          height: 83px;
          border-radius: 30px;
          background: linear-gradient(145deg,#fff,#eee4f7);
          border: 3px solid white;
          box-shadow:
            inset -5px -6px 12px rgba(190,150,220,.15),
            0 8px 20px rgba(160,115,185,.13);
          z-index: 2;
        }

        .bot-heart {
          position: absolute;
          top: 21px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 23px;
          color: #f28eb9;
          animation: bot-heartbeat 1.4s infinite;
        }

        .bot-arm {
          position: absolute;
          top: 172px;
          width: 23px;
          height: 54px;
          border-radius: 15px;
          background: linear-gradient(145deg,#fff,#e7d7f5);
          z-index: 1;
        }

        .bot-arm.left { left: 23px; transform: rotate(17deg); }
        .bot-arm.right {
          right: 23px;
          transform: rotate(-17deg);
          transform-origin: top center;
        }

        .bot-hand {
          position: absolute;
          bottom: -4px;
          left: -3px;
          width: 29px;
          height: 24px;
          border-radius: 50%;
          background: #f5d9ef;
        }

        .bot-leg {
          position: absolute;
          top: 234px;
          width: 28px;
          height: 29px;
          border-radius: 11px;
          background: linear-gradient(145deg,#fff,#dfd0ef);
          z-index: 1;
        }

        .bot-leg.left { left: 56px; }
        .bot-leg.right { right: 56px; }

        .bot-shadow {
          position: absolute;
          bottom: 24px;
          width: 100px;
          height: 14px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(160,120,180,.16);
          border-radius: 50%;
          filter: blur(8px);
          animation: bot-shadow 3s ease-in-out infinite;
        }

        .bot-heart-float {
          position: absolute;
          pointer-events: none;
          color: #f28eb9;
          font-size: 21px;
          animation: heart-float 1.3s ease-out forwards;
        }

        .bot-sparkle {
          position: absolute;
          color: #d9a2ed;
          font-size: 20px;
          animation: sparkle 2.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes bot-float {
          0%,100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-11px) rotate(1deg); }
        }

        @keyframes bot-blink {
          0%,44%,48%,100% { transform: scaleY(1); }
          46% { transform: scaleY(.12); }
        }

        @keyframes bot-heartbeat {
          0%,100% { scale: 1; }
          50% { scale: 1.18; }
        }

        @keyframes bot-light {
          from { opacity: .6; scale: .85; }
          to { opacity: 1; scale: 1.15; }
        }

        @keyframes bot-shadow {
          0%,100% { scale: 1; opacity: .7; }
          50% { scale: .8; opacity: .35; }
        }

        @keyframes sparkle {
          0%,100% { opacity: .35; transform: translateY(0) rotate(0); }
          50% { opacity: 1; transform: translateY(-8px) rotate(20deg); }
        }

        @keyframes heart-float {
          0% { opacity: 0; transform: translateY(10px) scale(.5); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-65px) scale(1.3); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cute-bot, .bot-eye, .bot-heart, .bot-shadow,
          .bot-sparkle, .bot-antenna::after {
            animation: none !important;
          }
        }
      `}</style>

      <div className="cute-bot-glow" />
      <span className="bot-sparkle" style={{top:65,left:'17%'}}>✦</span>
      <span className="bot-sparkle" style={{top:145,right:'15%',animationDelay:'.8s'}}>✧</span>

      <motion.div
        className="cute-bot"
        animate={happy
          ? { y: [-8, -30, -8], rotate: [0, -7, 7, 0], scale: [1, 1.08, 1] }
          : { y: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: .65, ease: 'easeOut' }}
        whileTap={{ scale: .9 }}
        onPointerDown={interact}
        onPointerUp={() => setHappy(false)}
        onPointerLeave={() => setHappy(false)}
        onAnimationComplete={() => setHappy(false)}
      >
        <div className="bot-antenna" />
        <div className="bot-head">
          <div className="bot-screen">
            <div className="bot-eyes">
              <div className="bot-eye" />
              <div className="bot-eye" />
            </div>
            <div className="bot-blush left" />
            <div className="bot-blush right" />
            <div className="bot-mouth" />
          </div>
        </div>

        <motion.div
          className="bot-arm left"
          animate={happy ? { rotate: [-17, -65, -17] } : {}}
          transition={{ duration: .5 }}
        >
          <div className="bot-hand" />
        </motion.div>

        <motion.div
          className="bot-arm right"
          animate={happy ? { rotate: [-17, -75, -17] } : {}}
          transition={{ duration: .5 }}
        >
          <div className="bot-hand" />
        </motion.div>

        <div className="bot-body">
          <div className="bot-heart">♥</div>
        </div>

        <div className="bot-leg left" />
        <div className="bot-leg right" />

        {happy && (
          <>
            <span key={`h1-${reaction}`} className="bot-heart-float" style={{top:40,left:-8}}>♡</span>
            <span key={`h2-${reaction}`} className="bot-heart-float" style={{top:80,right:-8,animationDelay:'.15s'}}>♥</span>
            <span key={`h3-${reaction}`} className="bot-heart-float" style={{top:120,left:15,animationDelay:'.3s'}}>✦</span>
          </>
        )}
      </motion.div>

      <div className="bot-shadow" />
    </div>
  )
}
