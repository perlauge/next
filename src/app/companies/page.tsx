// src/app/companies/page.tsx
'use client'

import { FC, FormEvent, useCallback, useEffect, useState } from "react";

interface CompanyProps {
  enhet: {
    navn: string;
    naeringskode1?: {
      kode: string,
      beskrivelse: string,
    }
  }
}

interface Enhet {
  organisasjonsnummer: string;
  navn: string;
  naeringskode1?: {
    kode: string;
    beskrivelse: string;
  };
}

const Company: FC<CompanyProps> = ({ enhet }) => {
  const { navn, naeringskode1 } = enhet;
  return <tr>
    <td className="company-name">{navn}</td>
    <td>{naeringskode1?.kode ? naeringskode1?.kode : '-'}</td>
    <td>{naeringskode1?.beskrivelse ? naeringskode1?.beskrivelse : '-'}</td>
  </tr>
}

const Companies = () => {
  const [enheter, setEnheter] = useState<Enhet[]>([]);

  const handleSearch = useCallback(async (search: string) => {
    try {
      const response = await fetch('/api/companies', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: search })
      });
      const { enheter: fetchedEnheter } = await response.json();
      setEnheter(fetchedEnheter || [])
    } catch (e) {
      console.error(e);
      setEnheter([]);
    }
  }, []);

  useEffect(() => { handleSearch('Sopra Steria') }, [handleSearch])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const searchString = formData.get('search');
    if (searchString && typeof searchString === 'string') handleSearch(searchString);
  }

  return (
    <main className="container">
      <h1>Firmaer</h1>
      <div className="search-container">
        <form className="search-box" onSubmit={onSubmit}>
          <input name="search" type="search" placeholder="Søk etter firma:" aria-label="Søk etter firma" />
          <button type="submit">Søk</button>
        </form>
      </div>

      <table className="company-table">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Næringskode</th>
            <th>Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          {enheter.map(enhet => {
            const { organisasjonsnummer } = enhet;
            return <Company key={organisasjonsnummer} enhet={enhet} />
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Companies;