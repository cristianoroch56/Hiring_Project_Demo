import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema } from 'graphql/utilities';
import schema from '../../../../../api/messages/Message.graphql';

const schemaType = buildASTSchema(schema).getType('Message');

const schemaValidator = model => {
    const details = [];

    if (!model.firstName) {
        details.push({ name: 'firstName', message: 'First Name is required!' });
    }

    if (!model.lastName) {
        details.push({ name: 'lastName', message: 'Last Name is required!' });
    }

    if (!model.email || !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im).test(model.email || "")) {
        details.push({ name: 'email', message: 'Email is required!' });
    }

    if (!model.phone || !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(model.phone || "")) {
        details.push({ name: 'phone', message: 'Phone is required!' });
    }

    if (!model.city) {
        details.push({ name: 'city', message: 'City is required!' });
    }

    if (!model.province) {
        details.push({ name: 'province', message: 'Province is required!' });
    }

    if (!model.postalCode) {
        details.push({ name: 'postalCode', message: 'Postal Code is required!' });
    }

    if (!model.country) {
        details.push({ name: 'country', message: 'Country is required!' });
    }

    return details;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator);