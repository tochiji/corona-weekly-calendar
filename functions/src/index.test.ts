import { fetchCoronaJson } from './index';

test('指定のkeyが存在しているか？', async () => {
  const data = await fetchCoronaJson();
  // expect(data[0]['No']).not.toBeUndefined();
  expect(data[0]['全国地方公共団体コード']).not.toBeUndefined();
  expect(data[0]['都道府県名']).not.toBeUndefined();
  expect(data[0]['市区町村名']).not.toBeUndefined();
  expect(data[0]['公表_年月日']).not.toBeUndefined();
  expect(data[0]['発症_年月日']).not.toBeUndefined();
  expect(data[0]['確定_年月日']).not.toBeUndefined();
  expect(data[0]['患者_居住地']).not.toBeUndefined();
  expect(data[0]['患者_年代']).not.toBeUndefined();
  expect(data[0]['患者_性別']).not.toBeUndefined();
  expect(data[0]['患者_職業']).not.toBeUndefined();
  expect(data[0]['患者_状態']).not.toBeUndefined();
  expect(data[0]['患者_症状']).not.toBeUndefined();
  expect(data[0]['患者_渡航歴の有無フラグ']).not.toBeUndefined();
  expect(data[0]['備考']).not.toBeUndefined();
  expect(data[0]['退院済フラグ']).not.toBeUndefined();
});
