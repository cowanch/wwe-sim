import { Ppv } from "@prisma/client";
import { firstPpv } from "./events/firstPpv";
import { BookingStrategy } from "./types";

export function getStrategy(ppv: Ppv) {

}

export function getFirstStrategy(): BookingStrategy {
  return firstPpv;
}
