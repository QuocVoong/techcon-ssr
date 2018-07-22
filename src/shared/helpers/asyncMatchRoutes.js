import { matchRoutes } from 'react-router-config';
import {find} from "lodash";

function getComponents(match) {
  return match.map(v => v.route.component).reduce(async (result, component) => {
    if (component.preload) {
      const res = await component.preload();
      const ret = [...(await result), component, ...[].concat(res)];
      return ret;
    }
    return [...(await result), component];
  }, []);
}

function getParams(match) {
  return match.reduce((result, component) => {
    if (component.match && component.match.params) {
      return { ...result, ...component.match.params };
    }
    return result;
  }, {});
}

const asyncMatchRoutes = async (routes, pathname) => {
  const match = matchRoutes(routes, pathname);
  const params = getParams(match);
  const components = await getComponents(match);
  const component = find(components, (component) => component.default).default;
  return { components, match, params, component };
};

export default asyncMatchRoutes;
