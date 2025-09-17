// src/app/components/header/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/">Hjem</Link>
          <Link href="/about">Om</Link>
          <Link href="/about/deg">Om deg</Link>
          <Link href="/companies" className="active">Firmaer</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;