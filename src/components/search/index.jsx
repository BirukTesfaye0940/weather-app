

export default function Search({search, setSearch, handleSearch}) {
    return (
        <div className="search-bar">
            <input 
                type="text"
                name="search"
                placeholder="City Name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}/>
            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}