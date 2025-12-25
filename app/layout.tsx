import {ReactNode} from "react";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {AppHeader} from "@/libs/presentation/components/AppHeader";
import {SessionProvider} from "@/libs/presentation/state/SessionProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pokédex Clean Architecture",
    description: "Clean Architecture demo using Next.js App Router + PokeAPI + PostgreSQL"
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
            <AppHeader/>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
