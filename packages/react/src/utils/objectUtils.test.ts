import { objectValuesEqual } from './objectUtils';

describe('objectUtils', () => {
  describe('objectValuesEqual', () => {
    it('Returns true if objects are equal', () => {
      const object1 = { a: 1, b: 2 };
      const object2 = { a: 1, b: 2 };
      expect(objectValuesEqual(object1, object2)).toBe(true);
    });

    it('Returns false if objects are not equal', () => {
      const object1 = { a: 1, b: 2 };
      const object2 = { a: 1, b: 3 };
      expect(objectValuesEqual(object1, object2)).toBe(false);
      const oneProperty = { a: 1 };
      const twoProperties = { a: 1, b: 2 };
      expect(objectValuesEqual(oneProperty, twoProperties)).toBe(false);
      expect(objectValuesEqual(twoProperties, oneProperty)).toBe(false);
    });

    it('Makes a shallow comparison of the properties when their values are objects', () => {
      const object1 = { a: { b: 2 } };
      const object2 = { a: { b: 2 } };
      expect(objectValuesEqual(object1, object2)).toBe(false); // Expected because object1.a !== object2.a

      const subObject = { b: 2 };
      const object3 = { subObject };
      const object4 = { subObject };
      expect(objectValuesEqual(object3, object4)).toBe(true); // Expected because object3.subObject === object4.subObject
    });
  });
});
