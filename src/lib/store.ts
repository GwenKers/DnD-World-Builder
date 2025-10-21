import { create } from "zustand";
import { nanoid } from "nanoid";
import type { World } from "./types";

type State = {
  worlds: World[];
  addWorld: (input: { name: string; pitch?: string; tags?: string[] }) => void;
  removeWorld: (id: string) => void;
};

export const useWorldStore = create<State>((set) => ({
  worlds: [
    {
      id: nanoid(),
      name: "Belledonne",
      pitch: "Shattered alpine kingdoms bound by old pacts.",
      tags: ["low-magic", "alpine"],
      createdAt: new Date().toISOString(),
    },
  ],
  addWorld: ({ name, pitch, tags = [] }) =>
    set((s) => ({
      worlds: [
        {
          id: nanoid(),
          name,
          pitch,
          tags,
          createdAt: new Date().toISOString(),
        },
        ...s.worlds,
      ],
    })),
  removeWorld: (id) =>
    set((s) => ({ worlds: s.worlds.filter((w) => w.id !== id) })),
}));
