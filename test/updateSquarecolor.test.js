// updateSquarecolor.test.js
const updateSquarecolor = require('./updateSquarecolor');

describe('updateSquarecolor', () => {
  it('should update square colors correctly', () => {
    // Simula un arreglo de cuadros (sqs) con 64 elementos para la prueba
    const sqs = Array.from({ length: 64 }, (_, i) => ({ style: {} }));

    updateSquarecolor(sqs);

    // Realiza afirmaciones para comprobar si la función funciona como se espera
    for (let n = 0; n < 64; n++) {
      const expectedColor = Math.floor(n / 8) % 2 === 0
        ? n % 2 === 0
          ? '#9ff'
          : '#5fa'
        : n % 2 === 1
          ? '#9ff'
          : '#5fa';

      expect(sqs[n].style.background).toBe(expectedColor);
    }
  });
});
