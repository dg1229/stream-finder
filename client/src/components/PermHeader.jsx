import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

//Starter code for navbar sourced from https://react-bootstrap.github.io/components/navbar/
//Permanent navbar across the site.
export default function PermHeader() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Stream Finder</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Account</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/sponsor">Sponsor</Nav.Link>
          </Nav>
        </Navbar>
      </>
  )
}
