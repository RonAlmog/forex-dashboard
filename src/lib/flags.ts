import { flag } from "flags/next";

export const btFlag = flag<boolean>({
  key: "btFlag",
  defaultValue: true,
  origin: "URL",
  identify() {
    return { user: { id: "test" } };
  },
  description: "change button visibility",
  decide({ entities }) {
    return entities.user.id === "test";
  },
});
