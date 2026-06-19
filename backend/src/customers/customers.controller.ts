import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  create(
    @Body() body: {
      name: string;
      phone?: string;
      address?: string;
    },
  ) {
    return this.customersService.create(body);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: {
      name: string;
      phone?: string;
      address?: string;
    },
  ) {
    return this.customersService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.customersService.remove(
      Number(id),
    );
  }
}