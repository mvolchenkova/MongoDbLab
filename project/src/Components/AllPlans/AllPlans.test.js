import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AllPlans from './AllPlans'; 
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('AllPlans Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            trainingPlans: {
                plans: [
                    { idTplan: 1, title: 'Plan A', amount: 5, level: 'Beginner' },
                    { idTplan: 2, title: 'Plan B', amount: 10, level: 'Intermediate' },
                ],
                status: 'idle',
            },
        });
    });

    test('renders AllPlans component correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <AllPlans />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('displays loading message when plans are loading', () => {
        store = mockStore({
            trainingPlans: {
                plans: [],
                status: 'loading',
            },
        });

        render(
            <Provider store={store}>
                <AllPlans />
            </Provider>
        );

        expect(screen.getByText(/Loading plans.../i)).toBeInTheDocument();
    });

    test('displays no plans found message', () => {
        store = mockStore({
            trainingPlans: {
                plans: [],
                status: 'idle',
            },
        });

        render(
            <Provider store={store}>
                <AllPlans />
            </Provider>
        );

        expect(screen.getByText(/No plans found/i)).toBeInTheDocument();
    });
});