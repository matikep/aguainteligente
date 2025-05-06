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
 * Represents soil moisture information.
 */
export interface SoilMoisture {
  /**
   * The soil moisture in percentage.
   */
  soilMoisturePercentage: number;
}

/**
 * Asynchronously retrieves soil moisture information for a given location.
 *
 * @param location The location for which to retrieve soil moisture data.
 * @returns A promise that resolves to a SoilMoisture object containing soil moisture percentage.
 */
export async function getSoilMoisture(location: Location): Promise<SoilMoisture> {
  // TODO: Implement this by calling an API.

  return {
    soilMoisturePercentage: 60,
  };
}
