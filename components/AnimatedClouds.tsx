import { motion } from "framer-motion";

const CloudSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25,60 a20,20 0 0,1 0,-40 a20,20 1 0,1 25,0 a20,20 1 0,1 25,0 a20,20 0 0,1 0,40 z" />
  </svg>
);

export const AnimatedClouds = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: "-10%", y: Math.random() * 100 + "%" }}
          animate={{
            x: "110%",
            y: Math.random() * 100 + "%",
            transition: {
              repeat: Infinity,
              duration: Math.random() * 60 + 60,
              ease: "linear",
            },
          }}
        >
          <CloudSVG className="w-32 h-32 text-white opacity-30" />
        </motion.div>
      ))}
    </div>
  );
};
