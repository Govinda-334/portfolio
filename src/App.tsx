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
        "service_lb36ucx",          // ✅ Service ID
        "template_dwqy4hp",         // ✅ Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "9ZwgNkO8ucaQU9kxQ"          // ✅ Public Key
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <MouseFollower />

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
              <p className="text-green-400 text-center">
                ✅ Message sent successfully!
              </p>
            )}
            {success === false && (
              <p className="text-red-400 text-center">
                ❌ Failed to send message
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
