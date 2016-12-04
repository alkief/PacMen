import uuid from 'node-uuid';
import Debug from 'debug';

const roomStore = [];
const maxParticipants = 5;

function getUnfilledRoom() {
  const room = roomStore.find(room => {
    return room.clients.length < maxParticipants;
  });
  if (room) return room;
  return new Room();
}

export class Room {
  constructor() {
    this.id = uuid.v4();
    this.clients = [];
    this.debug = Debug(`app:room:${this.id}`);
    roomStore.push(this);
  }

  addClient(client) {
    client.room = this;
    this.clients.push(client);
  }

  removeClient (client) {
    this.clients = this.clients.filter((c) => c.id !== client.id);
  }

  broadcast(data) {
    this.clients.forEach(client => client.send(data));
  }
}

export default {
  all: roomStore,
  getUnfilledRoom
};
