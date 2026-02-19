export function fuse(
  semantic: { id: string; score: number }[],
  keyword: { id: string; score: number }[]
) {
    const SEM_WEIGHT = 2.0;
    const KEY_WEIGHT = 1.0;
    const K = 5;

  const map = new Map<string, number>();

  semantic.forEach((r, i) => {
    map.set(r.id, (map.get(r.id) || 0) + SEM_WEIGHT * 1 / (K + i));
  });

  keyword.forEach((r, i) => {
    map.set(r.id, (map.get(r.id) || 0) + KEY_WEIGHT * 1 / (K + i));
  });

  console.log("hybrid:");
  console.log(semantic)
  console.log(keyword)

  console.log("map:", map);

  return Array.from(map.entries())
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}