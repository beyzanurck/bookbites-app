import { Outlet } from "react-router-dom";

import React from 'react'
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <div>
        <NavBar />

        <div className="container" data-testid="container">
            <Outlet />
        </div>

    </div>
  )
}
