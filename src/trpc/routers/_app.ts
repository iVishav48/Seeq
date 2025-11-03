import { aiRouter } from '@/features/tools/server/router';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    imageAnalyse : aiRouter
});

export type AppRouter = typeof appRouter;