import { motion } from 'motion/react';

export function FloatingElements() {
  const shapes = [
    { size: 80, delay: 0, duration: 22, x: '8%', y: '15%', color: 'bg-red-100/40' },
    { size: 60, delay: 3, duration: 28, x: '85%', y: '55%', color: 'bg-amber-100/50' },
    { size: 100, delay: 5, duration: 20, x: '70%', y: '20%', color: 'bg-orange-100/35' },
    { size: 50, delay: 1, duration: 25, x: '15%', y: '70%', color: 'bg-rose-100/45' },
    { size: 70, delay: 7, duration: 18, x: '92%', y: '80%', color: 'bg-red-50/60' },
    { size: 45, delay: 4, duration: 24, x: '45%', y: '88%', color: 'bg-amber-100/40' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${shape.color} blur-2xl`}
          style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y }}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
