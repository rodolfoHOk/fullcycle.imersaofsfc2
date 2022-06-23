import { Button, Grid, MenuItem, Select, styled } from '@mui/material';
import { Loader } from 'google-maps';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentPosition } from '../utils/geoLocation';
import { makeCarIcon, makeMarkerIcon, Map } from '../utils/map';
import { Route } from '../utils/models';
import { sample, shuffle } from 'lodash';
import { RouteExistsError } from '../errors/route-exists.error';
import { useSnackbar } from 'notistack';
import { Navbar } from './Navbar';
import { Socket, connect } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL as string;

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const googleMapsLoader = new Loader(GOOGLE_MAPS_API_KEY);

const colors = [
  '#b71c1c',
  '#4a148c',
  '#2e7d32',
  '#e65100',
  '#2962ff',
  '#c2185b',
  '#FFCD00',
  '#3e2723',
  '#03a9f4',
  '#827717',
];

const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  margin: '16px',
}));

const MapContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
}));

export function Mapping() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeIdSelected, setRouteIdSelected] = useState<string>('');

  const mapRef = useRef<Map>();
  const socketIORef = useRef<Socket>();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socketIORef.current = connect(API_URL);
    socketIORef.current.on('connect', () => console.log('websocket connected'));
    socketIORef.current.on(
      'new-position',
      (data: {
        routeId: string;
        position: [number, number];
        finished: boolean;
      }) => {
        console.log(data);
        mapRef.current?.moveCurrentMarker(data.routeId, {
          lat: data.position[0],
          lng: data.position[1],
        });
      }
    );
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((data) => data.json())
      .then((jsonData) => setRoutes(jsonData));
  }, []);

  useEffect(() => {
    (async () => {
      const [, position] = await Promise.all([
        googleMapsLoader.load(),
        getCurrentPosition({ enableHighAccuracy: true }),
      ]);
      const divMap = document.getElementById('map') as HTMLElement;
      mapRef.current = new Map(divMap, {
        zoom: 15,
        center: position,
      });
    })();
  }, []);

  const startRoute = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const route = routes.find((route) => routeIdSelected === route._id);
      const color = sample(shuffle(colors)) as string;

      try {
        mapRef.current?.addRoute(routeIdSelected, {
          currentMarkerOptions: {
            position: {
              lat: route!.startPosition.lat,
              lng: route!.startPosition.long,
            },
            icon: makeCarIcon(color),
          },
          endMarkerOptions: {
            position: {
              lat: route!.endPosition.lat,
              lng: route!.endPosition.long,
            },
            icon: makeMarkerIcon(color),
          },
        });

        socketIORef.current?.emit('new-direction', {
          routeId: routeIdSelected,
        });
      } catch (err) {
        if (err instanceof RouteExistsError) {
          enqueueSnackbar(`${route?.title} já adicionado, espere finalizar`, {
            variant: 'error',
          });
        } else {
          throw err;
        }
      }
    },
    [routeIdSelected, routes, enqueueSnackbar]
  );

  return (
    <Grid container style={{ width: '100%', height: '100%' }}>
      <Grid item xs={12} sm={3}>
        <Navbar />
        <Form onSubmit={startRoute}>
          <Select
            fullWidth
            value={routeIdSelected}
            displayEmpty
            onChange={(event) => setRouteIdSelected(event.target.value)}
          >
            <MenuItem value={''}>
              <em>Selecione uma rota</em>
            </MenuItem>

            {routes.map((route, key) => (
              <MenuItem key={key} value={route._id}>
                {route.title}
              </MenuItem>
            ))}
          </Select>

          <Button type="submit" color="primary" variant="contained" fullWidth>
            Iniciar rota
          </Button>
        </Form>
      </Grid>

      <Grid item xs={12} sm={9}>
        <MapContainer id="map" style={{ width: '100%', height: '100%' }} />
      </Grid>
    </Grid>
  );
}
