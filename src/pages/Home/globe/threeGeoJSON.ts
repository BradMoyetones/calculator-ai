/* eslint-disable prefer-const */
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import type * as GeoJSON from "geojson";

/* Draw GeoJSON

Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
and draws the geoJSON geometries.

*/

interface DrawThreeGeoParams {
    json: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.GeometryCollection;
    radius: number;
    materialOptions?: THREE.PointsMaterialParameters | THREE.LineBasicMaterialParameters;
}

type Coord = [number, number]; // [lon, lat]

export function drawThreeGeo({ json, radius, materialOptions = {} }: DrawThreeGeoParams): THREE.Object3D {
  const container = new THREE.Object3D();
  container.userData.update = (t: number) => {
    for (const child of container.children) {
      child.userData.update?.(t);
    }
  };

  container.rotation.x = -Math.PI * 0.5; // corregir orientación

  const x_values: number[] = [];
  const y_values: number[] = [];
  const z_values: number[] = [];
  const json_geom = createGeometryArray(json);

  let coordinate_array: Coord[] = [];

  for (const geom of json_geom) {
    switch (geom.type) {
      case "Point":
        convertToSphereCoords(geom.coordinates as Coord, radius);
        drawParticle(x_values[0], y_values[0], z_values[0], materialOptions);
        break;

      case "MultiPoint":
        for (const point of geom.coordinates as Coord[]) {
          convertToSphereCoords(point, radius);
          drawParticle(x_values[0], y_values[0], z_values[0], materialOptions);
        }
        break;

      case "LineString":
        coordinate_array = createCoordinateArray(geom.coordinates as Coord[]);
        for (const coord of coordinate_array) convertToSphereCoords(coord, radius);
        drawLine(x_values, y_values, z_values, materialOptions);
        break;

      case "Polygon":
        for (const segment of geom.coordinates as Coord[][]) {
          coordinate_array = createCoordinateArray(segment);
          for (const coord of coordinate_array) convertToSphereCoords(coord, radius);
          drawLine(x_values, y_values, z_values, materialOptions);
        }
        break;

      case "MultiLineString":
        for (const segment of geom.coordinates as Coord[][]) {
          coordinate_array = createCoordinateArray(segment);
          for (const coord of coordinate_array) convertToSphereCoords(coord, radius);
          drawLine(x_values, y_values, z_values, materialOptions);
        }
        break;

      case "MultiPolygon":
        for (const polygon of geom.coordinates as Coord[][][]) {
          for (const segment of polygon) {
            coordinate_array = createCoordinateArray(segment);
            for (const coord of coordinate_array) convertToSphereCoords(coord, radius);
            drawLine(x_values, y_values, z_values, materialOptions);
          }
        }
        break;

      default:
        throw new Error("The geoJSON is not valid.");
    }
  }

  function createGeometryArray(json: any): GeoJSON.Geometry[] {
    if (json.type === "Feature") return [json.geometry];
    if (json.type === "FeatureCollection") return json.features.map((f:any) => f.geometry);
    if (json.type === "GeometryCollection") return json.geometries;
    throw new Error("The geoJSON is not valid.");
  }

  function createCoordinateArray(feature: Coord[]): Coord[] {
    const temp_array: Coord[] = [];
    let interpolation_array: Coord[] = [];

    for (let i = 0; i < feature.length; i++) {
      const point1 = feature[i];
      const point2 = feature[i - 1];

      if (i > 0 && needsInterpolation(point2, point1)) {
        interpolation_array = [point2, point1];
        interpolation_array = interpolatePoints(interpolation_array);
        temp_array.push(...interpolation_array);
      } else {
        temp_array.push(point1);
      }
    }

    return temp_array;
  }

  function needsInterpolation(point2: Coord, point1: Coord): boolean {
    const [lon1, lat1] = point1;
    const [lon2, lat2] = point2;
    return Math.abs(lon1 - lon2) > 5 || Math.abs(lat1 - lat2) > 5;
  }

  function interpolatePoints(interpolation_array: Coord[]): Coord[] {
    let temp_array: Coord[] = [];

    for (let i = 0; i < interpolation_array.length - 1; i++) {
      const p1 = interpolation_array[i];
      const p2 = interpolation_array[i + 1];
      if (needsInterpolation(p2, p1)) {
        temp_array.push(p1, getMidpoint(p1, p2));
      } else {
        temp_array.push(p1);
      }
    }

    temp_array.push(interpolation_array[interpolation_array.length - 1]);

    return temp_array.length > interpolation_array.length
      ? interpolatePoints(temp_array)
      : temp_array;
  }

  function getMidpoint(p1: Coord, p2: Coord): Coord {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  }

  function convertToSphereCoords(coords: Coord, sphere_radius: number) {
    const [lon, lat] = coords;
    x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
    y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
    z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
  }

  function drawParticle(x: number, y: number, z: number, options: THREE.PointsMaterialParameters) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([x, y, z], 3));

    const particleMaterial = new THREE.PointsMaterial(options);
    const particle = new THREE.Points(geo, particleMaterial);
    container.add(particle);

    clearArrays();
  }

  function drawLine(x_vals: number[], y_vals: number[], z_vals: number[], options: THREE.LineBasicMaterialParameters) {
    const lineGeo = new LineGeometry();
    const verts: number[] = [];

    for (let i = 0; i < x_vals.length; i++) {
      verts.push(x_vals[i], y_vals[i], z_vals[i]);
    }

    lineGeo.setPositions(verts);

    const hue = 0.3 + Math.random() * 0.2 - (Math.random() > 0.5 ? 0.3 : 0);
    const color = new THREE.Color().setHSL(hue, 1.0, 0.5);

    const lineMaterial = new LineMaterial({ color, linewidth: 2, fog: true, ...options });

    const line = new Line2(lineGeo, lineMaterial);
    line.computeLineDistances();

    const rate = Math.random() * 0.0002;
    line.userData.update = (t: number) => {
      (lineMaterial as any).dashOffset = t * rate;
    };

    container.add(line);
    clearArrays();
  }

  function clearArrays() {
    x_values.length = 0;
    y_values.length = 0;
    z_values.length = 0;
  }

  return container;
}
