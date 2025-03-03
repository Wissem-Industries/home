<script setup lang="ts">
import Base from "./components/Base.vue";
import Home from "./components/Home.vue";

import { useCursor } from './misc/useCursor';
const { cursorStyle } = useCursor();
</script>

<template>
  <div :style="cursorStyle" class="glowing-cursor"/>
  <div>
    <Base />
    <Home/>
  </div>
</template>

<style scoped>
/* Curseur personnalisé */
.glowing-cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.2) 70%); /* Dégradé plus doux */
  box-shadow:
      0 0 15px rgba(255, 255, 255, 0.9),
      0 0 25px rgba(255, 255, 255, 0.7),
      0 0 50px rgba(255, 255, 255, 0.5),
      0 0 100px rgba(255, 255, 255, 0.3),
      0 0 0 12px rgba(255, 255, 255, 0.1); /* Ombres supplémentaires et diffuse pour le glow */
  pointer-events: none; /* Ne pas interférer avec les éléments sous le curseur */
  transform-origin: center;
  transition: all 0.1s ease-out; /* Transition douce pour un effet fluide */
  animation: pulseEffect 1.5s ease-in-out infinite; /* Rotation et pulsation */
  mix-blend-mode: lighten; /* Utiliser l'effet de lumière pour mieux s'intégrer aux éléments lumineux */
}

/* Rotation continue */
@keyframes rotateEffect {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Effet de pulsation */
@keyframes pulseEffect {
  0% {
    transform: scale(1);
    box-shadow:
        0 0 15px rgba(255, 255, 255, 0.9),
        0 0 25px rgba(255, 255, 255, 0.7),
        0 0 50px rgba(255, 255, 255, 0.5),
        0 0 100px rgba(255, 255, 255, 0.3),
        0 0 0 12px rgba(255, 255, 255, 0.1);
  }
  50% {
    transform: scale(1.2); /* Effet de grossissement du curseur */
    box-shadow:
        0 0 30px rgba(255, 255, 255, 1),
        0 0 50px rgba(255, 255, 255, 0.9),
        0 0 100px rgba(255, 255, 255, 0.6),
        0 0 150px rgba(255, 255, 255, 0.3),
        0 0 10px rgba(255, 255, 255, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow:
        0 0 15px rgba(255, 255, 255, 0.9),
        0 0 25px rgba(255, 255, 255, 0.7),
        0 0 50px rgba(255, 255, 255, 0.5),
        0 0 100px rgba(255, 255, 255, 0.3),
        0 0 0 12px rgba(255, 255, 255, 0.1);
  }
}

/* Ajuster le curseur lors du survol sur certains éléments */
a:hover .glowing-cursor,
button:hover .glowing-cursor {
  animation: rotateEffect 5s linear infinite, pulseEffect 1s ease-in-out infinite;
  transform: scale(1.5); /* Grossir lors du survol pour plus d'effet */
}

</style>