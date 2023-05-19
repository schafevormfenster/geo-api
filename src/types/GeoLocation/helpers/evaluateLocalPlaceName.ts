/**
 * Parse a place name by a community name to generate a short local place name for smarter display.
 * @param placeName
 * @param communityName
 * @returns place name reduced by the community name
 */
export const evaluateLocalPlaceName = (
  placeName: string,
  communityName: string
): string => {
  const nameAsParts: string[] = placeName.split(" ");
  const partsWithoutCommunity: string[] = nameAsParts.filter(
    (item, index) => item !== communityName || index != nameAsParts.length - 1
  );

  const localPlaceName: string = partsWithoutCommunity.join(" ").trim();

  // if localPlaceName is empty, return community name
  if (localPlaceName.length === 0) return communityName;

  return localPlaceName;
};
