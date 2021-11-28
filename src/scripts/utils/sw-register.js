const swRegister = async () => {
    if ('serviceWorker' in navigator) {
        console.log('Support SW');
        navigator.serviceWorker.register('../sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
}

export default swRegister;