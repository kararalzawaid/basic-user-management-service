const filterUsers = users => {
  const email = [];
  const fullName = [];

  users.forEach(user => {
    email.push(user.email);

    if (user.fullName && !fullName.includes(user.fullName)) {
      fullName.push(user.fullName);
    }
  });

  return [{ email }, { fullName }];
};

export default {
  filterUsers
};
