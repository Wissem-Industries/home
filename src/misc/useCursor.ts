// useCursor.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useCursor() {
const cursorStyle = ref({
top: '0px',
left: '0px',
});

const updateCursorPosition = (e: MouseEvent) => {
cursorStyle.value = {
top: `${e.clientY - 10}px`,
left: `${e.clientX - 10}px`,
};
};

onMounted(() => {
window.addEventListener('mousemove', updateCursorPosition);
});

onBeforeUnmount(() => {
window.removeEventListener('mousemove', updateCursorPosition);
});

return {
cursorStyle
};
}
