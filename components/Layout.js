import Footer from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container px-4 py-1 mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
