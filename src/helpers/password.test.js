const bcrypt = require('bcryptjs');
const {
  hashPassword,
  comparePasswords,
} = require('./password');

describe('hashPassword', () => {
  it('calls bcrypt methods with the correct parameters', () => {
    const saltMock = '$2a$10$EkC1f9TbL2QvSnuVic0RDu';
    const genSaltSyncSpy = jest.spyOn(bcrypt, 'genSaltSync').mockImplementation(() => saltMock);
    const hashSyncSpy = jest.spyOn(bcrypt, 'hashSync');

    const password = '123456';
    hashPassword(password);

    expect(genSaltSyncSpy).toHaveBeenCalledWith(10);
    expect(hashSyncSpy).toHaveBeenCalledWith(password, saltMock);
  });

  it('returns the password encrypted', () => {
    const hashMock = '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW';
    jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => hashMock);

    const password = '123456';
    const hash = hashPassword(password);

    expect(hash).toBe(hashMock);
  });
});

describe('comparePasswords', () => {
  it('calls bcrypt method with the correct parameters', () => {
    const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync');

    const password = '123456';
    const hash = '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW';

    comparePasswords(password, hash);
    expect(compareSyncSpy).toHaveBeenCalledWith(password, hash);
  });

  describe('when the password an8hd the encrypted password macthes', () => {
    it('returns true', () => {
      const password = '123456';
      const hash = '$2a$10$56.5bIgqqWbpXpzHXvFPW.0xdAVvaNdoSSdn5lNKAmI5HCEUAUqlW';

      expect(comparePasswords(password, hash)).toBe(true);
    });
  });

  describe('when the password and the encrypted password does not macth', () => {
    it('returns false', () => {
      const password = '123456';
      const hash = '$2a$10$9WnE4NfLwbjjwLlC32BJgOZG0VgeAoBNXUahu4HpXzapHcHtrtkDC';

      expect(comparePasswords(password, hash)).toBe(false);
    });
  });
});
