import React from 'react';
import '@testing-library/jest-dom'

import { render, screen, } from '@testing-library/react';
import events from "@testing-library/user-event";
import { Form } from '../../src/client/components/Form';
import { CheckoutFormData } from '../../src/common/types';


it(
  'Форма должна корректно валидировать данные и отправлять корректные данные' +
  ' // ' + 
  'The form must validate the data correctly and send the correct data',
  async () => {
    let result: CheckoutFormData | undefined;
    const submit = (data: CheckoutFormData) => {
      result = data;
    }

    render(<Form onSubmit={submit}/>)
    
    const sumbmitButton = screen.getByTestId('submit');

    const nameInput = screen.getByLabelText('Name');
    const phoneInput = screen.getByLabelText('Phone');
    const addressInput = screen.getByLabelText('Address');

    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).not.toHaveClass('is-invalid');
    expect(addressInput).not.toHaveClass('is-invalid');

    await events.click(sumbmitButton);

    expect(nameInput).toHaveClass('is-invalid');
    expect(phoneInput).toHaveClass('is-invalid');
    expect(addressInput).toHaveClass('is-invalid');
    expect(result).toStrictEqual(undefined);

    const name = 'Бунго Бэггинс';
    await events.type(nameInput, name);
    await events.click(sumbmitButton);

    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).toHaveClass('is-invalid');
    expect(addressInput).toHaveClass('is-invalid');
    expect(result).toStrictEqual(undefined);

    await events.type(phoneInput, '12345678901');
    await events.click(sumbmitButton);

    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).toHaveClass('is-invalid');
    expect(addressInput).toHaveClass('is-invalid');
    expect(result).toStrictEqual(undefined);

    await events.type(phoneInput, 'dsfsdfs8sd');
    await events.click(sumbmitButton);

    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).toHaveClass('is-invalid');
    expect(addressInput).toHaveClass('is-invalid');
    expect(result).toStrictEqual(undefined);

    await events.clear(phoneInput);
    const phone = '9999999999';
    await events.type(phoneInput, phone);
    await events.click(sumbmitButton);

    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).not.toHaveClass('is-invalid');
    expect(addressInput).toHaveClass('is-invalid');
    expect(result).toStrictEqual(undefined);

    const address = 'Шир, Хобитон, Бэгшот Роу, Бэг Энд';
    await events.type(addressInput, address);
    await events.click(sumbmitButton);
    expect(nameInput).not.toHaveClass('is-invalid');
    expect(phoneInput).not.toHaveClass('is-invalid');
    expect(addressInput).not.toHaveClass('is-invalid');
    expect(result).toStrictEqual({
      address,
      name,
      phone,
    });
  }
);