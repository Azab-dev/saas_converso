"use client";

import NextError from "next/error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.error(error);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
