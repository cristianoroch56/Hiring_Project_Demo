import { Mongo } from "meteor/mongo";

const Messages = new Mongo.Collection("messages");

Messages.remove({});

// console.log(Messages.find().fetch())

export default Messages;