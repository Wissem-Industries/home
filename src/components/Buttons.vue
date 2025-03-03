<template>
  <div class="language-selector">
    <select @change="changeLanguage($event)" :value="currentLanguage">
      <option v-for="lang in languages" :key="lang.code" :value="lang.code">
        <span :class="'flag ' + lang.code"></span>{{ lang.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

// Injection du système de gestion des langues depuis main.ts
const i18n = inject('i18n') as {
  setLanguage: (lang: string) => void;
  currentLanguage: any;
};

// Liste des langues disponibles
const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

// Calculer la langue courante à partir de l'état réactif
const currentLanguage = computed(() => i18n.currentLanguage.value);

// Fonction pour changer la langue
const changeLanguage = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedLang = selectElement.value;
  i18n.setLanguage(selectedLang);
};
</script>

<style scoped>
.language-selector select {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.language-selector option {
  padding: 5px;
}
</style>
