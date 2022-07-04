const createError = require('http-errors');

describe('post', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('when the email is not registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve(null),
      }));
    });

    it('throws an invalid credentials error', async () => {
      // eslint-disable-next-line global-require
      const { post } = require('./auth');

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

      const error = createError(404, 'Invalid credentials');
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('when the email is registered', () => {
    beforeEach(() => {
      jest.mock('../services/users', () => ({
        findByEmail: () => Promise.resolve({
          id: 1,
          email: 'example@gmail.com',
          password: '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW',
          updatedAt: '2022-07-01T18:14:39.478Z',
          createdAt: '2022-07-01T18:14:39.478Z',
        }),
      }));
    });

    describe('but the password does not match', () => {
      it('throws an invalid credentials error', async () => {
        // eslint-disable-next-line global-require
        const { post } = require('./auth');

        const req = {
          body: {
            email: 'example@gmail.com',
            password: '12345',
          },
        };
        const res = {
          send: jest.fn(),
        };
        const next = jest.fn();
        await post(req, res, next);

        const error = createError(404, 'Invalid credentials');
        expect(next).toHaveBeenCalledWith(error);
        expect(res.send).not.toHaveBeenCalled();
      });
    });

    describe('and the password matches', () => {
      it('signs a token and sends it as the response', async () => {
        // eslint-disable-next-line global-require
        const { post } = require('./auth');

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
        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
