const lowerBoundsPM25 = [0,    12.1, 35.5, 55.5,  150.5, 250.5, 350.5];
const upperBoundsPM25 = [12.0, 35.4, 55.4, 150.4, 250.4, 350.5, 500.4];
const lowerBoundsAQI =  [0,  51,  101, 151, 201, 301, 401];
const upperBoundsAQI =  [50, 100, 150, 200, 300, 400, 500];

function getAqiFromPM25(pm25) {
  if (pm25 < lowerBoundsPM25[0] || pm25 > upperBoundsPM25[upperBoundsPM25.length - 1]) {
    throw new Error(`PM2.5 must be between ${lowerBoundsPM25[0]} and ${upperBoundsPM25[upperBoundsPM25.length - 1]}, but was ${pm25}`);
  }

  let idx = 0;
  while (pm25 > upperBoundsPM25[idx]) {
    idx += 1;
  }

  let slope = (upperBoundsAQI[idx] - lowerBoundsAQI[idx]) / (upperBoundsPM25[idx] - lowerBoundsPM25[idx]);
  let aqi = slope * (pm25 - lowerBoundsPM25[idx]) + lowerBoundsAQI[idx];

  return Math.floor(aqi);
}
