import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} Vince Coscia. All rights reserved.</p>
      </div>
    </footer>
  )
}