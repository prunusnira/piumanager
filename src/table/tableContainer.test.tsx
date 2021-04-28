import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import TableContainer from './tableContainer';

describe('신규 유저 추가', () => {
    render(<TableContainer lang={'ko'}/>);
    const newUserBtn = screen.getByText('신규 유저');
    fireEvent.click(newUserBtn);
    (document.getElementById('newname') as HTMLInputElement).value = 'testuser';
    const createNew = screen.getByTestId('btnChangeUser');
    fireEvent.click(createNew);
    const playerName = screen.getByTestId('txtPlayerName');

    it('이름 확인', () => {
        expect(playerName).toBe('testuser');
    });
});