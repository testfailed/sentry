import {useEffect} from 'react';
import {browserHistory} from 'react-router';

import {DEFAULT_APP_ROUTE} from 'app/constants';
import ConfigStore from 'app/stores/configStore';
import {useLegacyStore} from 'app/stores/useLegacyStore';
import replaceRouterParams from 'app/utils/replaceRouterParams';

/**
 * This view is used when a user lands on the route `/` which historically
 * is a server-rendered route which redirects the user to their last selected organization
 *
 * However, this does not work when in the experimental SPA mode (e.g. developing against a remote API,
 * or a deploy preview), so we must replicate the functionality and redirect
 * the user to the proper organization.
 *
 * TODO: There might be an edge case where user does not have `lastOrganization` set,
 * in which case we should load their list of organizations and make a decision
 */
function AppRoot() {
  const config = useLegacyStore(ConfigStore);

  useEffect(() => {
    if (!config.lastOrganization) {
      return;
    }

    const orgSlug = config.lastOrganization;
    const url = replaceRouterParams(DEFAULT_APP_ROUTE, {orgSlug});

    browserHistory.replace(url);
  }, [config]);

  return null;
}

export default AppRoot;
