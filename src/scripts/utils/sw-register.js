const swRegister = async () => {
    console.log(`service worker: ${'serviceWorker' in navigator}`);
    if ('serviceWorker' in navigator) {
        const { Workbox } = await import('workbox-window');
        const wb = new Workbox('../sw.js');
        wb.register();
    }
}

export default swRegister;