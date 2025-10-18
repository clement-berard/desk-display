import { construct } from 'radash';
import { getIconUrlFromState } from '~/services/weather';
import type { WsNodeRedKeys } from '~/stores/wsNodeRedStore';

export function processNodeWsRedMessage(key: keyof WsNodeRedKeys, value: any) {
  if (key === 'main_sensors') {
    const constructedObject: any = construct(value);

    // @ts-expect-error
    constructedObject.weather.stateIconUrl = getIconUrlFromState(constructedObject.weather.state);

    return constructedObject;
  }
  return value;
}
