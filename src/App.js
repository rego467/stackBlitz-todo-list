import React, { useState, useEffect } from 'react';
import './style.css';
import Home from './pages/Home';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </div>
  );
}
