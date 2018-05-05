import status from './status';
import member from './member';
import conversation from './conversation';
import transaction from './transaction';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  transaction,
  conversation,
};
