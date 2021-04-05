import React, { useRef } from 'react'
import { Grid } from '@material-ui/core'
import FilterList from '@material-ui/icons/FilterList'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import CloudUpload from '@material-ui/icons/CloudUpload'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { compose } from 'recompose'
import { MessageDeleted } from '../../../../../../actions';

const deleteMessage = gql`
  mutation deleteMessage($ids: [ID!]) {
    deleteMessage (ids: $ids) {
        _id
    }
  }
`;

const createMessages = gql`
  mutation createMessages($messages: [MessageInput]) {
    createMessages (messages: $messages) {
      _id
    }
  }
`;

function TableOptions({ refetch, toggleFilterOpen, selectedFlatRows, deleteMessage, createMessages }) {
    const dispatch = useDispatch();

    const fileInputRef = useRef();

    const handleDelete = async () => {
        const ids = selectedFlatRows.map(e => e.original._id).filter(e => e);
        await deleteMessage({
            variables: {
                ids: ids
            }
        });

        dispatch(MessageDeleted())
    }

    const openFileDialog = (event) => {
        if (event.target === fileInputRef?.current) return
        fileInputRef?.current?.click();
    }

    const handleUpload = (file) => {
        if (!file) return;
        Papa.parse(file, {
            complete: async function (result) {
                const { data } = result;
                let failures = 0;
                const neat = data.map(message => {
                    if (!(message && message.constructor === Object)) {
                        failures++
                        return null;
                    }

                    const {
                        firstName,
                        lastName,
                        email,
                        phone,
                        city,
                        province,
                        postalCode,
                        country,
                        comment1,
                        comment2,
                    } = message;

                    if (!firstName || !lastName || !email || !phone || !city || !province || !postalCode || !country) {
                        failures++
                        return null;
                    }

                    if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone))) {
                        failures++
                        return null;
                    }

                    if (!(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(email))) {
                        failures++
                        return null;
                    }

                    return message;
                }).filter(e => e);
                if (failures > 0) alert(`${failures} rows failed for validation`);
                if (neat.length > 0) {
                    await createMessages({
                        variables: {
                            messages: neat
                        }
                    });
                    refetch()
                }
                // console.log(neat)
            },
            header: true
        });
    }

    const handleDrop = (e) => {
        let dt = e.dataTransfer
        let files = dt.files
        handleUpload(files[0])
    }

    return (
        <Grid container direction="row" style={{ marginBottom: 15 }} justify="flex-end">
            {
                selectedFlatRows.length > 0
                    ?
                    <Grid
                        item
                        style={{
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            padding: '5px 8px',
                            borderRadius: 4,
                            cursor: 'pointer',
                            marginRight: 10
                        }}
                        onClick={handleDelete}
                    >
                        <DeleteOutline />
                    </Grid>
                    :
                    null
            }
            <Grid
                item
                style={{
                    border: '1px solid #cccccc',
                    backgroundColor: '#ffffff',
                    padding: '5px 8px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    marginRight: 10
                }}
                onClick={openFileDialog}
                // onDrop={handleDrop}
            >
                <input
                    type="file"
                    onChange={e => handleUpload(e.target.files[0])}
                    ref={fileInputRef}
                    accept=".csv"
                />
                <CloudUpload />
            </Grid>
            <Grid
                item
                style={{
                    border: '1px solid #cccccc',
                    backgroundColor: '#ffffff',
                    padding: '5px 8px',
                    borderRadius: 4,
                    cursor: 'pointer'
                }}
                onClick={toggleFilterOpen}
            >
                <FilterList />
            </Grid>
        </Grid>
    )
}

export default compose(
    graphql(deleteMessage, { name: 'deleteMessage' }),
    graphql(createMessages, { name: 'createMessages' }),
)(TableOptions);

// export default graphql(deleteMessage, {
//     name: 'deleteMessage'
// })(TableOptions)