import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();

  const buttonAdd = () => {
    navigate('/create');
  };
  return (
    <div className="navbar">
      <div className="isi-navbar">
        <Link className="h1-navbar" to={'/'}>
          Rego edwar
        </Link>
        <button className="button-add" onClick={buttonAdd}>
          add new todo
        </button>
      </div>
    </div>
  );
}
