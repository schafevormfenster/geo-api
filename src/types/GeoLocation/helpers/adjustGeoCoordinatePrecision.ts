import { LocatablePrecision } from "../../Abilities/Locateable";

export const adjustGeoCoordinatePrecision = (
  coordinate: number,
  precision: LocatablePrecision
): number => {
  const factor: number = Math.pow(10, precision);
  return Math.round(coordinate * factor) / factor;
};
