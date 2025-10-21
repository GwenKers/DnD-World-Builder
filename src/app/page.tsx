"use client";

import { useState, FormEvent } from "react";
import { useWorldStore } from "@/lib/store";
import { WorldCard } from "@/components/WorldCard";

export default function HomePage() {
  const worlds     = useWorldStore((s) => s.worlds);
  const addWorld   = useWorldStore((s) => s.addWorld);
  const removeWorld= useWorldStore((s) => s.removeWorld);

  const [name, setName] = useState("");
  const [pitch, setPitch] = useState("");
  const [tags, setTags] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    addWorld({ name: name.trim(), pitch: pitch.trim() || undefined, tags: parsedTags });
    setName("");
    setPitch("");
    setTags("");
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">D&D World Builder</h1>
        <p className="text-sm text-gray-600">
          Worlds → Regions → Locations → NPCs → Encounters
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        {/* Create World */}
        <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border p-4">
          <h2 className="text-xl font-semibold">Create World</h2>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Name</span>
            <input
              className="rounded-lg border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Virdant Expanse"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">One-line pitch</span>
            <input
              className="rounded-lg border px-3 py-2"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="What makes this world sing?"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Tags (comma-separated)</span>
            <input
              className="rounded-lg border px-3 py-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="desert, high-magic, commerce"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
          >
            Add World
          </button>
        </form>

        {/* World list */}
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">Your Worlds</h2>
          {worlds.length === 0 ? (
            <p className="text-gray-600 text-sm">No worlds yet—make one!</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {worlds.map((w) => (
                <WorldCard key={w.id} world={w} onDelete={removeWorld} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
