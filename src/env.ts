import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    FLAGS_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  shared: {},
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
