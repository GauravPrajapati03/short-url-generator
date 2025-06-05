import React, { useState, useEffect } from 'react'
import './GetData.css'

const GetData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/url');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="url-container">
            <h2>URL Shortener List</h2>
            {data && data.length > 0 ? (
                <table className="url-table">
                    <thead>
                        <tr className="url-table-header">
                            <th>No.</th>
                            <th>Short ID</th>
                            <th>Original URL</th>
                            <th>Total Clicks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((url, index) => (
                            <tr key={url.shortId} className="url-table-row">
                                <td>{index + 1}</td>
                                <td>
                                    <a 
                                        href={`http://localhost:3000/${url.shortId}`} 
                                        // target="_blank" 
                                        // rel="noopener noreferrer"
                                    >
                                        {url.shortId}
                                    </a>
                                </td>
                                <td>
                                    <a 
                                        href={url.redirectUrl} 
                                        // target="_blank" 
                                        // rel="noopener noreferrer"
                                    >
                                        {url.redirectUrl}
                                    </a>
                                </td>
                                <td className="clicks">{url.totalClicks}</td>
                                <td>
                                    <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/url/${url.shortId}`)}>
                                        Copy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-urls">No URLs found</div>
            )}
        </div>
    );
}


export default GetData