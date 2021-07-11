import React from 'react';

function SortDropdownSelect({ sortingQueryOptions, setSortingQuery, sortingQuery }) {
    return (
        <div className="sort-dropdown">
        { sortingQueryOptions.map((option, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => { setSortingQuery(option) }}
                        className="dropdown-query-option"
                    >
                        <div className={option === sortingQuery ? "query-option-orange selected-sort-query-option" : "query-option-orange"}><div className="orange-circle"></div></div>
                        <span>{option}</span>
                    </div>
                )
            })
        }
        </div>
    );
}

export default SortDropdownSelect;