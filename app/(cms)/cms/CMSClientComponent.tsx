"use client"

import React, { useCallback, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "@firecms/ui/index.css";
import '@firecms/ui/dist/index.css';

import {
    AppBar,
    Authenticator,
    CircularProgressCenter,
    Drawer,
    FireCMS,
    ModeControllerProvider,
    NavigationRoutes,
    Scaffold,
    SideDialogs,
    SnackbarProvider,
    useBuildLocalConfigurationPersistence,
    useBuildModeController,
    useBuildNavigationController,
    useValidateAuthenticator,
    AuthController,
    DataSourceDelegate,
    StorageSource,
    EntityCollection,
    NavigationController,
    UserConfigurationPersistence
} from "@firecms/core";
import {
    FirebaseAuthController,
    FirebaseLoginView,
    FirebaseSignInProvider,
    FirebaseUserWrapper,
    useFirebaseAuthController,
    useFirebaseStorageSource,
    useFirestoreDelegate,
    useInitialiseFirebase,
} from "@firecms/firebase";
import { CenteredView } from "@firecms/ui";
import { projectsCollection } from "./collections/projects";
import { usersCollection } from "./collections/users";
import { firebaseConfig } from "@app/firebase/firebase-config";
import { teamsCollection } from "./collections/teams";

function CMSPage() {
    const myAuthenticator: Authenticator<FirebaseUserWrapper> = useCallback(async ({
                                                                                       user,
                                                                                       authController
                                                                                   }) => {
        // if (user?.email?.includes("flanders")) {
        //     throw Error("Stupid Flanders!");
        // }
        // const idTokenResult = await user?.firebaseUser?.getIdTokenResult();
        // const userIsAdmin = idTokenResult?.claims.admin || user?.email?.endsWith("@firecms.co");
        if (user?.email != null && (user?.email == "ajwmagnuson@gmail.com" || user?.email == "zainhmoustafa@gmail.com")) {
            return true;
        }
        return false;
    }, []);

    const collections = useMemo(() => [
        projectsCollection,
        usersCollection,
        teamsCollection
    ], []);

    const {
        firebaseApp,
        firebaseConfigLoading,
        configError
    } = useInitialiseFirebase({
        firebaseConfig
    });

    const modeController = useBuildModeController();
    const signInOptions: FirebaseSignInProvider[] = ["google.com"];
    const authController: FirebaseAuthController = useFirebaseAuthController({
        firebaseApp,
        signInOptions
    });

    const userConfigPersistence = useBuildLocalConfigurationPersistence();
    const firestoreDelegate = useFirestoreDelegate({
        firebaseApp
    });

    const storageSource = useFirebaseStorageSource({
        firebaseApp
    });

    const {
        authLoading,
        canAccessMainView,
        notAllowedError
    } = useValidateAuthenticator({
        authController: authController as AuthController<FirebaseUserWrapper>,
        authenticator: myAuthenticator as Authenticator<FirebaseUserWrapper>,
        dataSourceDelegate: firestoreDelegate as DataSourceDelegate,
        storageSource: storageSource as StorageSource
    });

    const navigationController = useBuildNavigationController({
        collections: collections as EntityCollection<any>[],
        authController: authController as AuthController<FirebaseUserWrapper>,
        dataSourceDelegate: firestoreDelegate as DataSourceDelegate
    });

    if (firebaseConfigLoading || !firebaseApp) {
        return <CircularProgressCenter/>;
    }

    // if (configError) {
    //     return <CenteredView>{configError}</CenteredView>;
    // }
    if (configError) {
        return <div className="flex items-center justify-center h-screen">{configError}</div>;
    }

    return (
        <Router>
            <SnackbarProvider>
                <ModeControllerProvider value={modeController}>
                    <FireCMS
                        navigationController={navigationController as NavigationController}
                        authController={authController as AuthController<FirebaseUserWrapper>}
                        userConfigPersistence={userConfigPersistence as UserConfigurationPersistence}
                        dataSourceDelegate={firestoreDelegate as DataSourceDelegate}
                        storageSource={storageSource as StorageSource}
                    >
                        {({
                              context,
                              loading
                          }) => {

                            if (loading || authLoading) {
                                return <CircularProgressCenter size={"large"}/>;
                            }

                            if (!canAccessMainView) {
                                return <FirebaseLoginView authController={authController}
                                                          firebaseApp={firebaseApp}
                                                          signInOptions={signInOptions}
                                                          notAllowedError={notAllowedError}/>;
                            }

                            return <Scaffold
                                autoOpenDrawer={false}>
                                <AppBar title={"Scuffed FireCMS (zain)"}/>
                                <Drawer/>
                                <NavigationRoutes/>
                                <SideDialogs/>
                            </Scaffold>;
                        }}
                    </FireCMS>
                </ModeControllerProvider>
            </SnackbarProvider>
        </Router>
    );
}

export default CMSPage;