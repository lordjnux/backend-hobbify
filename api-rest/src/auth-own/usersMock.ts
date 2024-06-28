export class UserMockEntity {
  idUser: string;
  username: string;
  picture: string;
  email: string;
  password: string;
}
export const usersMock: UserMockEntity[] = [
  {
    idUser: 'f2ba4c5f-3f71-4752-addf-ea15c9bae372',
    username: 'jeroham.sanchez',
    picture: 'https://avatars.githubusercontent.com/u/5168648?v=4',
    email: 'jeroham.sanchez@gmail.com',
    password: '123456',
  },
  {
    idUser: 'f2ba4c5f-3f71-4752-addf-ea15c9bae373',
    username: 'Robert Fischer',
    picture: 'https://avatars.githubusercontent.com/u/5168648?v=4',
    email: 'robert.fischer@mailFake.com',
    password: '123456',
  },
  {
    idUser: 'f2ba4c5f-3f71-4752-addf-ea15c9bae374',
    username: 'Anatoli Karpov',
    picture: 'https://avatars.githubusercontent.com/u/5168648?v=4',
    email: 'anatoli.karpov@mailFake.com',
    password: '123456',
  },
];
