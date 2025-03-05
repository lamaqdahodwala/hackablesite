import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async searchForLocations(city: string) {
    let query = ""

    if (city !== "" && city) {

      query = `select "city", "address", "telephoneNumber" from "BankLocation" where "city" ilike '${city}%' order by "city" limit 10;`;

      let subqueries = query.split(";")
      let results: any[] = []

      for (let i of subqueries) {
        let subqueryReturn: any[] = await this.prisma.$queryRawUnsafe(i + ";")
        results = [...results, ...subqueryReturn]
      }


      return results
    } else {
      query = `select * from "BankLocation" order by "city" limit 10;`
    }

    let results = await this.prisma.$queryRawUnsafe(query);
    return results;
  }
}
