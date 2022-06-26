const createError = require('http-errors');
const validateBody = require('./validate-body');

describe('validateBody', () => {
  it('returns a middleware function', () => {
    const schema = {
      validate: jest.fn(),
    };
    const middleware = validateBody(schema);
    expect(typeof middleware).toBe('function');
  });

  describe('when the request body does conforms to the schema', () => {
    it('does not throw an error', () => {
      const schema = {
        validate: jest.fn().mockReturnValue({}),
      };
      const middleware = validateBody(schema);
      const next = jest.fn();
      middleware({}, {}, next);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('when the request body does not conform to the schema', () => {
    it('throws  validation error', () => {
      const schema = {
        validate: jest.fn().mockReturnValue({
          error: {
            details: [{
              message: 'custom error message',
            }],
          },
        }),
      };
      const middleware = validateBody(schema);
      const next = jest.fn();
      const error = createError(400, 'custom error message');
      middleware({}, {}, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
