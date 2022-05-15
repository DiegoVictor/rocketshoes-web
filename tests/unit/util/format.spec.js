import faker from '@faker-js/faker';

import { formatPrice } from '~/util/format';

describe('Format', () => {
  it('should be able to format a price', () => {
    const price = faker.finance.amount();
    const formated = formatPrice(price);

    const { format } = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    expect(formated).toMatch(format(price));
  });
});
