import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Globe,
  Terminal,
  Layers,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Rocket,
  Award,
  Code2,
  SyringeIcon,
} from "lucide-react";
import emailjs from "@emailjs/browser";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          if (
            scrollPos >= el.offsetTop &&
            scrollPos < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  /* ===================== CONTACT FORM ===================== */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_lb36ucx", // ✅ Service ID
        "template_dwqy4hp", // ✅ Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "9ZwgNkO8ucaQU9kxQ" // ✅ Public Key
      );

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  /* ===================== UI HELPERS ===================== */

  const MouseFollower = () => (
    <div
      className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
      }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-50 animate-ping" />
    </div>
  );

  /* ===================== JSX ===================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      <MouseFollower />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl z-50 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Govinda
              </span>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["home", "about", "skills", "projects", "education", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                      activeSection === item
                        ? "text-blue-400 bg-white/10 shadow-lg shadow-blue-500/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-xl animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "skills", "projects", "education", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item
                      ? "text-blue-400 bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Placeholder */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Home Section</h1>
          <p className="text-xl text-gray-300">This is a placeholder. Add your hero content here.</p>
        </div>
      </section>

      {/* About Section - Placeholder */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Section</h2>
          <p className="text-gray-300 text-center">Add your about content here.</p>
        </div>
      </section>

      {/* Skills Section - Placeholder */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Skills Section</h2>
          <p className="text-gray-300 text-center">Add your skills content here.</p>
        </div>
      </section>

      {/* Projects Section - Placeholder */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Projects Section</h2>
          <p className="text-gray-300 text-center">Add your projects content here.</p>
        </div>
      </section>

      {/* Education Section - Placeholder */}
      <section id="education" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Education Section</h2>
          <p className="text-gray-300 text-center">Add your education content here.</p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Get In Touch</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            />

            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>

            {success === true && (
              <p className="text-green-400 text-center">✅ Message sent successfully!</p>
            )}
            {success === false && (
              <p className="text-red-400 text-center">❌ Failed to send message</p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-black/40 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Govinda
            </span>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/Stark1120"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
            >
              <Github className="w-6 h-6 group-hover:animate-spin" />
            </a>
            <a
              href="https://www.linkedin.com/in/govinda-prajapati-b6aa34250"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
            >
              <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
            </a>
            <a
              href="mailto:govindaprajapati878@gmail.com"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
            >
              <Mail className="w-6 h-6 group-hover:animate-bounce" />
            </a>
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">© 2025 Govinda Prajapati. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
