<script setup lang="ts">
import { onMounted } from "vue";
import Base from "./components/Base.vue";

onMounted(() => {
  const title = document.querySelector(".glow-text") as HTMLElement;

  // Animation du texte glow
  const animateGlow = () => {
    title.style.textShadow = `
      0 0 12px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.5),
      0 0 30px rgba(255, 255, 255, 0.4)
    `;
    requestAnimationFrame(animateGlow);
  };

  animateGlow();
});
</script>

<template>
  <Base />
  <div class="title-container">
    <!-- Logo avec effet -->
    <div class="logo-container glow-text">
      <svg viewBox="0 0 79 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="logo"
              d="M78.1602 0.90918L53.9609 44.6592C52.3431 47.5531 49.8708 49 46.5439 49H42.2715V18.6143L25.4551 44.7959C23.6549 47.5986 21.0003 49 17.4912 49H12.6377L16.2266 9.52246H0.333008L5.59668 0.90918H20.7041C22.5498 0.90918 24.1335 1.33073 25.4551 2.17383C27.2324 3.33594 28.1211 5.14746 28.1211 7.6084C28.1211 7.97298 28.0983 8.34896 28.0527 8.73633L25.5918 31.9102L41.8955 6.03613C43.0576 4.19043 44.0944 2.93717 45.0059 2.27637C46.2819 1.36491 48.0251 0.90918 50.2354 0.90918H53.585V31.2266L69.9912 0.90918H78.1602Z"
              fill="white" />
      </svg>
    </div>

    <!-- Texte modifié et plus professionnel -->
    <h2 class="glow-text">Welcome to</h2>
    <h1 class="glow-text">Wissem's Industries</h1>

    <!-- Bouton d'entrée -->
    <button class="enter-button">Enter</button>
  </div>
</template>

<style scoped>
/* Conteneur du texte avec un centrage fluide */
.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

/* Conteneur du logo centré au-dessus du titre */
.logo-container {
  margin-bottom: 20px;
  width: 120px; /* Ajuste cette taille selon le logo */
  height: auto;
  margin-left: auto;
  margin-right: auto;
  transition: transform 1.5s ease;
  animation: ease-in-out;
}

/* Titre avec une lumière douce et subtile */
h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.3s;
  text-shadow:
      0 0 12px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.45),
      0 0 30px rgba(255, 255, 255, 0.35);
  animation: fadeInLeft 3s ease-out, glowEffect 2s infinite;
}

/* Titre avec une lumière douce et subtile */
h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.3s;
  animation: fadeInRight 3s ease-out;
}

/* Animation d'apparition progressive pour le texte (Fade-in) */
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation de glow */
@keyframes glowEffect {
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.5);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.3);
  }
}

/* Bouton simple et élégant */
.enter-button {
  display: inline-block;
  margin-top: 30px;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  text-decoration: none;
  border: 2px solid #ffffff;
  border-radius: 30px;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.enter-button:hover {
  background-color: #ffffff;
  color: #000;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
}

/* Effet de l'overlay noir translucide */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Ombre noir avec transparence */
  pointer-events: none;
  z-index: 5;
  border-radius: 15px;
}
</style>
