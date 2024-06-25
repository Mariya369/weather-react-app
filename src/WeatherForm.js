import React, { useState, useCallback } from "react";

export default function WeatherForm({ onSearch }) {
    const [input, setInput] = useState("");
    
    const handleInputChange = useCallback((event) => {
        setInput(event.target.value);
        onSearch(event.target.value);
    }, [onSearch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-9">
                    <input
                    type="search"
                    placeholder="Enter a city..."
                    className="form-control"
                    autoFocus="on"
                    value={input}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-3">
                    <input type="submit" value="Search" className="btn btn-primary w-100" />
                </div>
            </div>
        </form>
    );
}
