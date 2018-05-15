import status from './status';
import member from './member';
import conversation from './conversation';
import transaction from './transaction';
import prediction from './prediction';
import wallet from './wallet';

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
  wallet,
  prediction
};
