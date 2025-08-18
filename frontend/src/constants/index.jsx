import { Flag, Gem, Globe, TrendingUp,ShieldHalf ,Satellite} from "lucide-react";

export const navItems = [
  { label: "Features", href: "http://localhost:5173/feature" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];


export const features = [
  {
    icon: <TrendingUp />,
    text: "Expanding Commercial Opportunities",
    description:
      "Growth in satellite communications, space tourism, and asteroid mining is creating new revenue streams and investment opportunities.",
  },
  {
    icon: <Satellite />,
    text: "Satellite & Internet Expansion",
    description:
      "Satellite technology is essential for global internet access, GPS, weather forecasting, and disaster response.",},
  {
    icon: <Gem />,
    text: "Resource Mining & Manufacturing",
    description:
   "The Moon and Mars have valuable resources (helium-3, water ice, etc.) for fuel and sustainability.",  },
  {
    icon: <Globe />,
    text: "Climate Monitoring & Earth Observation",
    description:
      "Satellites help track climate change, natural disasters, deforestation, and urban development",
  },
  {
    icon: <ShieldHalf />,
    text: "National Security & Defense",
    description:
      "Space-based defense systems are critical for cybersecurity, surveillance, and navigation.Governments worldwide are investing in military space tech & space forces.",
  },
  {
    icon: <Flag />,
    text: "First-Mover Advantage",
    description:
      "Space research drives innovation in AI, robotics, energy, and material sciences.Many daily technologies (GPS, camera sensors, water purification) originated from space research.",

  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
