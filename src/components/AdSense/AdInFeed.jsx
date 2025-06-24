import { useEffect } from "react";
import AdSenses from "./AdSense";

export default function AdInFeed() {

  return (
    // <ins className="adsbygoogle"
    //  style={{ display: "block" }}
    //  data-ad-format="fluid"
    //  data-ad-layout-key="-fb+5w+4e-db+86"
    //  data-ad-client="ca-pub-2510660773997180"
    //  data-ad-slot="5859676193">
    // </ins>

    <AdSenses
      slot="5859676193" 
      format="fluid" 
      layout="in-feed"
      style={{ width: '100%', height: '400px' }}
    />
  );
}
