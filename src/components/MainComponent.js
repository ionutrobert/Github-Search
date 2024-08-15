'use client'

import React, { useState } from "react";
import Profile from "./Profile";
import Repos from "./Repos";
import GistsCard from "./GistsCard";
import axios from "axios";

export default function MainComponent() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(null);
  const [gists, setGists] = useState(null);

  const REACT_APP_GH = process.env.REACT_APP_GH;

  const updateInput = (e) => {
    setUsername(e.target.value);
  };

  const searchUser = (event) => {
    event.preventDefault();
    searchProfile(username);
    searchRepos(username);
    searchGists(username);
  };

  const searchProfile = (username) => {
    axios
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${REACT_APP_GH}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const searchRepos = (username) => {
    axios
      .get(`https://api.github.com/users/${username}/repos?page=1&per_page=100`, {
        headers: {
          Authorization: `token ${REACT_APP_GH}`,
        },
      })
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const searchGists = (username) => {
    axios
      .get(`https://api.github.com/users/${username}/gists`, {
        headers: {
          Authorization: `token ${REACT_APP_GH}`,
        },
      })
      .then((res) => {
        setGists(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    
    <main className="container mx-auto px-4 py-8">
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <div className="search mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Search Github User</h1>
        </div>
        <div>
          <form id="form" onSubmit={searchUser} className="flex">
            <input
              onChange={updateInput}
              value={username}
              type="text"
              id="search"
              placeholder="Github Username"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="submit"
              id="searchBtn"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value="Search"
            />
          </form>
        </div>
      </div>

      <div className="results">
        {profile && <Profile profile={profile} />}
        {repos && <Repos repos={repos} />}
        {gists && <GistsCard gists={gists} />}
      </div>
    </main>
  );
}