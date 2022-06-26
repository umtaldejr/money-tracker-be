const createError = require('http-errors');
const authenticate = require('./authenticate');

describe('authenticate', () => {
  describe('when the request has no authorization header', () => {
    it('throws an unauthenticated user error', () => {
      const req = {
        headers: {},
      };
      const nextMock = jest.fn();
      const error = createError(400, 'Unauthenticated user');
      authenticate(req, null, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('when the request has an invalid authorization header', () => {
    it('throws an invalid token error', () => {
      const req = {
        headers: {
          authorization: 'A.B.C',
        },
      };
      const nextMock = jest.fn();
      const error = createError(401, 'Invalid JWT token');
      authenticate(req, null, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('when the request has an valid authorization header', () => {
    it('does not throw error', () => {
      const req = {
        headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmdWxhbm9AZ21haWwuY29tIiwiaWF0IjoxNjU1OTM3NjQ1fQ.5oDKZ6PY2j8PdxZSNvstwaLDr4QDTREB3fajakOTbQM',
        },
      };
      const nextMock = jest.fn();
      authenticate(req, null, nextMock);
      expect(nextMock).toHaveBeenCalledWith();
    });

    it('stores the authenticated user data on the request object', () => {
      const req = {
        headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmdWxhbm9AZ21haWwuY29tIiwiaWF0IjoxNjU1OTM3NjQ1fQ.5oDKZ6PY2j8PdxZSNvstwaLDr4QDTREB3fajakOTbQM',
        },
      };
      const nextMock = jest.fn();
      authenticate(req, null, nextMock);
      expect(req.authenticatedUser.id).toBe(1);
      expect(req.authenticatedUser.email).toBe('fulano@gmail.com');
    });
  });
});
