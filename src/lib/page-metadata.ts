import type { Metadata } from "next";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/hero.png",
}: PageMetadataOptions): Metadata {
  const url = new URL(path, "https://www.pitdrives.com").href;
  const imageUrl = new URL(
    image,
    "https://www.pitdrives.com",
  ).href;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Premier International Transportation",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}