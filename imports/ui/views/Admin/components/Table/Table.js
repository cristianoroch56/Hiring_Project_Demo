import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'

import { Checkbox, TableHead, TableBody, TableOptions, DefaultColumnFilter, Pagination, SubRowAsync } from './components'
import columnsJSON from './columns'

import { useTable, useSortBy, useFilters, useGlobalFilter, useRowSelect, usePagination, useExpanded } from 'react-table'

import { makeStyles, Paper, TableContainer } from '@material-ui/core'

import { useQuery } from 'react-apollo'
import gql from "graphql-tag";
import { useSelector } from 'react-redux'

const query = gql`
    query Messages {
        messages {
            _id
            firstName
            lastName
            email
            phone
            city
            province
            postalCode
            country
            comment1
            comment2
        }
    }
`;

function Table({ renderRowSubComponent, filterOpen, getTableProps, headerGroups, prepareRow, page, state, visibleColumns, preGlobalFilteredRows, setGlobalFilter, }) {
    return (
        <MaUTable
            size='medium'
            aria-label="enhanced table"
            {...getTableProps()}
        >
            <TableHead
                headerGroups={headerGroups}
                visibleColumns={visibleColumns}
                preGlobalFilteredRows={preGlobalFilteredRows}
                state={state}
                setGlobalFilter={setGlobalFilter}
                filterOpen={filterOpen}
            />

            <TableBody
                renderRowSubComponent={renderRowSubComponent}
                page={page}
                prepareRow={prepareRow}
                visibleColumns={visibleColumns}
            />
        </MaUTable>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    padding: {
        padding: theme.spacing(1),
    },
}));

function CustomTable({ }) {
    const { loading, data, refetch } = useQuery(query)

    const MessageState = useSelector(({ Message }) => Message);

    useEffect(() => {
        refetch()
    }, [MessageState.deleted])

    const columns = React.useMemo(
        () => columnsJSON,
        []
    )

    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilterOpen = () => {
        setFilterOpen(!filterOpen);
    }

    const classes = useStyles()





    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state,

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data: loading ? [] : data.messages,
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const renderRowSubComponent = React.useCallback(
        ({ row, rowProps, visibleColumns }) => (
            <SubRowAsync
                row={row}
                rowProps={rowProps}
                visibleColumns={visibleColumns}
            />
        ),
        []
    );



    if (loading) return null

    return (
        <div>
            <CssBaseline />
            <TableOptions refetch={refetch} toggleFilterOpen={toggleFilterOpen} selectedRowIds={selectedRowIds} selectedFlatRows={selectedFlatRows} />
            <Paper className={classes.root}>
                <TableContainer>
                    <Table
                        renderRowSubComponent={renderRowSubComponent}
                        filterOpen={filterOpen}
                        getTableProps={getTableProps}
                        headerGroups={headerGroups}
                        prepareRow={prepareRow}
                        page={page}
                        state={state}
                        visibleColumns={visibleColumns}
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        setGlobalFilter={setGlobalFilter}
                    />
                </TableContainer>
            </Paper>
            <Pagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                pageSize={pageSize}
            />
        </div>
    )
}

export default CustomTable