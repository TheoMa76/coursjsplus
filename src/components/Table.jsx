import React, { useState } from 'react';

export default function Table({ data }) {
    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = (searchTerm, stocked) => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (stocked) {
            filtered = filtered.filter(item => item.stocked);
        }

        setFilteredData(filtered);
    };

    const categories = Array.from(new Set(filteredData.map(item => item.category)));

    return (
        <div>
            <Filter onFilter={handleFilter} />
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <React.Fragment key={index}>
                            <Category category={category} />
                            {filteredData.filter(item => item.category === category).map((item, i) => (
                                <tr key={i} className={`${item.stocked ? "" : "text-red-700"}`}>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.price}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Category({ category }) {
    return (
        <tr>
            <th colSpan="2" className="bg-blue-200 px-4 py-2">{category}</th>
        </tr>
    );
}

function Filter({ onFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [stocked, setStocked] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilter(value, stocked);
    };

    const handleCheckboxChange = (e) => {
        const value = e.target.checked;
        setStocked(value);
        onFilter(searchTerm, value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 '
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <label>
                <input
                    type="checkbox"
                    checked={stocked}
                    onChange={handleCheckboxChange}
                />
                Stocked only
            </label>
        </div>
    );
}
