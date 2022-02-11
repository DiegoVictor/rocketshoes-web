import factory from 'factory-girl';
import faker from 'faker';

factory.define(
  'Product',
  {},
  {
    id: faker.datatype.number,
    title: faker.name.title,
    image: faker.image.imageUrl,
    amount: () => faker.datatype.number({ min: 2, max: 5 }),
    price: () => faker.datatype.number(100),
  },
);

export default factory;
