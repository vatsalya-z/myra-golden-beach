import { siteConfig } from "@/data/site";

interface GoogleMapProps {
  className?: string;
  title?: string;
}

export function GoogleMap({
  className = "",
  title = "MYRA Golden Beach Resort Location",
}: GoogleMapProps) {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <iframe
        title={title}
        src={siteConfig.googleMapsEmbed}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={title}
      />
    </div>
  );
}
