const createError = require('http-errors');
const handleError = require('./handle-error');

describe('handleError', () => {
  describe('when the error comes with the HTTP status', () => {
    it('sets the response HTTP appropriately', () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const error = createError(400, 'Custom error');
      handleError(error, null, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('when the error comes missing the HTTP status', () => {
    it('sets the default HTTP code, 500', () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const error = new Error('Custom error');
      handleError(error, null, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  it('sends the error as JSON', () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const error = new Error('Custom error');
    handleError(error, null, res);
    expect(res.json).toHaveBeenCalledWith({ error });
  });
});
