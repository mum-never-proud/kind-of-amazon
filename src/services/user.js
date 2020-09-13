import Backendless from 'backendless';

Backendless.initApp(process.env.BACKENDLESS_APP_ID, process.env.BACKENDLESS_APP_SECRET);

const signUp = (userDetails) => Backendless.UserService.register(userDetails);
const signIn = ({ email, password }) => Backendless.UserService.login(email, password, true);
const searchUserByEmail = (email) => {
  if (!email) {
    return Promise.resolve([]);
  }

  const query = Backendless.DataQueryBuilder.create().setWhereClause(`email = '${email}'`);

  return Backendless.Data.of('Users').find(query);
};
const getCurrentUser = () => Backendless.UserService.getCurrentUser();
const signOut = () => Backendless.UserService.logout();
const saveOrder = (order) => {
  const table = Backendless.Data.of('orders');

  return table.save(order);
};
const getOrders = () => Backendless.Data.of('Orders').find();

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
