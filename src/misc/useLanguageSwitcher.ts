import { ref, onMounted, onBeforeUnmount } from 'vue';
import { langFr } from '../languages/fr_FR';
import { langEn } from '../languages/en_US';
import { langEs } from '../languages/es_ES';

export interface Language {
    welcome: string;
    name: string;
    construction: string;
    button: string;
}

export function useLanguageSwitcher() {
    const languages: Language[] = [langFr, langEn, langEs];
    const currentLangIndex = ref(0);
    const displayedWelcome = ref('');
    const displayedConstruction = ref('');
    const displayedButton = ref('');
    const isTyping = ref(false);

    let switchInterval: number | null = null;
    let typewriterTimeout: number | null = null;

    const typeWriter = async (text: string, targetRef: any, speed = 80) => {
        targetRef.value = '';
        for (let i = 0; i <= text.length; i++) {
            await new Promise(resolve => {
                typewriterTimeout = window.setTimeout(resolve, speed);
            });
            targetRef.value = text.substring(0, i);
        }
    };

    const eraseText = async (targetRef: any, speed = 50) => {
        const text = targetRef.value;
        for (let i = text.length; i >= 0; i--) {
            await new Promise(resolve => {
                typewriterTimeout = window.setTimeout(resolve, speed);
            });
            targetRef.value = text.substring(0, i);
        }
    };

    const switchLanguage = async () => {
        if (isTyping.value) return;
        isTyping.value = true;

        // Effacer les textes en même temps
        await Promise.all([
            eraseText(displayedWelcome, 30),
            eraseText(displayedConstruction, 30),
            eraseText(displayedButton, 30),
        ]);

        // Attendre un peu
        await new Promise(resolve => setTimeout(resolve, 300));

        // Changer de langue
        currentLangIndex.value = (currentLangIndex.value + 1) % languages.length;
        const currentLang = languages[currentLangIndex.value];

        // Écrire les nouveaux textes en même temps
        await Promise.all([
            typeWriter(currentLang.welcome, displayedWelcome, 60),
            typeWriter(currentLang.construction, displayedConstruction, 60),
            typeWriter(currentLang.button, displayedButton, 60),
        ]);

        isTyping.value = false;
    };

    onMounted(() => {
        // Écrire le texte initial en même temps
        const initialLang = languages[0];
        Promise.all([
            typeWriter(initialLang.welcome, displayedWelcome, 60),
            typeWriter(initialLang.construction, displayedConstruction, 60),
            typeWriter(initialLang.button, displayedButton, 60),
        ]).then(() => {
            // Commencer l'alternance automatique après 10 secondes
            switchInterval = window.setInterval(switchLanguage, 10000);
        });
    });

    onBeforeUnmount(() => {
        if (switchInterval) clearInterval(switchInterval);
        if (typewriterTimeout) clearTimeout(typewriterTimeout);
    });

    return {
        displayedWelcome,
        displayedConstruction,
        displayedButton,
        currentLanguage: () => languages[currentLangIndex.value],
    };
}

