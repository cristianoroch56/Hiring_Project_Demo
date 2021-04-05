import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    buttons: {
        border: '1px solid #cccccc',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        padding: '5px 8px',
        color: '#000000',
        '&:disabled': {
            color: 'rgba(16, 16, 16, 0.3)'
        }
    }
}))

const Pagination = ({ gotoPage, previousPage, nextPage, canPreviousPage, canNextPage, pageCount, pageIndex, pageOptions, pageSize }) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="flex-end">
            <div style={{
                marginTop: 15
            }}>
                <button className={classes.buttons} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button className={classes.buttons} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button className={classes.buttons} onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button className={classes.buttons} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Aller à la page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Montrer {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </Grid>
    )
}

export default Pagination;