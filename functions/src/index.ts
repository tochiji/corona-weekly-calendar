import fetch from 'node-fetch';
import { Storage } from '@google-cloud/storage';

const BUCKET_NAME = 'corona-open-data';
const FILE_NAME = 'tokyo-latest';

export const saveCoronaCalendarToGCS = async (
  message: Message,
  context: Context,
  callback: Callback
) => {
  const res = await fetchCoronaJson();
  const storage = new Storage();
  const file = await storage.bucket(BUCKET_NAME).file(FILE_NAME);
  await file.save(JSON.stringify(res), { gzip: true });
  await file.setMetadata({
    contentType: 'application/json',
    cacheControl: 'no-cache, max-age=0',
    contentLanguage: 'ja',
  });
  await file.makePublic();
  callback();
};

export const fetchCoronaJson = async () => {
  const f = await fetch(
    'https://stopcovid19.metro.tokyo.lg.jp/data/130001_tokyo_covid19_patients.csv'
  );
  const res = await f.text();
  const d = res.split('\r\n');
  const coronaJson = csv2json(d);
  return coronaJson;
};

const csv2json = (csvArray: string[]) => {
  const jsonArray = [];
  const columns = csvArray[0].split(',');

  for (let i = 1; i < csvArray.length - 1; i++) {
    const a_line = {} as { [key: string]: string };
    const csvArrayD = csvArray[i].split(',');
    for (let j = 0; j < columns.length; j++) {
      a_line[columns[j]] = csvArrayD[j];
    }
    jsonArray.push(a_line);
  }
  return jsonArray;
};

interface Message {
  data: string;
}

interface Context {
  eventId: string;
  timestamp: string;
  eventType: string;
  resource: unknown;
}

type Callback = () => void;
