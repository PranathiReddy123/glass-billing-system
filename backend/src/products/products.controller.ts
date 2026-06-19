import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  create(
    @Body() body: {
      name: string;
      category: string;
      stock: number;
      rate: number;
      unit: string;
    },
  ) {
    return this.productsService.create(body);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Put(':id')
update(
  @Param('id') id: string,
  @Body() body: {
    name: string;
    category: string;
    stock: number;
    rate: number;
    unit: string;
  },
) {
  return this.productsService.update(
    Number(id),
    body,
  );
}

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.productsService.remove(
      Number(id),
    );
  }
}