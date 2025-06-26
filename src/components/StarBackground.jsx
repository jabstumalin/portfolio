import { useEffect, useState, useRef } from "react";

const COLORS = [
  "#60a5fa", // blue
  "#f472b6", // pink
  "#facc15", // yellow
  "#34d399", // green
  "#f87171", // red
  "#a78bfa", // purple
  "#fbbf24", // orange
  "#818cf8", // indigo
  "#fcd34d", // gold
];

function isDarkMode() {
  if (typeof window !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }
  return false;
}

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const animationRef = useRef();
  const mouse = useRef({ x: 50, y: 50 }); // percent of viewport

  useEffect(() => {
    generateStars();
    const handleResize = () => generateStars();
    window.addEventListener("resize", handleResize);
    // Listen for theme changes
    const observer = new MutationObserver(() => generateStars());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Animate stars: move, color, and respond to mouse
    function animate() {
      setStars((prevStars) =>
        prevStars.map((star) => {
          // Move star downward, wrap to top if out of bounds
          let newY = star.y + 0.10 * star.speed;
          if (newY > 100) newY = 0;
          // Color cycling
          let colorIndex = (star.colorIndex + 0.01 * star.colorSpeed) % COLORS.length;

          // Interactive hover: gently push away from mouse
          const dx = star.x - mouse.current.x;
          const dy = newY - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let pushX = 0, pushY = 0;
          if (dist < 15) {
            // The closer, the stronger the push
            const strength = (15 - dist) / 15 * 1.2; // max 1.2% per frame
            pushX = (dx / (dist + 0.1)) * strength;
            pushY = (dy / (dist + 0.1)) * strength;
          }
          return {
            ...star,
            x: Math.max(0, Math.min(100, star.x + pushX)),
            y: Math.max(0, Math.min(100, newY + pushY)),
            colorIndex,
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [stars.length]);

  useEffect(() => {
    // Track mouse position as percent of viewport
    function handleMouseMove(e) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mouse.current = { x, y };
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );
    const dark = isDarkMode();
    const minSize = dark ? 2 : 1;
    const maxSize = dark ? 5 : 2.5;
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * (maxSize - minSize) + minSize,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
        colorIndex: Math.floor(Math.random() * COLORS.length),
        colorSpeed: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 1.5 + 0.5,
      });
    }
    setStars(newStars);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            position: "absolute",
            background: COLORS[Math.floor(star.colorIndex)],
            borderRadius: "50%",
            boxShadow: `0 0 8px 2px ${COLORS[Math.floor(star.colorIndex)]}99`,
            transition: "background 0.5s linear",
          }}
        />
      ))}
    </div>
  );
};
