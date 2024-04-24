export function Methods() {
  const getTimeAndDateFromEpoch = async (epoch: number) => {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const getNumberFromStringWithNDecimals = async (stringNumber: string, numberOfDecimals: number) => {
    return parseFloat(stringNumber.slice(0, -numberOfDecimals) + "." + stringNumber.slice(-numberOfDecimals));
  };
  return {
    getTimeAndDateFromEpoch,
    getNumberFromStringWithNDecimals
  };
}
