import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  
  const { user } = useAuth0();

  return (
    <div>
      <p> {user.name}'s Page </p>
    </div>
  )
}
