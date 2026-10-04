import About from "@/components/About";
import BootSequence from "@/components/BootSequence";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Cursor from "@/components/Cursor";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import StatusBar from "@/components/StatusBar";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <BootSequence />
      <StatusBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <Terminal />
      <Cursor />
    </>
  );
}
