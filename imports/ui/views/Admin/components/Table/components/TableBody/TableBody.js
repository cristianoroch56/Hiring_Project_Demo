import React, { useState } from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { ModalWindow } from './components'

function CustomTableBody({ renderRowSubComponent, page, prepareRow, visibleColumns }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const showMessage = (message) => {
        setModalOpen(true);
        setModalMessage(message);
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalMessage("");
    }

    return (
        <TableBody>
            {
                page.map((row, i) => {
                    prepareRow(row)
                    const rowProps = row.getRowProps();
                    return (
                        <React.Fragment key={rowProps.key}>
                            <TableRow {...rowProps}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <TableCell
                                            {...cell.getCellProps()}
                                            onClick={() => {
                                                if (index < 2) return;
                                                showMessage(cell.row.original.comment2)
                                            }}
                                            style={{
                                                cursor: index < 2 ? '' : 'pointer'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                        </React.Fragment>
                    )
                })
            }
            {
                page.length < 1
                    ?
                    <TableRow>
                        <TableCell
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            No records
                        </TableCell>
                    </TableRow>
                    :
                    null
            }
            <ModalWindow
                open={modalOpen}
                message={modalMessage}
                handleClose={closeModal}
            />
        </TableBody>
    )
}

export default CustomTableBody;