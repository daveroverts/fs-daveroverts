import Footer from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children, title, subtitle }) {
  return (
    <div className="container px-16 py-3 mx-auto text-black dark:text-white">
      <Navbar />
      <main>
        {title !== undefined && (
          <div className="py-5">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle !== undefined && (
              <p className="font-semibold">{subtitle}</p>
            )}
          </div>
        )}
        {children}
        <Footer />
      </main>
    </div>
  );
}
