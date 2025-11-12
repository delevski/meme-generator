import { init } from '@instantdb/react';

// Initialize InstantDB with the provided app-id
const APP_ID = '11846490-15a5-46f8-911b-36f8e952a64d';

// Define the schema structure
const schema = {
  users: {
    username: 'string',
    email: 'string',
    createdAt: 'number',
  },
  memes: {
    imageUrl: 'string',
    userId: 'string',
    labels: 'json',
    createdAt: 'number',
    votesCount: 'number',
  },
  votes: {
    memeId: 'string',
    userId: 'string',
    value: 'number', // 1 for upvote, -1 for downvote
    createdAt: 'number',
  },
};

const db = init({ appId: APP_ID });

export default db;

