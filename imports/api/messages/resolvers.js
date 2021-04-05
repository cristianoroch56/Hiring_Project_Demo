import Messages from "./messages";

export default {
    Query: {
        message(obj, { id }) {
            return Messages.findOne(id)
        },
        messages(obj) {
            return Messages.find({}).fetch();
        }
    },

    Mutation: {
        createMessage(obj, { message }) {
            const messageId = Messages.insert(message);
            message = Messages.findOne(messageId);
            return message;
        },
        createMessages(obj, { messages }) {
            const newMessages = [];
            messages.forEach(message => {
                const exists = Messages.findOne({
                    email: message.email
                });
                if (!exists) {
                    const MessageId = Messages.insert(message);
                    newMessages.push(Messages.findOne(MessageId))
                } else {
                    Messages.update({ email: message.email }, { $set: message })
                    newMessages.push(exists)
                }
            })
            return newMessages;
        },
        deleteMessage(obj, { ids }) {
            ids.forEach(id => {
                Messages.remove({ _id: id });
            })
            return []
        },
    }
};