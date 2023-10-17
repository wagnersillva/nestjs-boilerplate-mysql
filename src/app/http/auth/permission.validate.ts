import { SetMetadata } from '@nestjs/common';

export const HasPermission = (...permissions: string[]) => SetMetadata('permissions', permissions);
