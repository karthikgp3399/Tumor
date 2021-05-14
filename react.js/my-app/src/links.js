import React from "react";
import { Link } from "react-router-dom";
export function Links() {
  return (
    <div className="links">
      <Link to="/movies">Movies</Link> <br />
      <Link to="/calc">Calculator</Link>
      
    </div>
  );
}