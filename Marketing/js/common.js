// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5783XFN4');
/**
 * Common functionality for Marketing campaign pages
 */

// Global Google Ads Conversion function
function gtag_report_conversion(event_name, value, url) {
    // These should be defined globally in the HTML or passed here
    const conversion_id = window.GOOGLE_CONVERSION_ID || 'AW-943484255/4CbBCObW0dQbEN_a8cED';
    const page_name = window.PAGE_NAME || 'common';

    value = value || 1.0;

    const callback = function () {
        if (typeof (url) != 'undefined' && url !== null && url !== '') {
            if (url.startsWith('#')) {
                const element = document.querySelector(url);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location = url;
            }
        }
    };

    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': conversion_id,
            'event_label': event_name,
            'value': value,
            'currency': 'MXN',
            'event_callback': callback
        });

        gtag('event', event_name, {
            'event_category': 'conversion',
            'event_label': url || 'internal_link',
            'value': value,
            'page': page_name
        });
    } else {
        callback();
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    // Scroll Arrow Handler
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function () {
            const eventosSection = document.getElementById('eventos');
            if (eventosSection) {
                eventosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});
