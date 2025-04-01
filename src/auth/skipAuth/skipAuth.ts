import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY as string;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);