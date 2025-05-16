"use client";
import { useEffect, useRef } from 'react';

function AdBanner() {
 const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      const alreadyRendered = adRef.current.getAttribute('data-adsbygoogle-status') === 'done';

      if (!alreadyRendered) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('AdSense push error:', e);
        }
      }
    }
  }, []);

  return (
  <ins
     ref={adRef}
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
