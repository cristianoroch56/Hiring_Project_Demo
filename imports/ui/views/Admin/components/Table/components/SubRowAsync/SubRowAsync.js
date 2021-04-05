import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

function SubRows({ row, rowProps, visibleColumns, loading }) {
    if (loading) {
        return (
            <TableRow>
                <TableCell />
                <TableCell />
                <TableCell colSpan={visibleColumns.length - 2}>
                    Loading...
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow
            {...rowProps}
        >
            <TableCell />
            <TableCell />
            {
                row.cells.map((cell) => {
                    if (!cell.column.SubCell || cell.column.id === 'expander') return null;
                    return (
                        <TableCell
                            {...cell.getCellProps()}
                            colSpan={visibleColumns.length - 2}
                        >
                            {
                                cell.render('SubCell', {
                                    value: cell.column.accessor && cell.column.accessor(row.original, 0),
                                    row: { ...row, original: row.original }
                                })
                            }
                        </TableCell>
                    );
                }).filter(e => e)
            }
        </TableRow>
    );
}

function SubRowAsync({ row, rowProps, visibleColumns }) {
    const [loading, setLoading] = React.useState(true);

    console.log(row, rowProps)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <SubRows
            row={row}
            rowProps={rowProps}
            visibleColumns={visibleColumns}
            loading={loading}
        />
    );
}

export default SubRowAsync;