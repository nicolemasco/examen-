const translations = {
    es: {
        optionMenu1: "Inicio",
        optionMenu2: "Nosotros",
        optionMenu3: "Servicios",
        optionMenu4: "Productos",
        optionMenu5: "Opiniones",
        optionMenu6: "EasyDeco",
        optionMenu7: "Galeria",
        optionMenu8: "Contacto",
        tittle: "Diseñá espacios que inspiran",
        subtittle: "Transformá tu hogar con estilo, comodidad y armonía.",
        espanish: "Español",
        english: "Ingles",
        tittle2: "Nuestros Servicios",
        subtittle2: "Simplificamos todo el proceso de diseño.",
        tittle3: "Diseño interior por habitación",
        sub1: "Asesoría personalizada",
        sub2: "Recomendaciones de materiales y estilos",
        sub3: "Presupuesto en tiempo real",
        tittle4: "Inspírate",
        sub4: "Algunas ideas creadas por nuestros usuarios:",
        footerr: "© 2025 MAORA | Diseño de Interiores"
    },

    en: {
        optionMenu1: "Home",
        optionMenu2: "About Us",
        optionMenu3: "Services",
        optionMenu4: "Products",
        optionMenu5: "Reviews",
        optionMenu6: "EasyDeco",
        optionMenu7: "Gallery",
        optionMenu8: "Contact",
        tittle: "Design spaces that inspire",
        subtittle: "Transform your home with style, comfort, and harmony.",
        spanish: "Spanish",
        english: "English",
        tittle2: "Our Services",
        subtittle2: "We simplify the entire design process.",
        tittle3: "Interior Design by Room",
        sub1: "Personalized Advice",
        sub2: "Recommendations for Materials and Styles",
        sub3: "Real-Time Budget",
        tittle4: "Get Inspired",
        sub4: "Some ideas created by our users:",
        footerr: "© 2025 MAORA | Interior Design"
    }
};

function changeLanguage() {
    const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerHTML = translations[lang][key];

    });
}