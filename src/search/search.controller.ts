import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get("locations")
  @Render("searchLocations.hbs")
  async searchLocationsPage(@Query("city") city: string) {
    return {
      cityName: city,
      results: await this.searchService.searchForLocations(city)
    }
  }
}
