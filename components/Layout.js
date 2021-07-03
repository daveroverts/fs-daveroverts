import Footer from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children, title, subtitle }) {
  return (
    <div className="container px-4 py-3 mx-auto">
      <Navbar />
      {title !== undefined && (
        <div className="py-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          {subtitle !== undefined && (
            <p className="font-semibold">{subtitle}</p>
          )}
        </div>
      )}
      <main>
        {children}
      <Footer />
      </main>
    </div>
  );
}
