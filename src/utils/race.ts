import { Dispatch } from '@reduxjs/toolkit';
import { RefObject } from 'react';
import { addFinisher } from '../store/winnerSlice';
import saveWinner from '../api/saveWinner';
import { RaceStatus } from '../types/raceTypes';

export const resetCarPosition = (carElement: HTMLElement): void => {
  carElement.style.transition = 'none';
  carElement.style.transform = 'translateX(0) translateY(-50%)';
};

export const animateCarMovement = (
  carElement: HTMLElement,
  race: RaceStatus,
  carId: string,
  onStop: (id: number) => void,
  dispatch: Dispatch,
  winnerSavedRef: RefObject<boolean>,
): void => {
  const track = carElement.parentElement;
  if (!track) return;

  const trackWidth = track.offsetWidth;
  const carWidth = carElement.offsetWidth;
  const maxDistance = trackWidth - carWidth;
  const moveDistance = Math.min(race.distance, maxDistance);
  const time = race.velocity > 0 ? moveDistance / race.velocity : 0;

  carElement.style.transition = `transform ${time}s linear`;
  carElement.getBoundingClientRect();
  carElement.style.transform = `translateX(${moveDistance}px) translateY(-50%)`;

  const handleTransitionEnd = (): void => {
    const id = parseInt(carId, 10);
    const formattedTime = Number(time.toFixed(2));
    onStop(id);
    dispatch(addFinisher({ id, time: formattedTime }));

    if (!winnerSavedRef.current) {
      saveWinner(id, formattedTime);
      winnerSavedRef.current = true;
    }
  };

  carElement.addEventListener('transitionend', handleTransitionEnd, { once: true });
};

export const handleRaceStatusChange = (
  carElement: HTMLElement,
  race: RaceStatus,
  carId: string,
  onStop: (id: number) => void,
  dispatch: Dispatch,
  winnerSavedRef: RefObject<boolean>,
): void => {
  switch (race.status) {
    case 'started':
    case 'driving':
      animateCarMovement(carElement, race, carId, onStop, dispatch, winnerSavedRef);
      break;
    case 'stopped':
      resetCarPosition(carElement);
      break;
    case 'broken':
      carElement.style.transition = 'none';
      break;
    default:
      break;
  }
};

export const checkForRaceStart = (
  races: Record<string, RaceStatus>,
  previousRacesRef: RefObject<Record<string, RaceStatus>>,
  winnerSavedRef: RefObject<boolean>,
): void => {
  const previousRaces = previousRacesRef.current;
  const raceKeys = Object.keys(races);

  const raceJustStarted = raceKeys.some((key, index) => {
    const currentRace = races[key];
    const previousRace = previousRaces[raceKeys[index]];
    return currentRace.status === 'started' && previousRace?.status !== 'started';
  });

  if (raceJustStarted) {
    winnerSavedRef.current = false;
  }
};

export const processRaceUpdates = (
  races: Record<string, RaceStatus>,
  previousRaces: Record<string, RaceStatus>,
  onStop: (id: number) => void,
  dispatch: Dispatch,
  winnerSavedRef: RefObject<boolean>,
): void => {
  Object.entries(races).forEach(([carId, race]) => {
    const carElement = document.getElementById(`car-${carId}`);
    if (!carElement) return;

    const previousRace = previousRaces[carId];
    const statusChanged = !previousRace || previousRace.status !== race.status;

    if (statusChanged) {
      handleRaceStatusChange(carElement, race, carId, onStop, dispatch, winnerSavedRef);
    }
  });
};
