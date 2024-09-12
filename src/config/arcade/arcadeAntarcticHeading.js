/* eslint-disable no-var */
// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (PI / 180);
}

// Function to convert radians to degrees
function toDegrees(radians) {
  return radians * (180 / PI);
}

// Function to convert latitude and longitude to EPSG: 3031 (Polar Stereographic) coordinates
// this was added because the map viewer wasn't allowing me to access the geometry of the feature.
// This may be a bug, but for now I have manually projected the geometry to EPSG: 3031 using
// the field attributes https://epsg.io/3031
function latLonToEPSG3031(lat, lon) {
  // varants for EPSG: 3031
  var a = 6378137; // WGS 84 semi-major axis in meters
  var f = 1 / 298.257223563; // Flattening
  var e = Sqrt(2 * f - f * f); // Eccentricity
  var lat_true_scale = -71; // Latitude of true scale in degrees
  var lon0 = 0; // Central meridian in degrees

  // Convert input latitude and longitude to radians
  var phi = toRadians(lat);
  var lambda = toRadians(lon);
  var phi_c = toRadians(lat_true_scale);
  var lambda_0 = toRadians(lon0);

  // Calculate t and t_c
  var t = Tan(PI / 4 + phi / 2) * Pow((1 - e * Sin(phi)) / (1 + e * Sin(phi)), e / 2);
  var t_c = Tan(PI / 4 + phi_c / 2) * Pow((1 - e * Sin(phi_c)) / (1 + e * Sin(phi_c)), e / 2);

  // Calculate rho
  var rho = (2 * a * t) / t_c;

  // Calculate X and Y coordinates
  var X = rho * Sin(lambda - lambda_0);
  var Y = -rho * Cos(lambda - lambda_0);

  return [X, Y];
}

// Function to calculate the cartesian bearing between two points.
function calculateBearing(x1, y1, x2, y2) {
  // Calculate the difference in coordinates
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;

  // Calculate the bearing using Atan2 function, which returns the angle in radians
  var radians = Atan2(deltaX, deltaY);

  // Convert radians to degrees
  var degrees = toDegrees(radians);

  // Normalize the angle to be within 0 to 360 degrees
  return (degrees + 360) % 360;
}

var projectedPos = latLonToEPSG3031($feature.lat_dd, $feature.lon_dd);
var bearingFromPole = calculateBearing(projectedPos[0], projectedPos[1], -90, 0);
var heading = $feature.heading_d;

// add a rotation to bring the symbol to be north facing initially
var rotationToBringSymbolToNorth = 0;

// Adjust the heading by the bearing from the pole
var symbolRotation = (heading - bearingFromPole + 360 + rotationToBringSymbolToNorth) % 360;

return symbolRotation;
