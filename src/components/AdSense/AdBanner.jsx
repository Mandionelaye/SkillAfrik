import React, { useEffect } from 'react';

function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Erreur pub :", e);
    }
  }, []);

  return (
  <ins
     className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-2510660773997180"
     data-ad-slot="9625621261"
     data-ad-format="auto"
     data-full-width-responsive="true">
     </ins>
  );
}

export default AdBanner;
