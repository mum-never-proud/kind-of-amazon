import Backendless from 'backendless';

Backendless.initApp(process.env.BACKENDLESS_APP_ID, process.env.BACKENDLESS_APP_SECRET);

const users = Backendless.Data.of('Users');
const table = Backendless.Data.of('orders');

const signUp = (userDetails) => Backendless.UserService.register(userDetails);

const signIn = ({ email, password }) => Backendless.UserService.login(email, password, true);

const searchUserByEmail = (email) => {
  if (!email) {
    return Promise.resolve([]);
  }

  const query = Backendless.DataQueryBuilder.create().setWhereClause(`email = '${email}'`);

  return users.find(query);
};

const getCurrentUser = () => Backendless.UserService.getCurrentUser();

const signOut = () => Backendless.UserService.logout();

const saveOrder = (order, parentObjectId) => new Promise((resolve, reject) => {
  table.save(order)
    .then((res) => {
      // relationship can be created in background
      users.addRelation(parentObjectId, 'orders:Orders:n', [res.objectId]);

      resolve(res);
    })
    .catch((err) => reject(err));
});

const getOrders = (objectId) => {
  const loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create().setRelationName('orders');
  loadRelationsQueryBuilder.setPageSize(100); // load upto 100 orders
  loadRelationsQueryBuilder.setSortBy(['created DESC']);

  return users.loadRelations(objectId, loadRelationsQueryBuilder);
};

export {
  signUp,
  signIn,
  signOut,
  saveOrder,
  getCurrentUser,
  getOrders,
  searchUserByEmail,
};
export default Backendless;
