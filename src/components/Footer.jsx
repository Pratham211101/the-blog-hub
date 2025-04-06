import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/tbh-logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-500 w-full  text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-4 md:max-w-sm">
            <img src={Logo} alt="Logo" className="w-20 object-contain h-auto" />
            <p className="text-sm text-gray-200">
              &copy; {new Date().getFullYear()} The Blog Hub. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-300 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Features</Link></li>
                <li><Link to="/" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/" className="hover:text-white">Affiliate</Link></li>
                <li><Link to="/" className="hover:text-white">Press</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-300 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Account</Link></li>
                <li><Link to="/" className="hover:text-white">Help</Link></li>
                <li><Link to="/" className="hover:text-white">Contact</Link></li>
                <li><Link to="/" className="hover:text-white">Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-300 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Terms</Link></li>
                <li><Link to="/" className="hover:text-white">Privacy</Link></li>
                <li><Link to="/" className="hover:text-white">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
