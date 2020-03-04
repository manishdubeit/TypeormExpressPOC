export function paginate(
    data: any,
    totalItems: number,
    pageUrl: string,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let checkCurrentPage = currentPage;
    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    }
    else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    let nextPage = checkCurrentPage + 1;
    let prevPage = checkCurrentPage - 1 < 0 ? null : checkCurrentPage - 1;
    let firstPageURL = pageUrl + (startPage - 1);
    let lastPageURL = pageUrl + (endPage - 1);
    let nextPageURL = pageUrl + nextPage;
    let prevPageURL = pageUrl + prevPage;
    if (checkCurrentPage == 0 || prevPage > pages.length) {
        prevPage = null;
        prevPageURL = null;
    }
    if (checkCurrentPage >= endPage || nextPage >= pages.length) {
        nextPage = null;
        nextPageURL = null;
    }

    // return object with all pager properties required by the view
    return {
        data: data,
        totalItems: totalItems,
        currentPage: checkCurrentPage,
        firstPageURL: firstPageURL,
        lastPageURL: lastPageURL,
        prevPage: prevPage,
        prevPageURL: prevPageURL,
        nextPage: nextPage,
        nextPageURL: nextPageURL,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}