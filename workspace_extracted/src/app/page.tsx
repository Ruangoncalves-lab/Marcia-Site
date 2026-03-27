'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  Send,
  Instagram,
  MessageCircle,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'

// Navigation items
const navItems = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Quem Somos' },
  { id: 'products', label: 'Produtos' },
  { id: 'contact', label: 'Contato' },
]

// Product categories with images
const productCategories = [
  {
    id: 1,
    title: 'Linha Kraft',
    description: 'Embalagens kraft para delivery, ideais para alimentos quentes e frios. Resistência e praticidade em um só produto.',
    gradient: 'from-[#19402A] to-[#255937]',
  },
  {
    id: 2,
    title: 'Linha Kraft Plus',
    description: 'Versão premium com maior resistência e acabamento diferenciado. Perfeita para quem busca excelência.',
    gradient: 'from-[#255937] to-[#9DA65B]',
  },
  {
    id: 3,
    title: 'Linha P&B',
    description: 'Embalagens brancas e kraft para alimentos secos. Versatilidade para diversos tipos de negócio.',
    gradient: 'from-[#9DA65B] to-[#8C8745]',
  },
  {
    id: 4,
    title: 'Embalagens Seladas',
    description: 'Bandejas e tampas para selagem a vácuo. Mantenha seus produtos frescos por mais tempo.',
    gradient: 'from-[#8C8745] to-[#19402A]',
  },
  {
    id: 5,
    title: 'Potes e Copos',
    description: 'Linha completa de potes e copos para bebidas e alimentos. Qualidade que seu cliente percebe.',
    gradient: 'from-[#19402A] to-[#8C8745]',
  },
  {
    id: 6,
    title: 'Personalizados',
    description: 'Produtos com personalização exclusiva para sua marca. Destaque-se da concorrência.',
    gradient: 'from-[#9DA65B] to-[#19402A]',
  },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const { toast } = useToast()

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Handle newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: 'Cadastro realizado!',
      description: 'Você receberá nossas novidades em breve.',
    })
    setNewsletterEmail('')
    setIsSubmitting(false)
  }

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: 'Mensagem enviada!',
      description: 'Entraremos em contato em breve.',
    })
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#DDD7B3]">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/favicon.png"
                  alt="MCosta Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#19402A] tracking-tight">
                  MCosta
                </h1>
                <p className="text-xs text-[#255937] -mt-0.5 tracking-widest uppercase">
                  Representações
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#19402A] hover:text-[#255937] font-medium text-sm tracking-wide relative group transition-colors"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9DA65B] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#19402A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-[#9DA65B]/20"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start text-[#19402A] hover:bg-[#9DA65B]/20"
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#9DA65B]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#255937]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8C8745]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-[#9DA65B]/30 text-[#19402A] rounded-full text-sm font-medium mb-6"
              >
                Representante Autorizado EcoFoodPack
              </motion.span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#19402A] leading-tight">
                Embalagens
                <span className="block text-[#255937]">Sustentáveis</span>
                <span className="block text-[#8C8745]">para seu Negócio</span>
              </h1>
              
              <p className="mt-6 text-lg text-[#255937]/80 max-w-lg leading-relaxed">
                Soluções ecológicas e de alta qualidade para restaurantes, fast food e delivery. 
                Representamos a EcoFoodPack, referência em embalagens que respeitam o meio ambiente.
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection('products')}
                  className="bg-[#19402A] hover:bg-[#255937] text-white px-8 py-6 text-lg rounded-full group"
                >
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-[#19402A] text-[#19402A] hover:bg-[#19402A] hover:text-white px-8 py-6 text-lg rounded-full"
                >
                  Fale Conosco
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Abstract Shape with Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#19402A] via-[#255937] to-[#9DA65B] rounded-[60px] rotate-6 opacity-90" />
                <div className="absolute inset-0 bg-[#DDD7B3] rounded-[60px] rotate-3" />
                <div className="absolute inset-4 bg-gradient-to-br from-[#19402A] to-[#255937] rounded-[50px] overflow-hidden">
                  <Image
                    src="/hero-image.png"
                    alt="Embalagens sustentáveis"
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[#9DA65B]/30"
          >
            {[
              { number: '100%', label: 'Sustentável' },
              { number: '+500', label: 'Clientes Atendidos' },
              { number: '+50', label: 'Tipos de Produtos' },
              { number: '5★', label: 'Avaliação' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#19402A]">{stat.number}</p>
                <p className="text-sm text-[#255937]/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9DA65B]/10 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px]">
                <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-[#19402A] rounded-3xl" />
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[#9DA65B] rounded-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-br from-[#255937] to-[#8C8745] rounded-3xl overflow-hidden">
                  <Image
                    src="/hero-image.png"
                    alt="MCosta Representações"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#9DA65B] font-semibold tracking-widest uppercase text-sm">
                Sobre Nós
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#19402A] mt-4 leading-tight">
                Quem Somos
              </h2>
              
              <p className="mt-6 text-lg text-[#255937]/80 leading-relaxed">
                A <strong className="text-[#19402A]">MCosta Representações</strong> é uma empresa 
                especializada em representação comercial de embalagens sustentáveis. Como representante 
                autorizado da <strong className="text-[#19402A]">EcoFoodPack</strong>, oferecemos 
                soluções completas em embalagens para restaurantes, fast food, delivery e 
                estabelecimentos alimentícios em geral.
              </p>
              
              <p className="mt-4 text-lg text-[#255937]/80 leading-relaxed">
                Nossa missão é conectar empresas a produtos de qualidade que respeitam o meio ambiente, 
                proporcionando um atendimento personalizado e comprometido com a satisfação de nossos clientes.
              </p>

              {/* Values */}
              <div className="grid sm:grid-cols-3 gap-6 mt-10">
                {[
                  { title: 'Missão', desc: 'Conectar empresas a produtos sustentáveis de qualidade' },
                  { title: 'Visão', desc: 'Ser referência em representação comercial de embalagens' },
                  { title: 'Valores', desc: 'Ética, transparência e compromisso com o cliente' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-[#DDD7B3]/50 rounded-2xl"
                  >
                    <h4 className="font-bold text-[#19402A]">{item.title}</h4>
                    <p className="text-sm text-[#255937]/70 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-[#19402A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#255937]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#9DA65B]/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#9DA65B] font-semibold tracking-widest uppercase text-sm">
              Catálogo
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4">
              Nossos Produtos
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Representamos a linha completa de embalagens EcoFoodPack, 
              líderes em soluções sustentáveis para o setor alimentício.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-[#9DA65B]/50 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-32 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-4 left-6">
                        <span className="text-white/60 text-sm">0{index + 1}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#9DA65B] transition-colors">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-white/60 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-[#9DA65B] hover:bg-[#8C8745] text-[#19402A] px-8 py-6 text-lg rounded-full font-semibold"
            >
              Solicitar Orçamento
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-[#DDD7B3] to-[#9DA65B]/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#255937]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19402A]">
              Receba Novidades
            </h2>
            <p className="mt-4 text-lg text-[#255937]/80">
              Cadastre-se para receber informações sobre novos produtos e promoções exclusivas.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleNewsletterSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-white border-[#9DA65B] text-[#19402A] placeholder:text-[#255937]/50 focus:border-[#19402A] h-14 px-6 max-w-md rounded-full"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#19402A] hover:bg-[#255937] text-white h-14 px-8 rounded-full font-semibold"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9DA65B]/10 rounded-full blur-3xl translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#9DA65B] font-semibold tracking-widest uppercase text-sm">
              Contato
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#19402A] mt-4">
              Fale Conosco
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-gradient-to-br from-[#19402A] to-[#255937] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <a
                    href="mailto:mcostaecofoodpack@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">E-mail</p>
                      <p className="font-medium">mcostaecofoodpack@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5521982336850"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">WhatsApp</p>
                      <p className="font-medium">(21) 98233-6850</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Horário de Atendimento</p>
                      <p className="font-medium">Seg a Sex: 8h às 18h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/20">
                  <p className="text-white/60 text-sm mb-4">Siga-nos nas redes sociais</p>
                  <a
                    href="https://instagram.com/ecofoodpack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-[#9DA65B] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>@ecofoodpack</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="bg-[#DDD7B3]/30 border-[#9DA65B]/20 rounded-3xl overflow-hidden">
                <CardContent className="p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-[#19402A] mb-8">
                    Envie sua Mensagem
                  </h3>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#19402A] font-medium">
                          Nome *
                        </Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Seu nome"
                          className="bg-white border-[#9DA65B]/30 focus:border-[#19402A] h-12 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#19402A] font-medium">
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="seu@email.com"
                          className="bg-white border-[#9DA65B]/30 focus:border-[#19402A] h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#19402A] font-medium">
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="bg-white border-[#9DA65B]/30 focus:border-[#19402A] h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#19402A] font-medium">
                          Assunto
                        </Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Assunto"
                          className="bg-white border-[#9DA65B]/30 focus:border-[#19402A] h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#19402A] font-medium">
                        Mensagem *
                      </Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Sua mensagem..."
                        rows={5}
                        className="bg-white border-[#9DA65B]/30 focus:border-[#19402A] resize-none rounded-xl"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#19402A] hover:bg-[#255937] text-white h-14 rounded-xl text-lg font-semibold"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#19402A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/favicon.png"
                    alt="MCosta Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">MCosta</h3>
                  <p className="text-xs text-[#9DA65B] -mt-0.5 tracking-widest uppercase">Representações</p>
                </div>
              </div>
              <p className="text-white/60 max-w-xs leading-relaxed">
                Representação comercial especializada em embalagens sustentáveis. 
                Conectamos sua empresa a produtos de qualidade.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-white/60 hover:text-[#9DA65B] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-6">Contato</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:mcostaecofoodpack@gmail.com"
                    className="flex items-center gap-2 text-white/60 hover:text-[#9DA65B] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    mcostaecofoodpack@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5521982336850"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-[#9DA65B] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    (21) 98233-6850
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/ecofoodpack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-[#9DA65B] transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    @ecofoodpack
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm text-center sm:text-left">
                © 2024 MCosta Representações. Todos os direitos reservados.
              </p>
              <p className="text-white/40 text-sm">
                Representante autorizado EcoFoodPack
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/5521982336850"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.a>
    </div>
  )
}
