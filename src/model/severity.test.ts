import { severity } from './severity';

it('感染者数ごとの深刻度が正しいかを確認', () => {
  // 深刻度は、例えばテーブルのセルの塗りつぶしなどに使用可能。
  // 深刻度が高いものほど、濃い色で塗りつぶすなど。

  expect(severity(10)).toBe(0);
  expect(severity(125)).toBe(1);
  expect(severity(250)).toBe(1);
  expect(severity(333)).toBe(2);
  expect(severity(499)).toBe(2);
  expect(severity(501)).toBe(3);
  expect(severity(701)).toBe(3);
  expect(severity(999)).toBe(3);
  expect(severity(1000)).toBe(4);
  expect(severity(20000)).toBe(4);
});
