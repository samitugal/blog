(function() {
    // Only run on the root page
    if (window.location.pathname !== '/') return;
    
    // Get browser language
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.toLowerCase();
    
    // Check if user prefers English
    if (langCode.startsWith('en') && !window.location.href.includes('/en/')) {
        window.location.href = '/en/';
    }
    // If Turkish or other languages, stay on main page (Turkish default)
})(); 