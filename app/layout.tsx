import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { FAQS } from "./faq-data";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://www.hktconsultancy.in";
const SITE_NAME = "HKT Consultancy";
const TAGLINE = "Business Growth Architects";
const DESCRIPTION =
  "HKT Consultancy helps manufacturing enterprises break revenue plateaus. Led by Dhiraj Thakur — 30+ years in sales leadership, team building and operational excellence across 200+ Indian manufacturing businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Manufacturing Business Growth Consultant in Ahmedabad`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Dhiraj Thakur" }],
  creator: "Dhiraj Thakur",
  publisher: SITE_NAME,
  keywords: [
    "manufacturing business consultant",
    "business growth consultant India",
    "sales consultant Ahmedabad",
    "sales team training manufacturing",
    "revenue growth consulting",
    "operational excellence consultant",
    "leadership coaching manufacturing",
    "go-to-market strategy India",
    "Dhiraj Thakur",
    "HKT Consultancy",
  ],
  category: "Business Consulting",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: `${SITE_NAME} logo — ${TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#051a30",
  colorScheme: "light",
};

/* Structured data — helps Google render a rich result for the brand,
   the consultant, and the FAQ block on the page. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: TAGLINE,
      description: DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/logo.png`,
      email: "contact@hktconsultancy.in",
      telephone: "+91-89802-11122",
      priceRange: "$$$",
      foundingDate: "1995",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-1102, PNTC, Times of India Press Road, Vejalpur",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380015",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      knowsAbout: [
        "Manufacturing sales strategy",
        "Sales team building",
        "Revenue optimisation",
        "Operational excellence",
        "Leadership coaching",
      ],
      founder: { "@id": `${SITE_URL}/#dhiraj-thakur` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#dhiraj-thakur`,
      name: "Dhiraj Thakur",
      jobTitle: "Founder & Business Growth Consultant",
      description:
        "Business growth consultant with 30+ years of frontline experience in sales leadership, team building and operational excellence for manufacturing enterprises.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
      telephone: "+91-89802-11122",
      email: "dhiraj@hktconsultancy.in",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
