/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import { mount } from 'enzyme';
import * as HIG from 'hig.web';
import React from 'react';

import TextFieldAdapter from './TextFieldAdapter';

describe('<TextFieldAdapter>', () => {
  function createHigTextField(defaults = {}) {
    const higContainer = document.createElement('div');

    const higTextField = new HIG.TextField({ ...defaults });

    higTextField.mount(higContainer);

    return { higTextField, higContainer };
  }

  function createOrionTextField(props) {
    return <TextFieldAdapter {...props} />;
  }

  it('renders a text field', () => {
    const defaults = { name: 'mySpecialField' };

    const { higTextField, higContainer } = createHigTextField(defaults);
    const container = document.createElement('div');
    const wrapper = mount(createOrionTextField(defaults), {
      attachTo: container
    });

    expect(container.firstElementChild.outerHTML).toMatchSnapshot();

    expect(container.firstElementChild.outerHTML).toEqual(
      higContainer.firstElementChild.outerHTML
    );
  });

  it('renders a text field with initial props', () => {
    const defaults = {
      icon: 'assets',
      instructions: "Don't just do something, sit there.",
      label: 'Name of your first pet',
      name: 'mySpecialField',
      placeholder: 'Was it Fluffy?',
      value: 'Rex'
    };

    const { higTextField, higContainer } = createHigTextField(defaults);
    const container = document.createElement('div');
    const wrapper = mount(createOrionTextField(defaults), {
      attachTo: container
    });

    expect(container.firstElementChild.outerHTML).toMatchSnapshot();

    expect(container.firstElementChild.outerHTML).toEqual(
      higContainer.firstElementChild.outerHTML
    );
  });

  it('renders a text field with udpated props', () => {
    const defaults = {
      name: 'mySpecialField'
    };

    const { higTextField, higContainer } = createHigTextField(defaults);
    const orionContainer = document.createElement('div');
    const wrapper = mount(createOrionTextField(defaults), {
      attachTo: orionContainer
    });

    const nextProps = {
      icon: 'assets',
      instructions: "Don't just do something, sit there.",
      label: 'Name of your first pet',
      placeholder: 'Was it Fluffy?',
      required: 'You really must fill this in.',
      value: 'Rex'
    };

    higTextField.setIcon(nextProps.icon);
    higTextField.setInstructions(nextProps.instructions);
    higTextField.setLabel(nextProps.label);
    higTextField.setPlaceholder(nextProps.placeholder);
    higTextField.required(nextProps.required);
    higTextField.setValue(nextProps.value);
    wrapper.setProps(nextProps);

    expect(orionContainer.firstElementChild.outerHTML).toMatchSnapshot();

    expect(orionContainer.firstElementChild.outerHTML).toEqual(
      higContainer.firstElementChild.outerHTML
    );
  });

  it('sets event listeners', () => {
    const defaults = {
      onClick: jest.fn(),
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onInput: jest.fn()
    };

    const nextProps = {
      onClick: jest.fn(),
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onInput: jest.fn()
    };

    const container = document.createElement('div');
    const wrapper = mount(createOrionTextField(defaults), {
      attachTo: container
    });
    const instance = wrapper.instance().instance;

    expect(defaults.onClick).toEqual(instance.events['onClick']);
    expect(defaults.onBlur).toEqual(instance.events['onBlur']);
    expect(defaults.onFocus).toEqual(instance.events['onFocus']);
    expect(defaults.onInput).toEqual(instance.events['onInput']);

    wrapper.setProps(nextProps);

    expect(nextProps.onClick).toEqual(instance.events['onClick']);
    expect(nextProps.onBlur).toEqual(instance.events['onBlur']);
    expect(nextProps.onFocus).toEqual(instance.events['onFocus']);
    expect(nextProps.onInput).toEqual(instance.events['onInput']);
  });
});
