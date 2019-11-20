import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { withNotification, withModal } from '@bucket-of-bolts/ui';
import { useErrorNotification, useDispatchUnload, withClient } from '../../lib';

import { Layout } from '../../components';

import Button from '../../material-kit/CustomButtons';
import Mushroom from '../../../../public/mushroom.png';
import { CoinRow, Coin, ButtonWrap } from './style';
import { HomePageProperties } from './type';
import mapDispatchToProps from './dispatch';

const HomePageComponent: FunctionComponent<HomePageProperties> = ({
    dispatchLoad,
    dispatchUnload,
    client,
    error,
    notify,
    openConfirmModal,
}) => {

    useEffect(() => {
        dispatchLoad(client);
    }, []);
    useDispatchUnload(dispatchUnload);
    useErrorNotification(error, notify);

    return (
        <Layout title="Hello from <%- application_name %>">
            <p>
                This is a demo page. If you see this page, it means that at
                least <code>react</code>, <code>react-router</code>,{' '}
                <code>redux</code> and <code>redux-saga</code> work properly.
            </p>
            <p>
                If you see this big mushroom, it means that static assets are
                being served normally:
                <br/>
                <img src="/mushroom.png" width="50" height="50"/>
            </p>
            <p>
                And if you see a second big mushroom, that indicates that{' '}
                <code>url-loader</code> plugin works as expected:
                <br/>
                <img src={Mushroom} width="50" height="50"/>
            </p>
            <p>
                If the following button is gray and shadow-ish, then{' '}
                <code>jss</code> plugin works:
                <br/>
                <Button onClick={() => {
                    openConfirmModal(
                        <span>This is how we ask questions.</span>,
                        ({ closeModal }) => {
                            return [
                                <ButtonWrap key="yes">
                                    <Button
                                        onClick={() => {
                                            closeModal();
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </ButtonWrap>,
                                <ButtonWrap key="no">
                                    <Button
                                        onClick={closeModal}
                                    >
                                        No
                                    </Button>
                                </ButtonWrap>,
                            ];
                        },
                    );
                }}>I am a gray button, click me</Button>
            </p>
            <p>
                If you see three coins in a row below, then{' '}
                <code>styled-components</code> and <code>sc-companion</code>{' '}
                modules are allright:
                <br/>
                <CoinRow>
                    <Coin/>
                    <Coin/>
                    <Coin/>
                </CoinRow>
            </p>
            <p>Enjoy!</p>
            <br/>
        </Layout>
    );
};

export const HomePage = withModal(withNotification(withClient(connect(s => s.home, mapDispatchToProps)(HomePageComponent))));
