import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { fakerEN_US as faker } from '@faker-js/faker';
import { hash } from 'node:crypto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SeedService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  async seedDatabase() {
    for (let i = 0; i < 100; i++) {
      let streetAddress = faker.location.streetAddress();
      let city = faker.location.city();
      let branchName = `${city} - ${faker.location.direction()}`;
      let telephoneNumber = faker.phone.number({ style: 'national' });

      await this.prisma.bankLocation.create({
        data: {
          branchName,
          address: streetAddress,
          telephoneNumber,
          city,
        },
      });
    }

    await this.prisma.user.create({
      data: {
        username: 'admin',
        role: 'admin',
        password: this.auth.generateHashForPassword('password123'),
        balance: 59,
      },
    });

    for (let i = 0; i < 445; i++) {
      let username = faker.internet.username({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      }) + faker.company.catchPhraseDescriptor()
      let password = faker.internet.password();
      let balance = faker.number.int({ min: 50, max: 5000 });

      await this.prisma.user.create({
        data: {
          username: username,
          password: this.auth.generateHashForPassword(password),
          balance: balance
        },
      });
    }

    await this.prisma.article.create({
      data: {
        title: "Shutdown of banks for Labor Day",
        content: "<b>Hello customers!</b> Our banks will be closed for Labor Day Weekend. Thank you!"
      }
    })
  }
}
