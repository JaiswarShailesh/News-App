// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { NEWS_API_URL } from '../config/api';  // Import the API URL

// const News = () => {
//     const [articles, setArticles] = useState([]); 
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios
//             .get(NEWS_API_URL)  // Use the imported URL
//             .then((response) => {
//                 setArticles(response.data.articles);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching news:', error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <div>Loading...</div>;

//     return (
//         <div>
//             <h1>Top News</h1>
//             <ul>
//                 {articles.map((article, index) => (
//                     <li key={index}>
//                         <h2>{article.title}</h2>
//                         <p>{article.description}</p>
//                         <a href={article.url} target="_blank" rel="noopener noreferrer">
//                             Read more
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default News;
