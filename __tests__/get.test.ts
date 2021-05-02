import kookie from '../utils/kookie';

const cookieData = {
  rawCookies: 'deviceId=73943; theme=light; cartCount=1; next-i18next=en',
  multiple: { theme: 'light' },
  parsedCookies: {
    cartCount: '1',
    deviceId: '73943',
    'next-i18next': 'en',
    theme: 'light',
  },
};

test('Check Get cookies on CSR', () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: cookieData.rawCookies,
  });

  expect(kookie.get('theme')).toBe('light');
  expect(kookie.get('undefinedCookie')).not.toBeDefined();
  expect(kookie.getMultiple(['theme'])).toStrictEqual(cookieData.multiple);
  expect(kookie.getAll()).toEqual(cookieData.parsedCookies);
});

test('Check Get cookies on SSR', () => {
  const req = { headers: { cookie: cookieData.rawCookies } };

  expect(kookie.get('theme', req)).toBe('light');
  expect(kookie.get('undefinedCookie', req)).not.toBeDefined();
  expect(kookie.getMultiple(['theme'], req)).toStrictEqual(cookieData.multiple);
  expect(kookie.getAll(req)).toEqual(cookieData.parsedCookies);
});
