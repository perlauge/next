// src/app/about/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/codeacademy.svg"
        alt="Codeacademy logo"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}