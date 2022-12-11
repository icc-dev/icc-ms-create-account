import { ApiProperty } from '@nestjs/swagger';
import { StatusAccountAvailable, TypeAccountAvailable } from './../enums/accounts.enum';
export class CreatedAccountDto {
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    lastLogin: Date;
    @ApiProperty()
    status: StatusAccountAvailable;
    @ApiProperty()
    accountType: TypeAccountAvailable;
    @ApiProperty()
    restrictedByLevel: Boolean;
    @ApiProperty()
    accountLevel: Number;
    @ApiProperty()
    subscripted: Boolean;
    @ApiProperty()
    email: String;
}