const swRegister = async () => {
    console.log(`service worker: ${'serviceWorker' in navigator}`);
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js');
    }
}

export default swRegister;