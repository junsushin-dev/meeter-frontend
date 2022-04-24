export const splitAraryChunks = <T>(array: T[], chunkSize: number) => {
  let sliceStartIndex = 0;
  const chunks = [];
  while (sliceStartIndex < array.length) {
    const nextChunk = array.slice(sliceStartIndex, sliceStartIndex + chunkSize);
    chunks.push(nextChunk);
    sliceStartIndex += chunkSize;
  }
  return chunks;
};
