import React, { useState, useEffect } from 'react';
import { Menu, X, Utensils, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPosDropdownOpen, setIsPosDropdownOpen] = useState(false);
  const [isMobilePosOpen, setIsMobilePosOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleTrial = () => {
    navigate('/pricing');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const posSubLinks = [
    { name: 'Billing', path: '/pos/billing' },
    { name: 'Inventory', path: '/pos/inventory' },
    { name: 'Menu', path: '/pos/menu' },
    { name: 'Report & Analytics', path: '/pos/report' },
    { name: 'Employee', path: '/pos/employee' },
    { name: 'Fine Dining', path: '/pos/finediner' },
  ];

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'POS', path: '/pos', hasDropdown: true },
    { name: 'FEATURES', path: '/features' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
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
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsPosDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsPosDropdownOpen(false)}
              >
                {link.hasDropdown ? (
                  <button
                    className={`flex items-center gap-1 font-medium transition-colors text-sm cursor-pointer ${location.pathname.startsWith(link.path) ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
                      }`}
                  >
                    {link.name}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isPosDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors text-sm ${location.pathname === link.path ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
                      }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isPosDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                      >
                        {posSubLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-4 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <div className="flex gap-3 ml-2">
              <button onClick={handleTrial} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-md shadow-orange-500/30">
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsMobilePosOpen(!isMobilePosOpen)}
                        className={`flex items-center justify-between w-full font-medium p-2 rounded-lg ${location.pathname.startsWith(link.path) ? 'bg-orange-50 text-orange-500' : 'text-slate-600'
                          }`}
                      >
                        {link.name}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobilePosOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isMobilePosOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 flex flex-col gap-1 mt-1 overflow-hidden"
                          >
                            {posSubLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-sm text-slate-600 hover:text-orange-500 rounded-md transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-medium p-2 rounded-lg ${location.pathname === link.path ? 'bg-orange-50 text-orange-500' : 'text-slate-600'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <hr className="border-slate-100 my-2" />
              <button onClick={handleTrial} className="w-full bg-orange-500 text-white px-5 py-3 rounded-xl font-medium">
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
