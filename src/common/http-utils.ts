export const START_FLAG = 'data: ';

export const DONE_FLAG = '[DONE]';

export function parseChunkBuffer(callback: (jsonStr: string) => void, config = { START_FLAG, DONE_FLAG }) {
  let buffer = '';

  const { START_FLAG, DONE_FLAG } = config;

  return function handler(respChunk: Buffer | string) {
    const dataJsonStr = (buffer + respChunk.toString()).split(START_FLAG).filter((str) => str !== '' && str !== '\n');

    // console.info('skr: dataJsonStr', dataJsonStr);

    buffer = dataJsonStr[dataJsonStr.length - 1] || '';

    dataJsonStr.slice(0, -1).forEach((jsonStr) => {
      // console.info('skr: dataJsonStr', jsonStr);

      callback(jsonStr);
    });

    if (buffer.includes(DONE_FLAG)) {
      callback(DONE_FLAG);

      return true;
    }
  };
}

export function readChunks<R>(reader: ReadableStreamDefaultReader<R>) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();

      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}
