import React, { useEffect, useState } from 'react';
import { sortApartmentsAction } from '../../../actions/apartmentsActions';
import ExpandArrow from '../advanced_search/ExpandArrow';
import SortDropdownSelect from './SortDropdownSelect';

function SortApartments({
    isSortingDropdownOpen,
    setIsSortingDropdownOpen,
    apartmentsState,
    dispatchApartmentsData
}) {
    const sortingQueryOptions = ['לפי תאריך', 'מחיר - מהזול ליקר', 'מחיר - מהיקר לזול'];
    const [sortingQuery, setSortingQuery] = useState(sortingQueryOptions[0]);

    useEffect(() => {
        const queryIndex = sortingQueryOptions.indexOf(sortingQuery);
        const sortedApartments = [ ...apartmentsState.apartments ];

        switch (queryIndex) {
            case 0:
                sortedApartments.sort((a, b) => {
                    return new Date(b.apartment.updatedAt) - new Date(a.apartment.updatedAt);
                });
                break;
            case 1:
                sortedApartments.sort((a, b) => {
                    return a.apartment.price - b.apartment.price;
                });
                break;
            case 2:
                sortedApartments.sort((a, b) => {
                    return b.apartment.price - a.apartment.price;
                });
                break;
            default:
                break;
        }
        dispatchApartmentsData(sortApartmentsAction(sortedApartments));
    }, [sortingQuery, apartmentsState.apartments.length]);

    return (
        <div className="sorting-container">
            <label>מיין לפי</label>
            <div className="select-and-input-container">
                <div
                    className="sorting-query-input"
                    onClick={(e) => { e.stopPropagation(); setIsSortingDropdownOpen(!isSortingDropdownOpen); }}
                >
                        <ExpandArrow isExpanded={isSortingDropdownOpen} />
                        {sortingQuery}
                </div>
                
                { isSortingDropdownOpen &&
                    <SortDropdownSelect
                        sortingQueryOptions={sortingQueryOptions}
                        setSortingQuery={setSortingQuery}
                        sortingQuery={sortingQuery}
                    />
                }
            </div>
        </div>
    );
}

export default SortApartments;