import AdSenses from "./AdSense";

export default function AdInArticle() {
  return (
    // <ins className="adsbygoogle"
    //   style={{ display: "block", textAlign: "center" }}
    //  data-ad-layout="in-article"
    //  data-ad-format="fluid"
    //  data-ad-client="ca-pub-2510660773997180"
    //  data-ad-slot="6048504182">
    //  </ins>

    <AdSenses 
      slot="6048504182" 
      format="fluid" 
      layout="in-article"
      style={{ width: '100%', height: '300px' }}
    />
  );
}
