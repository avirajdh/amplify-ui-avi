import { get, includes } from 'lodash';

import { I18n } from 'aws-amplify';
import { FederatedIdentityProviders } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { FederatedSignInButton } from './FederatedSignInButtons';

export const FederatedSignIn = (): JSX.Element => {
  const [{ context }] = useAuthenticator();
  const loginMechanisms = get(context, 'config.login_mechanisms');

  const amplifyNamespace = 'Authenticator.FederatedSignIn';
  const {
    components: { Divider, Flex },
  } = useAmplify(amplifyNamespace);

  const facebookButton = includes(loginMechanisms, 'facebook') ? (
    <FederatedSignInButton
      icon="facebook"
      text={I18n.get('Sign In with Facebook')}
      provider={FederatedIdentityProviders.Facebook}
    />
  ) : null;
  const googleButton = includes(loginMechanisms, 'google') ? (
    <FederatedSignInButton
      icon="google"
      text={I18n.get('Sign In with Google')}
      provider={FederatedIdentityProviders.Google}
    />
  ) : null;
  const amazonButton = includes(loginMechanisms, 'amazon') ? (
    <FederatedSignInButton
      icon="amazon"
      text={I18n.get('Sign In with Amazon')}
      provider={FederatedIdentityProviders.Amazon}
    />
  ) : null;

  const shouldShowFederatedSignIn =
    facebookButton || googleButton || amazonButton;

  const component = shouldShowFederatedSignIn ? (
    <Flex direction="column" className="federated-sign-in-container">
      <Divider size="small" />

      {googleButton}
      {facebookButton}
      {amazonButton}
    </Flex>
  ) : null;

  return component;
};
