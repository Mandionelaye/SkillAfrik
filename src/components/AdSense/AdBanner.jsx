"use client";

import AdSenses from "./AdSense";




function AdBanner() {
 
  return (
  // <ins
  //    ref={adRef}
  //    className="adsbygoogle"
  //    style={{ display: 'block' }}
  //    data-ad-client="ca-pub-2510660773997180"
  //    data-ad-slot="9625621261"
  //    data-ad-format="auto"
  //    data-full-width-responsive="true">
  //    </ins>
    
  <AdSenses
        slot="9625621261" 
        format="auto" 
        style={{ width: '100%', height: '90px' }}
      />

  );
}

export default AdBanner;
