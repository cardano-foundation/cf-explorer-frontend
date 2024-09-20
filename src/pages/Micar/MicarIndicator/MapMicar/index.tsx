import mapData from "@highcharts/map-collection/custom/world-highres3.geo.json";
import { Box, BoxProps, Container } from "@mui/material";
import Highcharts, { MapChart } from "highcharts";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import markerClusters from "highcharts/modules/marker-clusters";
import proj4 from "proj4";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

import { FindLocationIcon, ZoomInIcon, ZoomOutIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { useScreen } from "src/commons/hooks/useScreen";

import { IMapCity, IMapCountry } from "./type";
import {
  MapNavigation,
  MapNavigationDivider,
  MapNavigationMinusButton,
  MapNavigationPlusButton,
  MapOption,
  MapOptionButton,
  WorldMapContainer
} from "./styles";
import { data } from "./mockData";
import { topCities } from "./Resource/topCities";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).proj4 = (window as any).proj4 || proj4;

markerClusters(Highcharts);
HighchartsMap(Highcharts);

type HighchartsMapRefObject = HighchartsReactRefObject & { chart: MapChart };

const LEGENDS: [number, string, string][] = [
  [10, "#D6E2FF", "#D6E2FF"],
  [20, "#5C8DFF", "#5C8DFF"],
  [Infinity, "#0033AD", "#0033AD"]
];

export const WorldMap = (props: BoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HighchartsMapRefObject | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const allowRedraw = useRef(false);

  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const { isMobile } = useScreen();
  const theme = useTheme();
  const { countries } = useMemo(() => {
    const countries: IMapCountry[] =
      data
        ?.filter((item) => !!item.noOfSample)
        .map(({ countryCode, country, noOfSample }) => {
          return {
            code: countryCode,
            name: country,
            value: noOfSample
          };
        }) || [];

    const cities: IMapCity[] = [];

    data?.map((country) => {
      const countryCities: IMapCity[] = country.cities
        .map(({ city, lat, long, noOfSample }) => {
          const matchCity = topCities.find((top) => top.country === country.country && top.name === city);
          return {
            name: city,
            lat: Number(matchCity?.lat || lat),
            lon: Number(matchCity?.lon || long),
            country: country.country,
            value: noOfSample
          };
        })
        .filter((item) => !!item.value);
      cities.push(...countryCities);
    }, []);

    return { countries, cities };
  }, [data]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ lat: latitude, lon: longitude });
          const pos = mapRef.current?.chart.fromLatLonToPoint({ lat: latitude, lon: longitude });
          if (!pos) return;
          const zoom = mapRef.current?.chart.mapView?.zoom || 0;
          mapRef.current?.chart.mapZoom(2 ** zoom, pos?.x, pos.y);
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error("Error fetching geolocation", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (data) {
      const fullscreenListener = () => {
        mapRef.current?.chart.mapZoom();
      };
      document.addEventListener("fullscreenchange", fullscreenListener);
      return () => {
        document.removeEventListener("fullscreenchange", fullscreenListener);
      };
    }
  }, [data]);

  useEffect(() => {
    const handleMouseUpOrLeave = () => {
      document.body.style.cursor = "";
    };

    document.addEventListener("mouseup", handleMouseUpOrLeave);
    document.addEventListener("mouseleave", handleMouseUpOrLeave);

    return () => {
      document.removeEventListener("mouseup", handleMouseUpOrLeave);
      document.removeEventListener("mouseleave", handleMouseUpOrLeave);
    };
  }, []);

  const handleZoomIn = () => mapRef.current?.chart.mapZoom(0.5);
  const handleZoomOut = () => mapRef.current?.chart.mapZoom(2);
  const options: Highcharts.Options = useMemo(() => {
    return {
      constructorType: "mapChart",
      chart: {
        backgroundColor: theme.isDark ? "#131316" : "white",
        map: mapData,
        margin: 0,
        events: {
          pan: () => {
            document.body.style.cursor = "move";
          },
          mousedown: () => {
            document.body.style.cursor = "move";
          },
          mouseup: () => {
            document.body.style.cursor = "";
          },
          redraw: () => {
            if (!allowRedraw.current) {
              allowRedraw.current = true;
              return;
            }
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
              if (!mapRef.current?.chart.mapView) return;
              const { mapView, series, plotWidth, plotHeight } = mapRef.current.chart;
              const { zoom } = mapView;
              if (!series[1]) return;

              series[1].data.forEach((item) => {
                const { plotX = 0, plotY = 0 } = item;

                item.setVisible(zoom > 0 && plotX > 0 && plotX <= plotWidth && plotY > 0 && plotY <= plotHeight);
              });
              setTimeout(() => {
                allowRedraw.current = false;
                mapRef.current?.chart.redraw(false);
              }, 450);
            }, 200);
          }
        }
      },
      legend: { enabled: false },
      title: { text: "" },
      responsive: { rules: [{ condition: { maxWidth: 500 } }] },
      mapNavigation: { enabled: true, enableButtons: false },
      credits: { enabled: false },
      colorAxis: {
        dataClasses: LEGENDS.map((item, index) => ({
          from: LEGENDS[index - 1]?.[0],
          to: item[0],
          color: theme.isDark ? item[2] : item[1]
        }))
      },
      tooltip: {
        formatter: function () {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = (this.point as any).clusteredData as { options: IMapCity }[];
          if (data) {
            const cities: { [key: string]: number } = {};
            data.forEach((item) => {
              if (cities[`${item.options.name}`]) cities[`${item.options.name}`] += +(item.options.value || 0);
              else cities[`${item.options.name}`] = item.options.value || 0;
            });
            if (Object.keys(cities).length > 1) return false;
            if (data[0].options.isTop) return `<b>${data[0].options.name}</b>`;
            return `<b>${Object.keys(cities)[0]}<br/>${cities[Object.keys(cities)[0]]} nodes</b>`;
          }
          if ((this.point.options as IMapCity).isTop) return `<b>${this.point.name}</b>`;

          return `<b>${this.point.name}<br/>${this.point.value} nodes</b>`;
        }
      },
      series: [
        {
          type: "map",
          data: countries,
          joinBy: ["iso-a2", "code"],
          animation: true,
          name: "Population density",
          tooltip: {
            headerFormat: "",
            pointFormat: "<b>{point.name}</b><br>Value: {point.value}"
          },
          borderWidth: 0.2,
          borderColor: "#434656",
          states: { hover: { borderWidth: 1 }, inactive: { opacity: 1 } }
        },
        {
          enabled: true,
          type: "mappoint",
          colorKey: "clusterPointsAmount",
          data: topCities,
          color: Highcharts.getOptions().colors?.[1],
          states: { inactive: { opacity: 1 } },
          point: {
            allowOverlap: false,
            animation: { duration: 450 },
            marker: { symbol: "cicle", radius: 18, fillColor: "#F6F9FF" }
          },
          dataLabels: { allowOverlap: true }
        },
        {
          type: "mappoint",
          enableMouseTracking: true,
          colorKey: "clusterPointsAmount",
          name: "Cities",
          color: Highcharts.getOptions().colors?.[1],
          states: { inactive: { opacity: 1 } },
          cluster: {
            enabled: true,
            allowOverlap: true,
            animation: { duration: 450 },
            marker: { symbol: "cicle", radius: 18, fillColor: "#F6F9FF" },
            zones: [
              { from: 1, to: 10, marker: { radius: 11 } },
              { from: 11, to: 20, marker: { radius: 12 } },
              { from: 21, to: 50, marker: { radius: 14 } },
              { from: 51, to: 100, marker: { radius: 16 } },
              { from: 101, to: 200, marker: { radius: 18 } },
              { from: 201, to: Infinity, marker: { radius: 20 } }
            ],
            dataLabels: {
              format: undefined,
              formatter: function () {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = (this.point as any).clusteredData as { options: IMapCity }[];
                if (data) {
                  const cities: { [key: string]: number } = {};
                  data.forEach((item) => {
                    if (cities[`${item.options.name}`]) cities[`${item.options.name}`] += +(item.options.value || 0);
                    else cities[`${item.options.name}`] = item.options.value || 0;
                  });
                  return Object.keys(cities).reduce((sum, key) => sum + cities[key], 0);
                }
                return 1;
              }
            }
          },
          point: {
            enabled: true,
            allowOverlap: true,
            animation: { duration: 450 },
            marker: { symbol: "cicle", radius: 18, fillColor: "#F6F9FF" },
            zones: [
              { from: 1, to: 10, marker: { radius: 11 } },
              { from: 11, to: 20, marker: { radius: 12 } },
              { from: 21, to: 50, marker: { radius: 14 } },
              { from: 51, to: 100, marker: { radius: 16 } },
              { from: 101, to: 200, marker: { radius: 18 } },
              { from: 201, to: Infinity, marker: { radius: 20 } }
            ],
            events: {}
          }
        },
        {
          type: "mappoint",
          name: "User Location",
          color: "#5C8DFF",
          enableMouseTracking: false,
          data: [
            {
              lat: userLocation?.lat,
              lon: userLocation?.lon,
              marker: {
                symbol: "circle"
              }
            }
          ]
        }
      ]
    };
  }, [data, theme.isDark, userLocation]);

  if (isMobile)
    return (
      <Box>
        <WorldMapContainer data-testid="world-map" ref={containerRef} {...props}>
          {!!data && (
            <HighchartsReact ref={mapRef} constructorType="mapChart" highcharts={Highcharts} options={options} />
          )}
        </WorldMapContainer>
        <Box display={"flex"} justifyContent={"center"} marginTop={"10px"} gap={"16px"}>
          <MapNavigation ismobile={isMobile}>
            <MapNavigationMinusButton onClick={handleZoomOut}>
              <CustomIcon height={24} width={24} icon={ZoomOutIcon} fill={theme.palette.secondary.main} />
            </MapNavigationMinusButton>
            <MapNavigationDivider />
            <MapNavigationPlusButton onClick={handleZoomIn}>
              <CustomIcon height={24} width={24} icon={ZoomInIcon} fill={theme.palette.secondary.main} />
            </MapNavigationPlusButton>
          </MapNavigation>
          <MapOption ismobile={isMobile}>
            <MapOptionButton onClick={getUserLocation}>
              <CustomIcon height={24} width={24} icon={FindLocationIcon} fill={theme.palette.secondary.main} />
            </MapOptionButton>
          </MapOption>
        </Box>
      </Box>
    );

  return (
    <Container sx={{ padding: "0px !important" }}>
      <WorldMapContainer data-testid="world-map" ref={containerRef} {...props}>
        {!!data && (
          <HighchartsReact ref={mapRef} constructorType="mapChart" highcharts={Highcharts} options={options} />
        )}
        <MapNavigation>
          <MapNavigationMinusButton onClick={handleZoomOut}>
            <CustomIcon height={24} width={24} icon={ZoomOutIcon} fill={theme.palette.secondary.main} />
          </MapNavigationMinusButton>
          <MapNavigationDivider />
          <MapNavigationPlusButton onClick={handleZoomIn}>
            <CustomIcon height={24} width={24} icon={ZoomInIcon} fill={theme.palette.secondary.main} />
          </MapNavigationPlusButton>
        </MapNavigation>
        <MapOption>
          <MapOptionButton onClick={getUserLocation}>
            <CustomIcon height={24} width={24} icon={FindLocationIcon} fill={theme.palette.secondary.main} />
          </MapOptionButton>
        </MapOption>
      </WorldMapContainer>
    </Container>
  );
};
