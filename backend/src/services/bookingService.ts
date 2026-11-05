import * as matchService from "./matchService";
import * as ppvService from  "./ppvService";

export async function checkMatches() {
  // fetch matches and check for any uncompleted ones
  // if there are uncompleted matches return
  // if there are no uncompleted matches, find the latest PPV cycle
  // if there are none, create the first Summerslam 2016
  const scheduledMatches = await matchService.getScheduledMatches();
  if (scheduledMatches.length > 0) {
    return;
  }

  const latestPpvCycles = await ppvService.getLatestCycles();
  if (latestPpvCycles.length === 0) {
    // TODO: Create NXT Takeover: Brooklyn 2016 and Summerslam 2016
  }
}
