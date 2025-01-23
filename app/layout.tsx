import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";

import { Providers } from "./providers";

import { fontSans } from "@/ui/config/fonts";
import {
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_NAME
} from "@/common/constants/seo.constants";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: SITE_ICON
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        lang="en"
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
          <Toaster
            duration={2500}
            position="bottom-right"
            theme="dark"
            toastOptions={{
              className:
                "bg-default-50 text-foreground text-sm shadow-default-100 shadow-inner border-0"
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
