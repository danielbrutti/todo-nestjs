import { ApiProperty } from '@nestjs/swagger';
import { PaginateQuery } from 'nestjs-paginate';

/**
 * This class is used to define a Type of the PaginateQuery interface.
 * With this, is possible to apply `@ApiBody({type: PaginateQueryDTO})` decorator for OpenApi.
 */
export class PaginateQueryDTO implements PaginateQuery {
    @ApiProperty({ description: 'Page number to load' })
    page?: number;

    @ApiProperty({ description: 'Limit items to load' })
    limit?: number;

    @ApiProperty({ description: 'Sort by typles' })
    sortBy?: [string, string][];

    @ApiProperty({ description: 'Search by fields' })
    searchBy?: string[];

    @ApiProperty({ description: 'Search by value' })
    search?: string;

    @ApiProperty({ description: 'Filter conditions' })
    filter?: {
        [column: string]: string | string[];
    };

    @ApiProperty({ description: 'Path' })
    path: string;
};