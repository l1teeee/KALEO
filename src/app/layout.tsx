import { Playfair_Display } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next';
import SmoothScrolling from '@/app/Components/SmoothScrolling';

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kaleo - Discover Yourself",
    description: "Kaleo is a modern ranch retreat designed for quiet escapes, outdoor living, and meaningful gatherings. A place to slow down, reconnect, and enjoy nature with intention.",
    keywords: ["kaleo", "retreat", "nature", "meditation", "self-discovery", "wellness", "ranch", "outdoor living"],
    authors: [{ name: "Kaleo" }],
    openGraph: {
        title: "Kaleo - Discover Yourself",
        description: "A modern ranch retreat for quiet escapes and reconnecting with nature.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kaleo - Discover Yourself",
        description: "A modern ranch retreat for quiet escapes and reconnecting with nature.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={playfairDisplay.variable}>
            <body className={`${playfairDisplay.className} bg-[#efe5d7]`}>
                <SmoothScrolling>
                    {children}
                </SmoothScrolling>
            </body>
        </html>
    );
}