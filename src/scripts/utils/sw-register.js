const swRegister = async () => {
    if ('serviceWorker' in navigator) {
        const { Workbox } = await import('workbox-window');
        const wb = new Workbox('../sw.js');
        wb.register();
    }
}

export default swRegister;