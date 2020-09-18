import factory from 'factory-girl';
import faker from 'faker';

factory.define(
  'Product',
  {},
  {
    id: faker.random.number,
    title: faker.name.title,
    image: faker.image.imageUrl,
    amount: () => faker.random.number({ min: 2, max: 5 }),
    price: () => faker.random.number(100),
  },
);

export default factory;
