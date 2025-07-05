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

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
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
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    {
      name: "HTML",
      level: 95,
      icon: <Code2 className="w-6 h-6" />,
      color: "from-brown-400 to-brown-600",
    },
    {
      name: "CSS",
      level: 90,
      icon: <SyringeIcon className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: <Terminal className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "JavaScript",
      level: 88,
      icon: <Globe className="w-6 h-6" />,
      color: "from-yellow-300 to-orange-500",
    },
    {
      name: "React",
      level: 82,
      icon: <Layers className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Java",
      level: 85,
      icon: <Code className="w-6 h-6" />,
      color: "from-red-400 to-red-600",
    },
  ];

  const projects = [
    {
      title: "Expense Tracker App",
      description:
        "This is a simple web-based expense tracker that allows users to add and manage their expenses. Built with HTML, CSS, and React, the application provides an intuitive interface for recording spending.",
      tech: ["React", "Tailwind CSS", "mock APIs"],
      image: "https://govinda-porfolio.netlify.app/assets/expense-DwOzdvJ7.jpg",
      demo: "#",
      github: "https://github.com/Stark1120",
      featured: true,
    },
    {
      title: "Weather Web Application",
      description:
        "This is a simple weather application that shows users real-time weather information. Users can enter the name of any city to see the temperature, weather condition (like clear, cloudy, rainy), humidity, and wind speed for that location.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "https://govinda-porfolio.netlify.app/assets/weather-epHpeGpb.jpg",
      demo: "#",
      github: "https://github.com/Stark1120",
      featured: false,
    },
    {
      title: "Login Page",
      description:
        "This is a simple login page to check my skill of HTML, CSS, Javascript.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/login.png",
      demo: "#",
      github: "https://github.com/Stark1120",
      featured: false,
    },
  ];

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  const MouseFollower = () => (
    <div
      className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        transition: "all 0.1s ease-out",
      }}>
      <div className="w-full h-full bg-white rounded-full opacity-50 animate-ping" />
    </div>
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceId = "service_lb36ucx";
      const templateId = "template_dwqy4hp";
      const publicKey = "9ZwgNkO8ucaQU9kxQ";

      await emailjs.send(serviceId, templateId, formData, publicKey);

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error: " + error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      <FloatingParticles />
      <MouseFollower />

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
                {[
                  "home",
                  "about",
                  "skills",
                  "projects",
                  "education",
                  "contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                      activeSection === item
                        ? "text-blue-400 bg-white/10 shadow-lg shadow-blue-500/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-xl animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                "home",
                "about",
                "skills",
                "projects",
                "education",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item
                      ? "text-blue-400 bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className=" relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16 sm:pt-0 ">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div
          className={`text-center max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="mb-8">
            <div className="inline-flex mt-4 items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-slideDown">
              <Star className="w-4 h-4 text-yellow-400 animate-spin" />
              <span className="text-sm">Available for Opportunities</span>
              <Zap className="w-4 h-4 text-blue-400 animate-bounce" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slideUp">
              Govinda Prajapati
            </h1>

            <div className="relative">
              <p
                className="text-xl md:text-2xl text-gray-300 mb-8 animate-slideUp"
                style={{ animationDelay: "0.2s" }}>
                Full-Stack Developer & Software Engineer
              </p>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse" />
            </div>

            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 animate-slideUp"
              style={{ animationDelay: "0.4s" }}>
              Passionate about creating innovative solutions with modern
              technologies. Skilled in HTML, CSS, Java, JavaScript, and React
              development.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slideUp"
            style={{ animationDelay: "0.6s" }}>
            <button
              onClick={() => scrollToSection("projects")}
              className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                <span>View My Work</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-3 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                <span>Get In Touch</span>
              </span>
            </button>
          </div>

          <div
            className="flex justify-center space-x-6 animate-slideUp"
            style={{ animationDelay: "0.8s" }}>
            <a
              href="https://github.com/Stark1120"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Github className="w-6 h-6 group-hover:animate-pulse" />
            </a>
            <a
              href="https://www.linkedin.com/in/govinda-prajapati-b6aa34250"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
            </a>
            <a
              href="mailto:govindaprajapati878@gmail.com"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Mail className="w-6 h-6 group-hover:animate-pulse" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400 animate-pulse" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideUp">
              About Me
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.2s" }}>
              A dedicated and passionate software developer with expertise in
              multiple programming languages and modern web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slideLeft">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello! I'm Govinda Prajapati, a software developer with a BSc in
                Information Technology. I have a strong foundation in computer
                science principles and hands-on experience with various
                programming languages and frameworks.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in software development started during my
                undergraduate studies, where I discovered my passion for
                creating efficient, scalable, and user-friendly applications. I
                enjoy working on challenging projects that push me to learn new
                technologies and solve complex problems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm currently seeking opportunities to contribute to innovative
                projects and grow as a professional developer in a dynamic team
                environment.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="group flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <MapPin className="w-4 h-4 text-blue-400 group-hover:animate-bounce" />
                  <span className="text-sm">Available for Remote Work</span>
                </div>
                <a
                  href="/Govinda_Prajapati_Resume.pdf"
                  download="Govinda_Prajapati_Resume.pdf"
                  className="group flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <Download className="w-4 h-4 text-blue-400 group-hover:animate-bounce" />
                  <span className="text-sm">Download Resume</span>
                </a>
              </div>
            </div>

            <div className="relative animate-slideRight">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:animate-pulse">
                      BSc
                    </div>
                    <div className="text-gray-300">Information Technology</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:animate-pulse">
                      6+
                    </div>
                    <div className="text-gray-300">Programming Languages</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-pink-400 mb-2 group-hover:animate-pulse">
                      10+
                    </div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-green-400 mb-2 group-hover:animate-pulse">
                      100%
                    </div>
                    <div className="text-gray-300">Commitment Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideUp">
              Technical Skills
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.2s" }}>
              Proficient in multiple programming languages and modern
              development frameworks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`text-white p-3 rounded-full bg-gradient-to-r ${skill.color} group-hover:animate-spin`}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-gray-400">{skill.level}% Proficiency</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                    style={{
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.2}s`,
                    }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideUp">
              Featured Projects
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.2s" }}>
              A selection of my best work showcasing various technologies and
              problem-solving approaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 hover:shadow-2xl animate-slideUp ${
                  project.featured ? "ring-2 ring-blue-400/50" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}>
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs hover:bg-blue-500/30 transition-colors duration-300 transform hover:scale-110">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="group/link flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                      <ExternalLink className="w-4 h-4 group-hover/link:animate-bounce" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="group/link flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110">
                      <Github className="w-4 h-4 group-hover/link:animate-spin" />
                      <span className="text-sm">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideUp">
              Education
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.2s" }}>
              Academic foundation that shaped my technical expertise
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-slideUp">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <span className="text-2xl font-bold">BSc</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Bachelor of Science in Information Technology
                  </h3>
                  <p className="text-blue-400 mb-4 font-semibold">
                    2022 - 2025
                  </p>
                  <p className="text-gray-300 mb-6">
                    Comprehensive study of computer science fundamentals,
                    programming concepts, database management, software
                    engineering principles, and web development technologies.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group/item">
                      <h4 className="font-semibold mb-2 text-blue-400 group-hover/item:animate-pulse">
                        Key Subjects
                      </h4>
                      <ul className="text-gray-300 space-y-1">
                        <li className="hover:text-white transition-colors duration-300">
                          • Object-Oriented Programming
                        </li>
                        <li className="hover:text-white transition-colors duration-300">
                          • Database Management Systems
                        </li>
                        <li className="hover:text-white transition-colors duration-300">
                          • Web Development
                        </li>
                      </ul>
                    </div>
                    <div className="group/item">
                      <h4 className="font-semibold mb-2 text-blue-400 group-hover/item:animate-pulse">
                        Achievements
                      </h4>
                      <ul className="text-gray-300 space-y-1">
                        <li className="hover:text-white transition-colors duration-300">
                          • Strong academic performance
                        </li>
                        <li className="hover:text-white transition-colors duration-300">
                          • Multiple project completions
                        </li>
                        <li className="hover:text-white transition-colors duration-300">
                          • Programming contest participation
                        </li>
                        <li className="hover:text-white transition-colors duration-300">
                          • Technical seminar presentations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideUp">
              Get In Touch
            </h2>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.2s" }}>
              Ready to collaborate on exciting projects or discuss opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slideLeft">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities and
                  exciting projects. Whether you have a question or just want to
                  say hi, I'll get back to you!
                </p>
              </div>

              <div className="space-y-4">
                <div className="group flex items-center space-x-4 hover:bg-white/5 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors duration-300">
                      govindaprajapati878@gmail.com
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 hover:bg-white/5 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-green-400 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-white group-hover:text-green-400 transition-colors duration-300">
                      +91 95943 85360
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 hover:bg-white/5 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-purple-400 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white group-hover:text-purple-400 transition-colors duration-300">
                      Available for Remote Work
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/Stark1120"
                  className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Github className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:animate-spin" />
                </a>
                <a
                  href="https://www.linkedin.com/in/govinda-prajapati-b6aa34250"
                  className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-blue-400 group-hover:animate-pulse" />
                </a>
                <a
                  href="mailto:govindaprajapati878@gmail.com"
                  className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Mail className="w-6 h-6 text-gray-300 group-hover:text-purple-400 group-hover:animate-bounce" />
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-500 transform hover:scale-105 animate-slideRight">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/15"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300 hover:bg-white/15"
                    placeholder="Tell me about your project or opportunity..."></textarea>
                </div>

                <button
                  type="submit"
                  className="group w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                {success === true && (
                  <p className="text-green-600 text-center mt-4">
                    Message sent successfully!
                  </p>
                )}
                {success === false && (
                  <p className="text-red-600 text-center mt-4">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black/40 py-12 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Govinda
            </span>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/Stark1120"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Github className="w-6 h-6 group-hover:animate-spin" />
            </a>
            <a
              href="https://www.linkedin.com/in/govinda-prajapati-b6aa34250"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
            </a>
            <a
              href="mailto:govindaprajapati878@gmail.com"
              className="group text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Mail className="w-6 h-6 group-hover:animate-bounce" />
            </a>
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              © 2025 Govinda Prajapati. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
