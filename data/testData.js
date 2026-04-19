import { faker } from '@faker-js/faker';

export const NewUser1 = {
    FirstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    Email: faker.internet.email(),
    Password: faker.internet.password(),
    City: faker.location.city(),
    Country: 'Ukraine',
    Phone: '+380967852558',
    Street: faker.location.streetAddress(),
    Zip: '12345'
}

export const cardData = {
    CardNumber: faker.finance.creditCardNumber('################'),
    CardDate: faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
    CardCvv: faker.string.numeric(3)
}

export const apiDataPost = {
            title: 'aboba',
            body: 'test body',
            userId: 1
}

export const apiDataPatch = {
            title: 'hello aqa'
}