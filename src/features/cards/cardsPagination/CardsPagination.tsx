import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import {useAppSelector} from "../../../common/hooks/hooks";

type PacksPaginationPropsType = {
    callBackPage: (valuePage: number) => void
    callBackPageCount: (valuePageCount: number) => void
}

export const CardsPagination = ({
                                    callBackPage,
                                    callBackPageCount
                                }: PacksPaginationPropsType) => {

    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        callBackPage(newPage + 1)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        callBackPageCount(+event.target.value)
    };

    return (
        <TablePagination
            component="div"
            count={cardsTotalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
