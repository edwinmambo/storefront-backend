import supertest from 'supertest';
import app from '../..';
import { Product, User } from '../../types/index.type';
import getUserToken from '../utils/user.test.util';

const request = supertest(app);
const api = '/api/products';
let token: string;

describe('Product Controller', () => {
  beforeAll(() => {
    const testUser: User = {
      username: 'testUser',
      password_digest: 'testPassword',
    };
    token = getUserToken(testUser);
  });

  it('should return a new product after it is created', () => {
    const product: Product = {
      name: 'Book',
      price: 20,
    };
    request
      .post(api)
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
  });

  it('should return a list of products', () => {
    request.get(api).expect(200).expect({});
  });

  it('should return a product given an id', () => {
    request.get(`${api}/1`).expect('Content-Type', /json/).expect(200).expect({
      id: 1,
      name: 'Book',
      price: 20,
      category: 'general',
    });
  });

  it('should update a product given its id', () => {
    const product: Product = {
      name: 'Book',
      price: 20,
      category: 'books',
    };
    request
      .patch(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        name: 'Book',
        price: 25,
        category: 'books',
      });
  });

  it('should delete a product given its id', () => {
    request
      .delete(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(() => {
        request.get(api).expect({});
      });
  });
});
