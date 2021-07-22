import React from 'react';

import './app-header.css';

const AppHeader = ({countOfLikedPosts, countOfAllPosts}) => {
   return(
      <div className="app-header d-flex">
         <h1>Your SUPER mini Notepad</h1>
         <h2>{countOfAllPosts} записей, из них понравилось {countOfLikedPosts}</h2>
      </div>
   );
}

export default AppHeader;