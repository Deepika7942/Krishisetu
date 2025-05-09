import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => console.warn("Google Translate script failed to load.");
    document.body.appendChild(script);

    let retries = 0;
    const maxRetries = 5;

    const tryInitialize = () => {
      if (window.google?.translate?.TranslateElement && retries < maxRetries) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,kn",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        } catch (e) {
          console.error("Google Translate initialization error:", e);
        }
      } else if (retries < maxRetries) {
        retries++;
        console.log(`Retrying initialization (${retries}/${maxRetries})`);
        setTimeout(tryInitialize, 1000); // Retry after 1 second
      } else {
        console.warn("Google Translate failed to initialize after multiple attempts.");
      }
    };

    window.googleTranslateElementInit = tryInitialize;
  }, []);

  return <div id="google_translate_element" style={{ float: "right", margin: "10px" }} />;
};

export default GoogleTranslate;
