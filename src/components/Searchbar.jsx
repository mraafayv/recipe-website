import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/?q=${searchQuery}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          required
        />
      </form>
    </div>
  );
}
