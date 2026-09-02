import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import { FAQS } from "@/lib/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL  = "https://www.hktconsultancy.in";
const SITE_NAME = "HKT Consultancy";
const TAGLINE   = "Manufacturing Business Growth Consultancy";
const DESCRIPTION =
  "HKT Consultancy helps manufacturing enterprises break revenue plateaus and build sustained growth. Led by Dhiraj Thakur — 30+ years in sales leadership, team building and operational excellence across 200+ Indian manufacturing businesses.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0b1d35",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Manufacturing Business Growth Consultant | Ahmedabad`,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: [{ url: "/logo.png", width: 500, height: 500, alt: `${SITE_NAME} logo` }],
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
  formatDetection: { telephone: true, address: true, email: true },
};

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
      mainEntity: FAQS.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
