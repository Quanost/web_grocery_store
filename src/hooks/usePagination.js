import React, { useMemo } from 'react'
import { generateRange } from '../ultils/helper'

export const usePagination = (totalPagination, currentPage, siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const totalNumbers = siblingCount * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPagination > totalBlocks) {
            const startPage = Math.max(2, currentPage - siblingCount);
            const endPage = Math.min(totalPagination - 1, currentPage + siblingCount);

            let pages = generateRange(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPagination - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = generateRange(startPage - spillOffset, startPage - 1);
                    pages = [1, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = generateRange(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, totalPagination];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [1, ...pages, totalPagination];
                    break;
                }
            }

            return pages;
        }

        return generateRange(1, totalPagination);
    }, [totalPagination, currentPage, siblingCount]);

    return paginationArray;
}

;