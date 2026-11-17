import React, { useState, useEffect } from 'react'
import { Search as IcnSearch } from 'lucide-react';
import Song from '../entity/entity';
import { SearchDialog } from './search_dialog';
import SearchResult from '../entity/search_result';

interface SearchProps {
    onSelected?: (song: Song) => void
}

export const Search: React.FC<SearchProps> = ({ onSelected }) => {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult>({} as SearchResult);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setSearchResults({} as SearchResult);
            return;
        }

        const handler = setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:8888/kidung-jemaat/search/unified?q=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: SearchResult = await response.json();
                setSearchResults(data);
                setOpen(true)
            } catch (error) {
                console.error('Search failed:', error);
                setSearchResults({} as SearchResult);
            }
        }, 300); // Debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    return (
        <>
            <div className="search" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input 
                    className='global-search' 
                    name='q' 
                    type="input" 
                    placeholder='search' 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                 <IcnSearch className='search-btn' size="1em" />
                {/* <IcnSearch size={18} style={{padding: "2px"}}/> */}
            </div >
            <div style={{ position: "relative" }}>
                <SearchDialog data={searchResults} isOpen={open} onOpenChange={setOpen} onSelected={(s) => { if (onSelected) {onSelected(s)}; setOpen(false)}}/>
            </div >
        </>
    )
}
