'use client'

import { ArrowRight, Github, Linkedin, Menu, X, Youtube, Mail, ArrowUpRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Custom Button component
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  }
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Avatar component
const Avatar = ({ src, alt, className = "", ...props }) => {
  return (
    <div className={`relative inline-block rounded-full overflow-hidden ${className}`} {...props}>
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="object-cover w-full h-full"
      />
    </div>
  )
}

// Custom Card component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeSkill, setActiveSkill] = useState('Kotlin')
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const skillsData = {
    Kotlin: [
      { date: 'July 2022', proficiency: 0 },
      { date: 'October 2022', proficiency: 40 },
      { date: 'January 2023', proficiency: 70 },
      { date: 'March 2023', proficiency: 100 },
    ],
    Swift: [
      { date: 'February 2020', proficiency: 0 },
      { date: 'April 2020', proficiency: 40 },
      { date: 'August 2020', proficiency: 80 },
      { date: 'September 2020', proficiency: 100 },
    ],
    TypeScript: [
      { date: 'February 2023', proficiency: 0 },
      { date: 'March 2023', proficiency: 50 },
      { date: 'April 2023', proficiency: 100 },
    ],
    Java: [
      { date: 'February 2016', proficiency: 0 },
      { date: 'April 2016', proficiency: 40 },
      { date: 'June 2016', proficiency: 100 },
    ],
    JSON: [
      { date: 'June 2017', proficiency: 0 },
      { date: 'August 2017', proficiency: 100 },
    ],
    MJS: [
      { date: 'November 2021', proficiency: 0 },
      { date: 'December 2021', proficiency: 60 },
      { date: 'April 2022', proficiency: 100 },
    ],
  }

  const additionalSkills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Python", "SQL", "Git", "C", "C++",
    "TypeScript", "C#", "Lua", "R", "Swift",
    "MJS", "JSON", "Lua", "Kotlin", "Shell Scripting",
    "Bash", "Assembly", "Groovy", "Go", "AutoHotKey",
    "K", "Dart", "Js"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const scrollPosition = window.scrollY + 100 

      if (scrollPosition < projectsRef.current.offsetTop) {
        setActiveSection('home')
      } else if (scrollPosition < aboutRef.current.offsetTop) {
        setActiveSection('projects')
      } else if (scrollPosition < skillsRef.current.offsetTop) {
        setActiveSection('about')
      } else if (scrollPosition < contactRef.current.offsetTop) {
        setActiveSection('skills')
      } else {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    const ease = (t, b, c, d) => {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  const scrollTo = (ref) => {
    smoothScroll(ref.current)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')

    const formData = new FormData(event.currentTarget)
    const body = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setFormStatus('success')
        // Reset form fields
        event.currentTarget.reset()
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-500 rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-pink-500 rounded-full filter blur-[120px] opacity-5 animate-pulse"></div>

      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'w-11/12 lg:w-3/4 xl:w-2/3' : 'w-11/12 lg:w-5/6'}`}>
        <div className="bg-zinc-900/70 backdrop-blur-xl rounded-3xl px-6 py-4 transition-all duration-300 shadow-lg hover:bg-zinc-800/70">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl lg:text-2xl font-semibold relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                HeyAlex
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo(projectsRef); }}
                className={`text-base lg:text-lg transition-colors duration-200 px-3 py-2 rounded-3xl ${
                  activeSection === 'projects' ? 'bg-white text-black' : 'text-gray-200 hover:text-white'
                }`}
              >
                Projects
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); }}
                className={`text-base lg:text-lg transition-colors duration-200 px-3 py-2 rounded-3xl ${
                  activeSection === 'about' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </a>
              <a
                href="#skills"
                onClick={(e) => { e.preventDefault(); scrollTo(skillsRef); }}
                className={`text-base lg:text-lg transition-colors duration-200 px-3 py-2 rounded-3xl ${
                  activeSection === 'skills' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
                }`}
              >
                Skills
              </a>
              <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo(contactRef); }}
              className={`text-base lg:text-lg transition-colors duration-200 px-3 py-2 rounded-3xl ${
                activeSection === 'contact' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </a>
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div 
          className={`md:hidden mt-2 bg-zinc-900/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 flex flex-col space-y-4">
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo(projectsRef); toggleMobileMenu(); }} className="text-gray-300 hover:text-white text-lg transition-colors duration-200">Projects</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); toggleMobileMenu(); }} className="text-gray-300 hover:text-white text-lg transition-colors duration-200">About</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo(skillsRef); toggleMobileMenu(); }} className="text-gray-300 hover:text-white text-lg transition-colors duration-200">Skills</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo(contactRef); toggleMobileMenu(); }} className="text-gray-300 hover:text-white text-lg transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-28 max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-xl p-10 lg:p-16 space-y-10 transition-all duration-300 shadow-lg border border-zinc-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold">Hey, I'm Alex</h2>
              <p className="text-base lg:text-lg text-gray-400">Experienced Developer</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-6 h-6 lg:w-8 lg:h-8" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6 lg:w-8 lg:h-8" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-base lg:text-lg bg-white/10 border-transparent hover:bg-white/20 hover:text-white transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(contactRef); 
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              I code <br />{" "}
              <span className="text-purple-400 font-extrabold italic" style={{ fontFamily: 'Righteous, cursive' }}>
                prof<span className="inline-block animate-wiggle">e</span>ssional, top-ti<span className="inline-block animate-wiggle">e</span>r
              </span>
              <br />
              projects for clients.
            </h1>
            <p className="text-gray-400 text-xl lg:text-2xl">
              I am a passionate developer skilled in crafting diverse digital solutions, from responsive websites to custom applications, blending functionality with engaging design.
            </p>
          </div>
        </div>

        {/* Developer Of Section */}
        <div className="mt-16 lg:mt-24 text-center relative">
          <p className="text-base lg:text-lg text-gray-500 mb-6">Developer Of</p>
          <div className="flex overflow-hidden">
            <div className="flex animate-loop-scroll whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-purple-400">ProVocis</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-white">Be my next Project</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-red-400">Formasite</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-blue-400">RecEzy</span>
                </div>
              ))}
            </div>
            <div className="flex animate-loop-scroll whitespace-nowrap" aria-hidden="true">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-purple-400">ProVocis</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-white">Be my next Project</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-red-400">Formasite</span>
                  <span className="mx-6 text-2xl lg:text-4xl font-semibold text-blue-400">RecEzy</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Showcase Section */}
        <section id="projects" ref={projectsRef} className="pt-32">
          <div className="container mx-auto px-4 max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-12">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative flex items-center bg-zinc-900 rounded-full p-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <Avatar key={i} src={`/placeholder.svg?height=32&width=32`} alt={`User ${i + 1}`} className="w-8 h-8 border-2 border-zinc-900" />
                      ))}
                    </div>
                    <span className="ml-4 text-gray-300">100+ satisfied clients</span>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-white">
                Projects
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "RecEzy (Website Developer)",
                  description: "Eko, RecEzy's AI-enabled bot, is transforming the recruitment process to be simpler, faster, and more efficient",
                  image: "/placeholder.svg?height=400&width=600"
                },
                {
                  title: "ProVocis (CTO)",
                  description: "Level up your Vocabulary with ProVocis, a free learning app that helps you improve your language effortlessly.",
                  image: "/placeholder.svg?height=400&width=600"
                },
                {
                  title: "Be My Next Project!",
                  description: "Be My Next Project!",
                  image: "/placeholder.svg?height=400&width=600"
                }
              ].map((project, i) => (
                <Card key={i} className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-zinc-800/60 w-full max-w-sm mx-auto">
                  <div className="relative aspect-[4/3]">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between h-56">
                    <div className="mt-2">
                      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                    <Button variant="outline" size="lg" className="w-full text-base lg:text-lg bg-white/20 border-transparent hover:bg-white/30 hover:text-white transition-all duration-200 mt-4 rounded-xl">
                      Go to Project
                      <ArrowRight className="ml-2 w-4 h-4 animate-bounce-x" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" ref={aboutRef} className="pt-32">
          <div className="container mx-auto px-4 max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-xl p-10 lg:p-16 space-y-10 transition-all duration-300 shadow-lg border border-zinc-800/50">
              <div className="flex flex-col items-center space-y-6">
              <div className="bg-black rounded-full border border-zinc-700 px-4 py-2">
                  <h2 className="text-sm text-center text-gray-400">About Me</h2>
                </div>
                <h3 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center">I'm a Professional Developer</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Experience",
                    description: "With over 5 years in the industry, I've honed my skills across various technologies and frameworks."
                  },
                  {
                    title: "Expertise",
                    description: "Specializing in full-stack development, I create seamless, efficient, and user-friendly digital solutions."
                  },
                  {
                    title: "Innovation",
                    description: "I'm passionate about staying ahead of the curve, constantly learning and implementing cutting-edge technologies."
                  }
                ].map((item, i) => (
                  <Card key={i} className="bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 overflow-hidden transition-all duration-300 hover:bg-zinc-700/50 rounded-3xl">
                    <div className="p-8 text-center">
                      <h4 className="text-xl font-semibold mb-4 text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="pt-32">
          <div className="container mx-auto px-4 max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-xl p-10 lg:p-16 space-y-10 transition-all duration-300 shadow-lg border border-zinc-800/50">
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-black rounded-full border border-zinc-700 px-4 py-2">
                  <h2 className="text-sm text-center text-gray-400">Skills</h2>
                </div>
                <h3 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center">My Programming Expertise</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {Object.keys(skillsData).map((skill) => (
                  <Button
                    key={skill}
                    onClick={() => setActiveSkill(skill)}
                    variant={activeSkill === skill ? "default" : "outline"}
                    size="lg"
                    className={`text-base lg:text-lg ${
                      activeSkill === skill
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-white/10 border-transparent hover:bg-white/20 hover:text-white"
                    } transition-all duration-200 rounded-full`}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={skillsData[activeSkill]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis domain={[0, 100]} stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#333',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="proficiency"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#8884d8', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#fff', stroke: '#8884d8', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Additional Skills Loop */}
              <div className="mt-16 overflow-hidden">
                <div className="flex animate-loop-scroll-skills">
                  {[...Array(2)].map((_, outerIndex) => (
                    <div key={outerIndex} className="flex">
                      {additionalSkills.map((skill, index) => (
                        <div
                          key={`${outerIndex}-${index}`}
                          className="flex-shrink-0 bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/50 rounded-full px-4 py-2 m-2 shadow-lg transition-all duration-300 hover:bg-zinc-800/60"
                        >
                          <p className="text-sm text-center text-gray-400">{skill}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="pt-32">
        <div className="container mx-auto px-4 max-w-4xl lg:max-w-6xl xl:max-w-7xl">
          <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-xl p-10 lg:p-16 space-y-10 transition-all duration-300 shadow-lg border border-zinc-800/50">
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-black rounded-full border border-zinc-700 px-4 py-2">
                <h2 className="text-sm text-center text-gray-400">Contact me</h2>
              </div>
              <h3 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center">Reach out to me</h3>
              <p className="text-gray-400 text-center max-w-2xl">
              Reach out to me for support, collaborations, or to discuss your project needs. I'm here to assist you every step of the way.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 rounded-md bg-[#191919] border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-md bg-[#191919] border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-md bg-[#191919] border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                      required
                    ></textarea>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#000] hover:bg-[#0a0a0a] text-[#0a0a0a] transition-all duration-200"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send your message'}
                  </Button>
                  {formStatus === 'success' && (
                    <p className="text-green-500">Message sent successfully!</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-500">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              </div>
              <div className="space-y-6">
                <Card className="bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 overflow-hidden transition-all duration-300 rounded-3xl p-6 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-[#fff] mr-2" />
                      <span className="text-lg font-semibold text-white">Email me</span>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#191919] rounded-full transition-transform duration-300 group-hover:scale-110"></div>
                      <ArrowUpRight className="w-5 h-5 text-white relative z-10 transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  <p className="text-gray-400">alex@example.com</p>
                </Card>
                <Card className="bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 overflow-hidden transition-all duration-300 rounded-3xl p-6 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Linkedin className="w-6 h-6 text-[#fff] mr-2" />
                      <span className="text-lg font-semibold text-white">LinkedIn</span>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#191919] rounded-full transition-transform duration-300 group-hover:scale-110"></div>
                      <ArrowUpRight className="w-5 h-5 text-white relative z-10 transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  <p className="text-gray-400">linkedin.com/in/alex-example</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Footer */}
      <footer className="w-full max-w-[1600px] mx-auto bg-[#0a0a0a] py-16 mt-16 relative overflow-hidden rounded-t-[3rem]">
        <div className="absolute inset-0 z-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
          </svg>
        </div>
        <div className="container mx-auto px-8 flex flex-col items-center relative z-10 space-y-8">
          <span className="text-white text-3xl font-bold">HeyAlex</span>
          <p className="text-[#999999] text-center text-lg max-w-2xl">
          I am a passionate developer skilled in crafting diverse digital solutions, from responsive websites to custom applications, blending functionality with engaging design.
          </p>
          <div className="bg-[#1A1A1A] rounded-full px-8 py-4 flex justify-center items-center gap-4 text-lg">
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo(projectsRef); }} className="text-[#999999] hover:text-white transition-colors">
              Projects
            </a>
            <span className="text-[#666666]">•</span>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo(aboutRef); }} className="text-[#999999] hover:text-white transition-colors">
              About
            </a>
            <span className="text-[#666666]">•</span>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo(skillsRef); }} className="text-[#999999] hover:text-white transition-colors">
              Skills
            </a>
            <span className="text-[#666666]">•</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo(contactRef); }} className="text-[#999999] hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

        html, body {
          scroll-behavior: auto;
          overflow-y: auto;
        }

        /* Improved scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Custom scroll behavior */
        * {
          scrollbar-width: thin;
          scrollbar-color: #888 #1a1a1a;
        }

        @keyframes loop-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-loop-scroll {
          animation: loop-scroll 40s linear infinite;
        }
        @keyframes loop-scroll-skills {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-loop-scroll-skills {
          animation: loop-scroll-skills 60s linear infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 1.5s ease-in-out infinite;
        }
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25%);
          }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  )
}