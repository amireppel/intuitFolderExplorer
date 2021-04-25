import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import data from './data'
const onClick = jest.fn()

test('Check ifcreated properly ', () => {
  render(<App  data={data}/>);
  const titleElement= screen.getByText(/Folders Explorer/i);
  expect(titleElement).toBeInTheDocument();
  
})

test('find content', () => {
  render(<App  data={data} />);
  const linkElement = screen.getByText(/urn/i);
  expect(linkElement).toBeInTheDocument();
});
test('change folder', () => {
  render(<App  data={data} />);
  const topFolder = screen.getByText(/urn/i);
  fireEvent.click(topFolder);
  const linkElement = screen.getByText(/intuit/i);
  expect(linkElement).toBeInTheDocument();
});