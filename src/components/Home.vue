<script setup lang="ts">
import { useLanguageSwitcher } from '../misc/useLanguageSwitcher';
const { displayedWelcome, displayedConstruction } = useLanguageSwitcher();

const goToGithub = () => {
  window.location.href = 'https://github.com/WissemBad';
};

const goToLinkedin = () => {
  window.location.href = 'https://www.linkedin.com/in/WissemBadraoui/';
}
</script>

<template>
  <div class="title-container">
    <div class="logo-container">
      <svg viewBox="0 0 79 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="logo"
              d="M78.1602 0.90918L53.9609 44.6592C52.3431 47.5531 49.8708 49 46.5439 49H42.2715V18.6143L25.4551 44.7959C23.6549 47.5986 21.0003 49 17.4912 49H12.6377L16.2266 9.52246H0.333008L5.59668 0.90918H20.7041C22.5498 0.90918 24.1335 1.33073 25.4551 2.17383C27.2324 3.33594 28.1211 5.14746 28.1211 7.6084C28.1211 7.97298 28.0983 8.34896 28.0527 8.73633L25.5918 31.9102L41.8955 6.03613C43.0576 4.19043 44.0944 2.93717 45.0059 2.27637C46.2819 1.36491 48.0251 0.90918 50.2354 0.90918H53.585V31.2266L69.9912 0.90918H78.1602Z"
              fill="white" />
      </svg>
    </div>

    <div class="text-content">
      <h2 class="typewriter welcome-text">{{ displayedWelcome }}</h2>
      <h1 class="name-text">Wissem.</h1>
      <p class="typewriter construction-text">{{ displayedConstruction }}</p>
    </div>

    <div class="button-container">
      <button class="social-button github-button" @click="goToGithub" aria-label="Voir mon profil Github">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>GitHub</span>
      </button>
      <button class="social-button linkedin-button" @click="goToLinkedin" aria-label="Voir mon profil LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <span>LinkedIn</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
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

.text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 250px;
  width: 100%;
}

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

.button-container {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-shrink: 0;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border: 2px solid #ffffff;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  color: #ffffff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.social-button svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease-in-out;
}

.social-button span {
  transition: color 0.3s ease-in-out;
}

.social-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
}

.github-button:hover {
  background-color: #ffffff;
  color: #000000;
  border-color: #ffffff;
}

.linkedin-button:hover {
  background-color: #ffffff;
  color: #000000;
  border-color: #ffffff;
}

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
    margin-top: 15px;
    gap: 15px;
  }

  .social-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .social-button svg {
    width: 20px;
    height: 20px;
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
    gap: 12px;
    flex-direction: column;
  }

  .social-button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .social-button svg {
    width: 18px;
    height: 18px;
  }
}
</style>
