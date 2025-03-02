<template>
  <div class="glowing">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
  </div>

  <div class="glowing">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
  </div>

  <div class="glowing">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
  </div>

  <div class="glowing">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
  </div>
</template>

<style scoped>
.glowing {
  position: relative;
  min-width: 700px;
  height: 550px;
  margin: -150px;
  transform-origin: right;
  animation: rotateEffect 5s linear infinite;
}

.glowing:nth-child(even) {
  transform-origin: left;
}

@keyframes rotateEffect {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.glowing span {
  position: absolute;
  top: calc(80px * var(--i));
  left: calc(80px * var(--i));
  bottom: calc(80px * var(--i));
  right: calc(80px * var(--i));
}

.glowing span::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -8px;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255,255,255,0.8),
  0 0 40px rgba(255,255,255,0.6),
  0 0 60px rgba(255,255,255,0.4),
  0 0 80px rgba(255,255,255,0.2),
  0 0 0 8px rgba(255,255,255,0.1);
}

.glowing span:nth-child(3n + 1)::before,
.glowing span:nth-child(3n + 2)::before,
.glowing span:nth-child(3n + 3)::before {
  background: #fff;
  box-shadow: 0 0 20px rgba(255,255,255,0.8),
  0 0 40px rgba(255,255,255,0.6),
  0 0 60px rgba(255,255,255,0.4),
  0 0 80px rgba(255,255,255,0.2),
  0 0 0 8px rgba(255,255,255,0.1);
}

.glowing span:nth-child(3n + 1) {
  animation: animate 10s alternate infinite;
}

.glowing span:nth-child(3n + 2) {
  animation: animate-reverse 3s alternate infinite;
}

.glowing span:nth-child(3n + 3) {
  animation: animate 8s alternate infinite;
}

@keyframes animate {
  0% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate-reverse {
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>


