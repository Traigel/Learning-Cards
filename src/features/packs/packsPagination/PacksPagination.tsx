import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {setPacksTC} from "../packs-reducer";

export const PacksPagination = () =>  {

    const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
    const page = useAppSelector((state) => state.packs.page)
    const pageCount = useAppSelector((state) => state.packs.pageCount)

    const dispatch = useAppDispatch()

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setPacksTC(newPage + 1, pageCount))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPacksTC(page, +event.target.value))
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
