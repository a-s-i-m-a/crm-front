import React  from 'react';

interface PaginationProps {
    currentPage: number;
    isNextDisabled: boolean;
    onPrevPage: () => void;
    onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   isNextDisabled,
                                                   onPrevPage,
                                                   onNextPage,
                                               }) => {
    return (
        <div className="pagination">
            <button disabled={currentPage < 2} onClick={onPrevPage}>
                Prev
            </button>
            <button>{currentPage}</button>
            <button disabled={isNextDisabled} onClick={onNextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
