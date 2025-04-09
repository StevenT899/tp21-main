import { onMounted, onUnmounted, ref } from 'vue';

export function useClickOutside(...refElements) {
    const isOpen = ref(false);

    const handleClickOutside = (event) => {
        let shouldClose = true;
        for (const refElement of refElements) {
            if (refElement.value && refElement.value.contains(event.target)) {
                shouldClose = false;
                break;
            }
        }
        if (shouldClose) {
            isOpen.value = false;
        }
    };

    onMounted(() => {
        window.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
        window.removeEventListener('click', handleClickOutside);
    });

    return {
        isOpen
    };
}