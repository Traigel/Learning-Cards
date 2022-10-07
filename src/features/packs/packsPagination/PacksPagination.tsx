import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {setPacksTC} from "../packs-reducer";

type PacksPaginationPropsType = {
    callBackPage: (valuePage: number) => void
    callBackPageCount: (valuePageCount: number) => void
}

export const PacksPagination = ({
                                    callBackPage,
                                    callBackPageCount
                                }: PacksPaginationPropsType) => {

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

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
            count={cardPacksTotalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
