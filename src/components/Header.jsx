import React from 'react'
import { Container, Logo, LogoutBtn } from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/tbh-logo.png'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="TBH Logo" className='w-[70px] object-contain h-auto' />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
