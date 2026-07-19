import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const AnimatedShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#0056b3"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.5}
      />
    </Sphere>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="greeting">Hi, I'm</motion.h2>
          <motion.h1 variants={itemVariants} className="name gradient-text">Manpreet Singh</motion.h1>
          <motion.h3 variants={itemVariants} className="role">Full-Stack Engineer & AI Enthusiast</motion.h3>
          <motion.p variants={itemVariants} className="bio">
            Top 5% CS Student at Chitkara University. <br/>
            I build modern, scalable web applications and AI-powered solutions.
          </motion.p>
          <motion.div variants={itemVariants} className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="hero-3d">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <AnimatedShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
