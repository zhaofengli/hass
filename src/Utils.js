// The utils you got for me! Excited!


export default class Utils {
  // Simple and naive shuffle that's deterministic...
  // because our decisions are important, too!
  static shuffle(arr, key='naive') {
    const result = [];
    const remaining = arr.slice(0);

    while (remaining.length) {
      for (const chr of key) {
        const index = chr.charCodeAt(0) % remaining.length;
        result.push(remaining[index]);
        remaining.splice(index, 1);

        if (!remaining.length) break;
      }
    }

    return result;
  }
}
