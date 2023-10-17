import { SetMetadata } from '@nestjs/common';

export const HasRole = (...roles: string[]) => SetMetadata('roles', roles);
