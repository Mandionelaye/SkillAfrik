import { useState } from 'react'

export default function DescripionComp({text}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const getTruncatedText = (text) => {
    const words = text?.split(/\s+/);
    return words?.slice(0, 8).join(" ") + (words?.length > 8 ? "..." : "");
  };

  const displayText = isExpanded ? text : getTruncatedText(text);

  function formatYoutubeDescription(text) {
  if (!text) return "";

  // Transformer les liens en <a href="...">
  const linkified = text.replace(
    /((https?:\/\/|www\.)[^\s]+)/g,
    (url) => {
      const href = url.startsWith("http") ? url : `https://${url}`;
      return `<a href="${href}" class="text-orange-500" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }
  );

  // Remplacer les \n par des <br />
  return linkified.replace(/\n/g, "<br />");
}


  return (
    <div style={{ marginTop: "10px" }}>
      <div
        dangerouslySetInnerHTML={{
          __html: formatYoutubeDescription(displayText),
        }}
      />
      {text?.split(/\s+/).length > 8 && (
        <button
          onClick={toggleExpanded}
          className="text-orange-500"
          style={{
            marginTop: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            padding: 0,
          }}
        >
          {isExpanded ? "Afficher moins" : "Afficher plus"}
        </button>
      )}
    </div>
  )
}
