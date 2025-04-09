import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/tbh-logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#BDDDE4] w-full text-[#2C3E50]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-4 md:max-w-sm">
            <img src={Logo} alt="Logo" className="w-20 object-contain h-auto" />
            <p className="text-sm text-[#2C3E50]">
              &copy; {new Date().getFullYear()} The Blog Hub. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-[#374151] mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Features</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Pricing</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Affiliate</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-[#374151] mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Account</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Help</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Contact</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-[#374151] mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Terms</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Privacy</Link></li>
                <li><Link to="/" className="hover:text-[#FFF1D5] transition-colors">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
