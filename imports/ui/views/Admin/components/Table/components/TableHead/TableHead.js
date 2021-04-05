import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function CustomTableHead({ headerGroups, filterOpen }) {
    return (
        <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} style={{
                            fontWeight: 600
                        }}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                            </span>
                            <div>{filterOpen && column.canFilter && column.filter ? column.render('Filter') : null}</div>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
            {/* <TableRow>
                <TableCell
                    colSpan={visibleColumns.length}
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </TableCell>
            </TableRow> */}
        </TableHead>

    )
}

export default CustomTableHead;