import React, { useEffect } from 'react';
import gsap from 'gsap';
import './CircleBackground.css';  // Ensure this is the correct path to your CSS file

const CircleBackground = () => {
  useEffect(() => {
    // Targeting all divs with class 'circle' within the section for animation
    gsap.to(".circle", {
      duration: 3,
      y: -20,  // Move up 40px
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
      <main className=" h-screen grid place-items-center text-white">
        <section className="w-96 h-96 relative grid place-items-center">
          {/* Ensure each div has the class 'circle' for GSAP targeting */}
          <div className="circle rounded-full absolute w-full h-full border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[95%] h-[95%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[90%] h-[90%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[85%] h-[85%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[80%] h-[80%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[75%] h-[75%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[70%] h-[70%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[65%] h-[65%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[60%] h-[60%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[55%] h-[55%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[50%] h-[50%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[45%] h-[45%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[40%] h-[40%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[35%] h-[35%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[30%] h-[30%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[25%] h-[25%] border border-neutral-600"></div>
          <div className="circle rounded-full absolute w-[20%] h-[20%] border border-neutral-600"></div>
        </section>
      </main>
    </div>
  );
};

export default CircleBackground;