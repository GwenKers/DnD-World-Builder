import type { World } from "@/lib/types";

export function WorldCard({
  world,
  onDelete,
}: {
  world: World;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{world.name}</h3>
        {onDelete && (
          <button
            onClick={() => onDelete(world.id)}
            className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:opacity-90"
          >
            Delete
          </button>
        )}
      </div>
      {world.pitch && (
        <p className="mt-1 text-sm text-gray-600">{world.pitch}</p>
      )}
      {world.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {world.tags.map((t) => (
            <span key={t} className="text-xs rounded-full border px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-gray-400">
        Created {new Date(world.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
