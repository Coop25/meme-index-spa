import React, { useState, useEffect } from 'react';
import CardTable from '../../components/cardTable/cardTable';
import './memeTable.css';

const MemeTable = ({ selectedTags }) => {
    const [page, setPage] = useState(1);
    const [memeData, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        console.log('Fetching data for page:', page, 'with tags:', selectedTags);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    selectedTags.length > 0
                        ? process.env.API_BASE_URL+`/tags/search?tags=${encodeURIComponent(selectedTags.join(","))}&page=${page}`
                        : process.env.API_BASE_URL+`/files/list?page=${page}`
                );
                const data = await response.json();
                console.log('Fetched data:', data);
                if (data.memes.length > 0) {
                    setData(data.memes); // Update items state with fetched data
                    setPageCount(data.pageCount); // Update page count
                } else {
                    setData([]);
                    setPageCount(0);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedTags, page]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="MemeTable">
            <div className="pagination-buttons">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={page >= pageCount}>Next</button>
            </div>
            <CardTable items={memeData} />
            <div className="pagination-buttons">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={page >= pageCount}>Next</button>
            </div>
        </div>
    );
};

export default MemeTable;