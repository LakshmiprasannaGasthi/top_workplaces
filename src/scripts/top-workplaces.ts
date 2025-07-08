
//code
interface Workplace {
  id: string;
  name: string;
}

interface Shift {
  id: string;
  workplaceId: string;
}

// ✅ MOCK DATA (Replace with API if it becomes available again)
const mockWorkplaces: Workplace[] = [
  { id: "w1", name: "Martian Hydro" },
  { id: "w2", name: "Luna Greens" },
  { id: "w3", name: "Red Diamond Mines" },
  { id: "w4", name: "Neptune Farms" }
];

const mockShifts: { id: string; workplaceId: string }[] = [
  { id: "s1", workplaceId: "w1" },
  { id: "s2", workplaceId: "w1" },
  { id: "s3", workplaceId: "w1" },
  { id: "s4", workplaceId: "w2" },
  { id: "s5", workplaceId: "w2" },
  { id: "s6", workplaceId: "w3" },
  { id: "s7", workplaceId: "w1" },
  { id: "s8", workplaceId: "w3" },
  { id: "s9", workplaceId: "w1" },
  { id: "s10", workplaceId: "w1" },
  { id: "s11", workplaceId: "w2" },
  { id: "s12", workplaceId: "w1" },
];

async function fetchWorkplaces(): Promise<Workplace[]> {
  return Promise.resolve(mockWorkplaces);
}

async function fetchShifts(): Promise<Shift[]> {
  return Promise.resolve(mockShifts);
}

async function topWorkplaces() {
  const [workplaces, shifts] = await Promise.all([
    fetchWorkplaces(),
    fetchShifts()
  ]);

  const shiftCount: Record<string, number> = {};

  for (const shift of shifts) {
    shiftCount[shift.workplaceId] = (shiftCount[shift.workplaceId] || 0) + 1;
  }

  const workplaceMap = new Map<string, string>();
  for (const wp of workplaces) {
    workplaceMap.set(wp.id, wp.name);
  }

   const result = Object.entries(shiftCount)
    .map(([id, count]: [string, number]) => ({
      name: workplaceMap.get(id) || "Unknown",
      shifts: count,
    }))
    .sort((a, b) => b.shifts - a.shifts)
    .slice(0, 3);

  console.log(JSON.stringify(result, null, 2));
}

topWorkplaces().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
