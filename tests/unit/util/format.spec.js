import faker from 'faker';

import { formatPrice } from '~/util/format';

describe('Format', () => {
  it('should be able to format a price', () => {
    const price = faker.finance.amount();
    const formated = formatPrice(price);

    expect(formated).toBe(`R$\xa0${price}`);
  });
});
