import { TypeAccountAvailable, StatusAccountAvailable } from "../enums/accounts.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    email: string;
    @ApiProperty({
        type: String,
        required: true,
        enum: TypeAccountAvailable
    })
    accountType: TypeAccountAvailable;
    @ApiProperty({
        type: String,
        required: true,
        enum: StatusAccountAvailable
    })
    status: StatusAccountAvailable;

    static describe(instance): Array<string> {
        return Object.getOwnPropertyNames(instance);
    }
}