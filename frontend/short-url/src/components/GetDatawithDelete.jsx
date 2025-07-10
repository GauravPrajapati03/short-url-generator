import { useState, useEffect } from "react";

const GetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch URLs
  const fetchUrls = async () => {
    try {
      const response = await fetch("http://localhost:3000/url");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [data]);

  // Delete URL handler
  const handleDelete = async (shortId) => {
    try {
      const response = await fetch(`http://localhost:3000/url/${shortId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }

      // Refresh the list after deletion
      fetchUrls();
    } catch (error) {
      console.error("Error deleting URL:", error);
      alert("Failed to delete URL");
    }
  };

  // Copy URL handler
  const handleCopy = (shortId) => {
    navigator.clipboard.writeText(`http://localhost:3000/url/${shortId}`);
    alert("Short URL copied to clipboard!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="url-container">
      <h2>Shortened URLs List</h2>
      {data && data.length > 0 ? (
        <table
          className="url-table"
          style={{
            border: "1px solid white",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
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
                  <a href={`http://localhost:3000/${url.shortId}`}>
                    {url.shortId}
                  </a>
                </td>
                <td>
                  <a href={url.redirectUrl}>{url.redirectUrl}</a>
                </td>
                <td className="clicks">{url.totalClicks}</td>
                <td className="action-buttons">
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(url.shortId)}
                  >
                    Copy
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(url.shortId)}
                  >
                    Delete
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
};

export default GetData;
