import React, { useEffect } from 'react';
import gsap from 'gsap';
import './CircleBackground.css'; // Ensure this is the correct path to your CSS file

const CircleBackground = () => {
  useEffect(() => {
    // Targeting all divs with class 'circle' within the section for animation
    gsap.to(".circle", {
      duration: 3,
      y: -20,  // Move up 20px
      borderColor: "#f87171",  // Change border color
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "center",
        repeat: -1,
        yoyo: true
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-0">
      <main className="h-screen grid place-items-center text-white">
        <section className="w-96 h-96 relative grid place-items-center">
          {[...Array(19)].map((_, i) => (
            <div
              key={i}
              className={`circle rounded-full absolute border-2 border-neutral-600 circle-${i + 1}`}
              style={{ zIndex: -1 }}
            ></div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CircleBackground;