const serialize = user => (
  {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
  }
);

const serializeAll = users => users.map(user => serialize(user));

export default {
  serialize,
  serializeAll
};
