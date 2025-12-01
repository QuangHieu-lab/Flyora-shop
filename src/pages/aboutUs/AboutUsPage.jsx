import Header from "pages/navfoot/Header";
import Footer from "pages/navfoot/Footer";
import AboutPage from "./AboutPage";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
};
export default AboutUsPage;
