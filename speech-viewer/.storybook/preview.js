import React from 'react';
import { addDecorator } from '@storybook/react';
import { StylesProvider } from '@material-ui/core/styles'

addDecorator(storyFn => <StylesProvider injectFirst>{storyFn()}</StylesProvider>);
