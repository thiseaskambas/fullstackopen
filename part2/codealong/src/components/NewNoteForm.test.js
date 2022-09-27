import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewNoteForm from './NewNoteForm';
import userEvent from '@testing-library/user-event';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const saveNote = jest.fn();
  const user = userEvent.setup();

  render(<NewNoteForm saveNote={saveNote} />);

  const input = screen.getByRole('textbox');
  const sendButton = screen.getByText('save');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(saveNote.mock.calls).toHaveLength(1);
  expect(saveNote.mock.calls[0][0].content).toBe('testing a form...');
});
