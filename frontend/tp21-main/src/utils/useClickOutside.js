/**
 * useClickOutside.js
 *
 * Description:
 *   A reusable Vue 3 Composition API hook that detects clicks outside of one or more referenced elements.
 *   Useful for closing dropdowns, modals, tooltips, etc. when user clicks outside the target area.
 *
 * Key Features:
 *   - Accepts any number of DOM element refs as arguments
 *   - Sets `isOpen` to false if click is detected outside all referenced elements
 *   - Automatically binds and unbinds event listeners on component mount/unmount
 *   - Returns a reactive `isOpen` ref for integration with UI components
 */

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