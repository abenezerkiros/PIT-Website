const SITE_URL = "https://www.pitdrives.com";
const BUSINESS_ID = `${SITE_URL}/#organization`;

const areaServed = [
  {
    "@type": "AdministrativeArea",
    name: "District of Columbia",
  },
  {
    "@type": "Place",
    name: "Northern Virginia",
  },
  {
    "@type": "AdministrativeArea",
    name: "Maryland",
  },
];

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* Shared business information: render once in the root layout. */
export function BusinessStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "@id": BUSINESS_ID,
        name: "Premier International Transportation",
        alternateName: "Premier",
        url: `${SITE_URL}/`,
        foundingDate: "2012",

        // Add legalName and founder once their exact names are confirmed.

        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/hero.png`,
        telephone: "+1-202-999-0346",
        email: "info@pitdrives.com",

        address: {
          "@type": "PostalAddress",
          streetAddress: "1250 Connecticut Ave NW Ste 700",
          addressLocality: "Washington",
          addressRegion: "DC",
          postalCode: "20036",
          addressCountry: "US",
        },

        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],

        areaServed,

        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-888-412-9150",
            email: "info@pitdrives.com",
            contactType: "customer service",
          },
        ],

        sameAs: [
          "https://twitter.com/pitdrives",
          "https://www.facebook.com/PitDrives/",
          "https://www.linkedin.com/company/premier-international-transportation/",
          "https://www.instagram.com/pitdrives/",
          "https://www.youtube.com/channel/UCHs70M4yAQCRipDzzSQNq_g",
          "https://www.yelp.com/biz/premier-international-transportation-washington-dc",
        ],
      }}
    />
  );
}

/* Website identity: render on the homepage. */
export function WebsiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Premier International Transportation",
        alternateName: "Premier",
        inLanguage: "en-US",
        publisher: {
          "@id": BUSINESS_ID,
        },
      }}
    />
  );
}

const services = {
  executives: {
    path: "/executives",
    name: "Executive Mobility",
    serviceType: "Executive chauffeured transportation",
    description:
      "Executive mobility for today’s global leaders. Meticulous preparation, fully vetted chauffeurs, and coordinated movements that support your protection detail.",
    audience: "Executives, global leaders, and executive protection teams",
  },

  hotels: {
    path: "/hotels",
    name: "Hotel Partnerships",
    serviceType: "Hotel guest chauffeured transportation",
    description:
      "Gracious mobility for distinguished hotels. Premier partners with your concierge team to care for every guest journey, from airport transfers to the last departure.",
    audience: "Hotels, concierge teams, and hotel guests",
  },

  corporate: {
    path: "/corporate",
    name: "Corporate Mobility & Roadshows",
    serviceType: "Corporate and roadshow transportation",
    description:
      "Composed mobility for companies on the move. Corporate roadshows, conferences, and events, carefully coordinated from the first itinerary to the final invoice.",
    audience: "Companies, corporate travel planners, and roadshow teams",
  },

  events: {
    path: "/events",
    name: "Wedding & Event Transportation",
    serviceType: "Wedding and event guest transportation",
    description:
      "Effortless mobility for life’s defining days. Chauffeur service and coordinated guest transportation for weddings, galas, and celebrations.",
    audience: "Couples, event hosts, event planners, and their guests",
  },

  diplomatic: {
    path: "/diplomatic",
    name: "Diplomatic Mobility",
    serviceType: "Diplomatic and delegation transportation",
    description:
      "Discreet mobility for those who represent nations. Chauffeur briefings, coordinated delegation transport, and attentive care throughout every movement.",
    audience: "Diplomatic missions, embassies, principals, and delegations",
  },
} as const;

type ServiceKey = keyof typeof services;

/* Service information and breadcrumbs: render on each service page. */
export function ServiceStructuredData({
  service,
}: {
  service: ServiceKey;
}) {
  const details = services[service];
  const url = `${SITE_URL}${details.path}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${url}#service`,
            url,
            name: details.name,
            serviceType: details.serviceType,
            description: details.description,
            provider: {
              "@id": BUSINESS_ID,
            },
            areaServed,
            audience: {
              "@type": "Audience",
              audienceType: details.audience,
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: details.name,
                item: url,
              },
            ],
          },
        ],
      }}
    />
  );
}