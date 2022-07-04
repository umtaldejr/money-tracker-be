const jwt = require('jsonwebtoken');
const {
  signToken,
  verifyToken,
} = require('./token');

describe('signToken', () => {
  it('calls jsonwebtoken method with the correct parameters', () => {
    const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY1NjI3ODk5Nn0.1LMOuVg92UcPt13GaI45GE453C4ltNBF40jSquxU9IY';
    const spy = jest.spyOn(jwt, 'sign').mockImplementation(() => tokenMock);

    const payload = { id: 1, email: 'example@gmail.com' };
    const token = signToken(payload);

    expect(spy).toHaveBeenCalledWith(payload, process.env.JWT_SECRET);
    expect(token).toBe(tokenMock);
  });
});

describe('verifyToken', () => {
  it('calls jsonwebtoken method with the correct parameters', () => {
    const payloadMock = {
      id: 1,
      email: 'example@gmail.com',
      iat: 1656278996,
    };
    const spy = jest.spyOn(jwt, 'verify').mockImplementation(() => payloadMock);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY1NjI3ODk5Nn0.1LMOuVg92UcPt13GaI45GE453C4ltNBF40jSquxU9IY';
    const payload = verifyToken(token);

    expect(spy).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(payload).toEqual(payloadMock);
  });
});
