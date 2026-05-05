import React, { useState, useEffect } from 'react';
import { Menu, X, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'POS', path: '/pos' },
    { name: 'FEATURES', path: '/features' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Restro<span className="text-orange-500">Suite</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`font-medium transition-colors text-sm ${location.pathname === link.path ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-3 ml-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-md shadow-orange-500/30">
                Free Trial
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-4 flex flex-col gap-2"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`font-medium p-2 rounded-lg ${location.pathname === link.path ? 'bg-orange-50 text-orange-500' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-slate-100 my-2" />
          <button className="w-full bg-orange-500 text-white px-5 py-3 rounded-xl font-medium mt-2">
            Start Free Trial
          </button>
        </motion.div>
      )}
    </header>
  );
};
