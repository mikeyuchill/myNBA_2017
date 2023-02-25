import React from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/logo/nba_logo.svg"

const Nav = () => {
  return (
    <header className="App-header px-2 bg-gray-800 flex w-full py-1">
      <nav className="">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="text-3xl text-white font-bold  tracking-wide">MyNBA</h1>
        </Link>
      </nav>
    </header>
  )
}

export default Nav