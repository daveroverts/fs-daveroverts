import { NextSeo } from "next-seo";
import Layout from "../components/Layout";

export default function Specs() {
  const title = "Specs";
  return (
    <>
      <NextSeo title={title} />
      <Layout title="Specs">
        <article className="py-5">
          <h3 className="text-2xl font-bold">Hardware</h3>
          <ul className="px-1 py-5 list-disc list-inside">
            <li>CPU: Intel Core i7-10700K</li>
            <li>Motherboard: Asus ROG Strix Z490-F Gaming</li>
            <li>GPU: MSI GeForce RTX 4090 SUPRIM X 24G</li>
            <li>Case: NZXT H5 Elite White</li>
            <li>Watercooler: Corsair Hydro H100i RGB Platinum</li>
            <li>RAM: Corsair Vengeance LPX CMK32GX4M2B3200C16</li>
            <li>PSU: Corsair RM750x (2018)</li>
            <li>Storage: Intel 660p 2TB [2x] + Samsung 870 QVO 4TB</li>
          </ul>
          <h3 className="text-2xl font-bold">Peripherals</h3>
          <ul className="px-1 py-5 list-disc list-inside">
            <li>
              Keyboard: Corsair K70 LUX Mechanical Gaming Keyboard - Red LED
            </li>
            <li>Mouse: Logitech G903 Hero</li>
            <li>Mouse pad: Logitech G640 Gaming</li>
            <li>Joystick / Throttle: Thrustmaster TCA Sidestick Airbus Edition</li>
          </ul>
        </article>
      </Layout>
    </>
  );
}
