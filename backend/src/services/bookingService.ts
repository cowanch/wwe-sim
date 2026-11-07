import * as matchService from "./matchService";
import * as ppvService from  "./ppvService";

export async function checkMatches() {
  const scheduledMatches = await matchService.getScheduledMatches();
  if (scheduledMatches.length > 0) {
    return;
  }

  const latestPpvCycles = await ppvService.getLatestCycles();
  if (latestPpvCycles.length === 0) {
    const firstPpvs = await ppvService.getPpvs(["NXT Takeover: Brooklyn", "SummerSlam"]);
    if (firstPpvs.length !== 2) {
      throw new Error("Could not find the first PPVs");
    }

    ppvService.createPpvCycle({
      ppvId: firstPpvs[0].id, // NXT Takeover: Brooklyn
      year: 2016,
    });
    ppvService.createPpvCycle({
      ppvId: firstPpvs[1].id, // Summerslam
      year: 2016,
    });
  }
}
