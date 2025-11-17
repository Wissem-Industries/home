<script setup lang="ts">
import { useLanguageSwitcher } from '../misc/useLanguageSwitcher';

const { displayedWelcome, displayedConstruction, displayedButton } = useLanguageSwitcher();

const goToGithub = () => {
  window.location.href = 'https://github.com/WissemBad';
};
</script>

<template>
  <div class="title-container">
    <!-- Logo avec effet -->
    <div class="logo-container">
      <svg viewBox="0 0 79 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="logo"
              d="M78.1602 0.90918L53.9609 44.6592C52.3431 47.5531 49.8708 49 46.5439 49H42.2715V18.6143L25.4551 44.7959C23.6549 47.5986 21.0003 49 17.4912 49H12.6377L16.2266 9.52246H0.333008L5.59668 0.90918H20.7041C22.5498 0.90918 24.1335 1.33073 25.4551 2.17383C27.2324 3.33594 28.1211 5.14746 28.1211 7.6084C28.1211 7.97298 28.0983 8.34896 28.0527 8.73633L25.5918 31.9102L41.8955 6.03613C43.0576 4.19043 44.0944 2.93717 45.0059 2.27637C46.2819 1.36491 48.0251 0.90918 50.2354 0.90918H53.585V31.2266L69.9912 0.90918H78.1602Z"
              fill="white" />
      </svg>
    </div>

    <!-- Textes avec effet typewriter -->
    <div class="text-content">
      <h2 class="typewriter welcome-text">{{ displayedWelcome }}</h2>
      <h1 class="name-text">Wissem.</h1>
      <p class="typewriter construction-text">{{ displayedConstruction }}</p>
    </div>

    <!-- Bouton vers Github -->
    <div class="button-container">
      <button class="enter-button" @click="goToGithub">{{ displayedButton }}</button>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal avec flexbox */
.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 90%;
  max-width: 800px;
  z-index: 10;
}

/* Conteneur du logo */
.logo-container {
  width: 120px;
  height: auto;
  margin-bottom: 30px;
  flex-shrink: 0;
}

.logo-container svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Conteneur des textes avec hauteur fixe */
.text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 250px;
  width: 100%;
}

/* Effet typewriter avec curseur clignotant */
.typewriter {
  position: relative;
  display: inline-block;
  min-width: 20px;
}

.typewriter::after {
  content: '|';
  animation: blink 0.8s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Texte de bienvenue */
.welcome-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: white;
  letter-spacing: 2px;
  text-align: center;
  margin: 0;
  min-height: 3rem;
  text-shadow:
      0 0 8px rgba(255, 255, 255, 0.5),
      0 0 15px rgba(255, 255, 255, 0.3);
}

/* Nom principal */
.name-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin: 0;
  text-shadow:
      0 0 12px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.45),
      0 0 30px rgba(255, 255, 255, 0.35);
  animation: glowEffect 2s infinite;
}

/* Texte de construction */
.construction-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1.5px;
  text-align: center;
  margin: 10px 0 0 0;
  min-height: 2rem;
  text-shadow:
      0 0 8px rgba(255, 255, 255, 0.5),
      0 0 15px rgba(255, 255, 255, 0.3);
  animation: pulseGlow 3s infinite;
}

/* Conteneur du bouton avec hauteur fixe */
.button-container {
  margin-top: 30px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Bouton */
.enter-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  min-width: 16rem;
  min-height: 3.5rem;
  text-align: center;
  white-space: nowrap;
}

.enter-button:hover {
  background-color: #ffffff;
  color: #000;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
  transform: scale(1.05);
}

/* Animation de glow */
@keyframes glowEffect {
  0% {
    text-shadow:
      0 0 12px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.45),
      0 0 30px rgba(255, 255, 255, 0.35);
  }
  50% {
    text-shadow:
      0 0 15px rgba(255, 255, 255, 0.7),
      0 0 25px rgba(255, 255, 255, 0.55),
      0 0 35px rgba(255, 255, 255, 0.45);
  }
  100% {
    text-shadow:
      0 0 12px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.45),
      0 0 30px rgba(255, 255, 255, 0.35);
  }
}

/* Animation de pulsation subtile */
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.8;
    text-shadow:
        0 0 8px rgba(255, 255, 255, 0.5),
        0 0 15px rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 1;
    text-shadow:
        0 0 12px rgba(255, 255, 255, 0.7),
        0 0 20px rgba(255, 255, 255, 0.5);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .logo-container {
    width: 90px;
    margin-bottom: 20px;
  }

  .text-content {
    min-height: 200px;
  }

  .welcome-text {
    font-size: 1.8rem;
    min-height: 2.5rem;
  }

  .name-text {
    font-size: 3rem;
  }

  .construction-text {
    font-size: 1.2rem;
    min-height: 1.8rem;
  }

  .button-container {
    margin-top: 20px;
  }

  .enter-button {
    font-size: 1rem;
    padding: 12px 35px;
    min-width: 160px;
  }
}

@media (max-width: 480px) {
  .title-container {
    width: 95%;
  }

  .logo-container {
    width: 70px;
    margin-bottom: 15px;
  }

  .text-content {
    min-height: 160px;
    gap: 5px;
  }

  .welcome-text {
    font-size: 1.3rem;
    min-height: 2.2rem;
    min-width: 200px;
    letter-spacing: 1px;
  }

  .name-text {
    font-size: 2.2rem;
  }

  .construction-text {
    font-size: 0.95rem;
    min-height: 1.6rem;
    min-width: 180px;
    letter-spacing: 1px;
  }

  .button-container {
    margin-top: 10px;
    min-height: 50px;
  }

  .enter-button {
    font-size: 0.85rem;
    padding: 10px 25px;
    min-width: 160px;
    min-height: 42px;
  }
}
</style>
