type Coordinates = {
    lat: number;
    lng: number;
};

type Address = {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
};

type Company = {
    name: string;
    department: string;
    title: string;
    address: Address;
};

type Bank = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
};

type Crypto = {
    coin: string;
    wallet: string;
    network: string;
};

type hair = {
    coin: string;
    wallet: string;
    network: string;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
};

export type UsersList = User[];
