const createError = require('http-errors');

describe('get', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('when the authenticated user request other user data', () => {
    it('throws an user not found error', async () => {
      // eslint-disable-next-line global-require
      const { get } = require('./users');

      const req = {
        authenticatedUser: {
          id: 1,
        },
        params: {
          id: '2',
        },
      };
      const res = {
        send: jest.fn(),
      };
      const next = jest.fn();
      await get(req, res, next);

      const error = createError(404, 'User not found');
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('when the email is not registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve(null),
      }));
    });

    it('throws an user not found error', async () => {
      // eslint-disable-next-line global-require
      const { get } = require('./users');

      const req = {
        authenticatedUser: {
          id: 1,
        },
        params: {
          id: '1',
        },
      };
      const res = {
        send: jest.fn(),
      };
      const next = jest.fn();
      await get(req, res, next);

      const error = createError(404, 'User not found');
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('when the email is registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve({
          dataValues: {
            id: 1,
            email: 'example@gmail.com',
            password: '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW',
            updatedAt: '2022-07-01T18:14:39.478Z',
            createdAt: '2022-07-01T18:14:39.478Z',
          },
        }),
      }));
    });

    it('sends user data without the password', async () => {
      // eslint-disable-next-line global-require
      const { get } = require('./users');

      const req = {
        authenticatedUser: {
          id: 1,
        },
        params: {
          id: '1',
        },
      };
      const res = {
        send: jest.fn(),
      };
      const next = jest.fn();
      await get(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({
        id: 1,
        email: 'example@gmail.com',
        updatedAt: '2022-07-01T18:14:39.478Z',
        createdAt: '2022-07-01T18:14:39.478Z',
      });
    });
  });
});

describe('post', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('when the email is already registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve({
          dataValues: {
            id: 1,
            email: 'example@gmail.com',
            password: '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW',
            updatedAt: '2022-07-01T18:14:39.478Z',
            createdAt: '2022-07-01T18:14:39.478Z',
          },
        }),
      }));
    });

    it('throws an email taken error', async () => {
      // eslint-disable-next-line global-require
      const { post } = require('./users');

      const req = {
        body: {
          email: 'example@gmail.com',
          password: '123456',
        },
      };
      const res = {
        send: jest.fn(),
      };
      const next = jest.fn();
      await post(req, res, next);

      const error = createError(409, 'Email is already taken');
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('when the email is not registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve(null),
        create: () => Promise.resolve({
          dataValues: {
            id: 1,
            email: 'example@gmail.com',
            password: '$2a$10$9yKg5QUNRuDUK9WOqapoBuW8zanVZFHouV5nT2UiYvRUabRfiiTEy',
            updatedAt: '2022-07-01T18:14:39.478Z',
            createdAt: '2022-07-01T18:14:39.478Z',
          },
        }),
      }));
    });

    it('sends the user data without the password field', async () => {
      // eslint-disable-next-line global-require
      const { post } = require('./users');

      const req = {
        body: {
          email: 'example@gmail.com',
          password: '123456',
        },
      };
      const res = {
        send: jest.fn(),
      };
      const next = jest.fn();
      await post(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({
        id: 1,
        email: 'example@gmail.com',
        updatedAt: '2022-07-01T18:14:39.478Z',
        createdAt: '2022-07-01T18:14:39.478Z',
      });
    });
  });
});
