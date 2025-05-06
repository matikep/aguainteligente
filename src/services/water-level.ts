/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents water level information.
 */
export interface WaterLevel {
  /**
   * The water level in meters.
   */
  waterLevelMeters: number;
}

/**
 * Asynchronously retrieves water level information for a given location.
 *
 * @param location The location for which to retrieve water level data.
 * @returns A promise that resolves to a WaterLevel object containing water level in meters.
 */
export async function getWaterLevel(location: Location): Promise<WaterLevel> {
  // TODO: Implement this by calling an API.

  return {
    waterLevelMeters: 2.5,
  };
}
