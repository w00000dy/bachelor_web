// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        let childs = 0;
        if (element.getAttribute('data-i18n-childs')) {
            childs = element.getAttribute('data-i18n-childs');
        }
        if (langData[key] === undefined) {
            console.warn(`Translation not found for key: ${key}`);
            return;
        }

        if (element.tagName === "INPUT") {
            element.value = langData[key];
            return;
        }
        element.firstChild.textContent = langData[key];
        for (let i = 2; i <= childs * 2; i += 2) {
            let j = i / 2;
            if (i < element.childNodes.length) {
                if (element.childNodes[i].nodeType === 3) { // Text node
                    element.childNodes[i].textContent = langData[key + "_ac" + j];
                } else {
                    element.childNodes[i].before(langData[key + "_ac" + j]);
                }
            } else {
                element.append(langData[key + "_ac" + j]);
            }
        }
    });
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

// Function to change language
async function changeLanguage(lang) {
    setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Call updateContent() on page load
window.onload = async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
};