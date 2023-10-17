import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import Profile from './pages/Profile/Profile';

export default function AllRoutes() {
  return (
    <Routes>
      {/* SideBar Routes */}
      <Route exact path="/" element={<Home />} />

      <Route exact path="/users" element={<Home />} />
      <Route exact path="/users/:id" element={<Profile />} />

      <Route exact path="/tags" element={<Home />} />

      <Route exact path="/questions" element={<Home />} />
      <Route exact path="/questions/:id" element={<Home />} />

      <Route exact path="/player" element={<Home />} />

      {/* Page Routes */}
      <Route exact path="/ask_question" element={<AskQuestion />} />

      {/* NavBar Routes */}
      <Route exact path="/auth" element={<Auth />} />
      <Route exact path="/about" element='' />
      <Route exact path="/products" element='' />
      <Route exact path="/for_teams" element='' />
    </Routes>
  )
}
