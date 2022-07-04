const { User } = require('../db/models');
const {
  findByEmail,
  create,
} = require('./users');

describe('findByEmail', () => {
  it('calls the Sequelize method with the correct parameters', () => {
    const userMock = {
      id: 1,
      email: 'example@gmail.com',
      password: '$2a$10$O5BFCoq4nAc8tXT7EQEIN.ld5NszhQwlJAPahxHjA5CKdfmbaTH3i',
    };
    const spy = jest.spyOn(User, 'findOne').mockImplementation(() => userMock);

    const email = 'example@gmail.com';
    const user = findByEmail(email);

    expect(spy).toHaveBeenCalledWith({ where: { email } });
    expect(user).toBe(userMock);
  });
});

describe('create', () => {
  it('calls the Sequelize method with the correct parameters', () => {
    const userMock = {
      id: 1,
      email: 'example@gmail.com',
      password: '$2a$10$O5BFCoq4nAc8tXT7EQEIN.ld5NszhQwlJAPahxHjA5CKdfmbaTH3i',
    };
    const spy = jest.spyOn(User, 'create').mockImplementation(() => userMock);

    const userData = {
      email: 'example@gmail.com',
      password: '123456',
    };
    const user = create(userData);

    expect(spy).toHaveBeenCalledWith(userData);
    expect(user).toBe(userMock);
  });
});
