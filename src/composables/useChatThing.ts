import { useTimeoutFn } from '@vueuse/core';

/**
 * A simple composable that returns a promise with the Chat Thing SDK after waiting for it
 * to become available on the window. 
 * 
 * This is required because the Chat Thing SDK is added as a defered script so it won't be 
 * available straight away at page load.
 * 
 * @returns Promise<Window['chatThing']>
 */
export const useChatThing = () => {
    function getChatThing(resolve: (sdk: Window['chatThing']) => void) {
        if (window.chatThing) {
            return resolve(window.chatThing);
        }

        useTimeoutFn(() => getChatThing(resolve), 200);
    }

    return new Promise<Window['chatThing']>((resolve) => {
        getChatThing(resolve);
    });
};
