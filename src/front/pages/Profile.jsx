import React from 'react'

function Profile() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  return (
    <div>
      <h1>Este es el  profile de {user.email} </h1>
    </div>
  )
}

export default Profile
