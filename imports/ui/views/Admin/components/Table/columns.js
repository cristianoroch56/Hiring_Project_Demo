import React from 'react';

export default [
    {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
            <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
            </span>
        ),
        SubCell: () => null
    },
    {
        "Header": "Prénom",
        "filter": "text",
        "accessor": (d) => d.firstName,
        SubCell: (cellProps) => {
            console.log(cellProps)
            if (!cellProps.row.original.comment2) {
                return <i>No comment</i>
            }
            return (
                <>{cellProps.row.original.comment2}</>
            )
        }
    },
    {
        "Header": "Nom",
        "filter": "text",
        "accessor": (d) => d.lastName,
    },
    {
        "Header": "Courriel",
        "filter": "text",
        "accessor": (d) => d.email,
    },
    {
        "Header": "Téléphone",
        "accessor": (d) => d.phone,
    },
    {
        "Header": "Ville",
        "filter": "text",
        "accessor": (d) => d.city,
    },
    {
        "Header": "Province",
        "filter": "text",
        "accessor": (d) => d.province,
    },
    {
        "Header": "Code Postal",
        "accessor": (d) => d.postalCode,
    },
    {
        "Header": "Pays",
        "filter": "text",
        "accessor": (d) => d.country,
    }
]