import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
    templateId: process.env.TEMPLATE_CREATE_ACCOUNT || 'd-adaad303ca794d5882fee59feb0a78ca',
}));
