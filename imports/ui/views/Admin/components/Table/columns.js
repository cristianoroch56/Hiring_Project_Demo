import React from 'react';
import { useDispatch } from 'react-redux';
import { CommentViewed } from '../../../../actions';

export default [
    {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => {
            const dispatch = useDispatch();

            return (
                <span {...row.getToggleRowExpandedProps()} onMouseUp={e => {
                    dispatch(CommentViewed(row.original))
                }}>
                    {row.isExpanded ? '👇' : '👉'}
                </span>
            )
        },
        SubCell: () => null
    },
    {
        "Header": "Prénom",
        "filter": "text",
        "accessor": (d) => d.firstName,
        SubCell: (cellProps) => {
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