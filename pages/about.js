import { NextSeo } from 'next-seo';
import Image from 'next/image';
import atc from 'public/static/images/about/atc.png';
import deef733 from 'public/static/images/about/deef733.png';
import tra737 from 'public/static/images/about/tra737.png';
import Layout from "../components/Layout";

export default function About() {
  const title = 'About'
  return (
    <>
    <NextSeo title={title} />
      <Layout title={title}>
        <article className="py-5">
          <Image src={deef733} alt="PJ-DPI Boeing 737-300" placeholder="blur" />

          <h3 className="text-2xl font-bold">Hello there! 👋</h3>

          <p className="py-3">I&apos;m Dave Roverts, 24 years old and from the Netherlands 🇳🇱. Web developer 🖥 by day, and flight simmer ✈️ in the evening.</p>

          <p className="py-3">At the time of writing, I use the following flight sims and aircraft:</p>
          <ul className="list-disc list-inside">
            <li>Prepar3D V5</li>
            <ul className="px-8 list-disc list-inside">
              <li>PMDG 737 NGXu</li>
              <li>PMDG 747 QOTSII</li>
              <li>PMDG 777</li>
              <li>FSLabs A320</li>
              <li>FSLabs A319</li>
              <li>Qualitywings 787</li>
            </ul>
            <li>X-Plane 11</li>
            <ul className="px-8 list-disc list-inside">
              <li>Zibo 737-800</li>
              <li>IXEG 737-300</li>
              <li>Toliss A319</li>
              <li>Toliss A321</li>
              <li>Flight Factor A320</li>
              <li>iniSimulations A300</li>
              <li>iniSimulations A300 Beluga</li>
            </ul>
          </ul>

          <Image src={tra737} alt="Transavia B737-700 final Marrakech GMMX" placeholder="blur" />

          <h3 className="py-3 text-2xl font-bold">Online flying / ATC 📡</h3>
          <p className="py-3">All my flights are flown on the <a href="https://www.vatsim.net/" className="text-blue-400 hover:underline">VATSIM network</a></p>

          <p className="py-3">Next to flying, I&apos;m also a controller currently holding both C3 and I1 ratings. My home division is the <a href="https://www.dutchvacc.nl" className="text-blue-400 hover:underline">Dutch VACC</a>.</p>

          <p className="py-3">Usually, you will find me controlling EHAA_CTR, which covers the Netherlands.</p>
          <Image src={atc} alt="Amsterdam Radar" placeholder="blur" quality={100} />
        </article>
      </Layout>
    </>
  );
}