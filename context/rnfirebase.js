/* eslint-disable */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import Config from "../config";

class Firebase {
    constructor() {
        this.auth = auth();
        this.db = firestore();

    }
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }
    getCredential(email, password) {
        return auth.EmailAuthProvider.credential(
            email, password
        );
    }
    async loginWithFaceBook(callback) {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
            if (result.isCancelled) {
                callback("Login cancelled")
            } else {
                new GraphRequestManager().addRequest(new GraphRequest('/me?fields=email', null, (error, res) => {
                    if (error) callback(error)
                    else {
                        this.auth.fetchSignInMethodsForEmail(res.email).then(providers => {
                            console.log("providers", providers)
                            if (!(providers && providers.length)) {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                                    // let exmaple_facebook = {
                                    //     "additionalUserInfo": {
                                    //         "isNewUser": false, "profile":
                                    //             { "email": "lananhnguyen021209@gmail.com", "first_name": "Nguyen", "id": "263358944672135", "last_name": "Lan Anh", "name": "Lan Anh Nguyen", "picture": [Object] }, "providerId": "facebook.com"
                                    //     },
                                    //     "user": {
                                    //         "displayName": "Lan Anh Nguyen", "email": "lananhnguyen021209@gmail.com",
                                    //         "emailVerified": false, "isAnonymous": false, "metadata": [Object], "phoneNumber": null,
                                    //         "photoURL": "https://graph.facebook.com/263358944672135/picture", "providerData": [Array], "providerId": "firebase",
                                    //         "uid": "PrAmLKyxqkP9OZYztvhRY4HUORr1"
                                    //     }
                                    // }
                                    // console.log("data", data)
                                    // console.log("facebookCredential", facebookCredential)
                                    this.signInWithCredential(facebookCredential, "facebook", callback)
                                })
                            } else if (providers && providers[0] === "google.com") {
                                this.loginWithGoogle(callback)
                            } else {
                                callback({ code: 'auth/account-exists-with-different-credential', email: res.email, provider: providers[0] })
                            }
                        })
                    }
                })).start();
            }
        }, (error) => {
            callback(error)
        });
    }
    async loginWithGoogle(callback) {
        // Get the users ID token
        await GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: Config._env.webClientId, // From Firebase Console Settings,
            // forceCodeForRefreshToken: true,
            offlineAccess: false
        });
        const data = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // let exmaple_google = {
        //     "additionalUserInfo": {
        //         "isNewUser": false, "profile": {
        //             "aud": "481147921191-9vjqjcsb3q4bjitompmqatfmca4ff2o1.apps.googleusercontent.com", "azp": "481147921191-v4lt5khj1gn287ne7iq39v91ln6s7r1u.apps.googleusercontent.com", "email": "candyzumy@gmail.com", "email_verified": true, "exp": 1586754367, "family_name": "Nguyen", "given_name": "TiNa", "iat": 1586750767, "iss": "https://accounts.google.com", "locale": "en", "name": "TiNa Nguyen", "picture": "https://lh3.googleusercontent.com/a-/AOh14GgetmBLGaHSkKCbBk9jvcEmDL4q2mZuysZS2ppO=s96-c", "sub": "107436299695673983007"
        //         }, "providerId": "google.com"
        //     }, "user": {
        //         "displayName": "TiNa Nguyen", "email": "candyzumy@gmail.com", "emailVerified": true, "isAnonymous": false,
        //         "metadata": [Object], "phoneNumber": null, "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgetmBLGaHSkKCbBk9jvcEmDL4q2mZuysZS2ppO=s96-c", "providerData": [Array], "providerId": "firebase", "uid": "7As6Lqm5XOSUeheoEQgwPKdrWrI2"
        //     }
        // }
        // console.log("data", data)
        // console.log("googleCredential", googleCredential)
        this.signInWithCredential(googleCredential, "google", callback)
    }
    signInWithCredential(credential, provider, callback) {
        this.auth.signInWithCredential(credential).then(async (data) => {
            try {
                const id = (data.user.email && data.user.email.removeDiacritics()) || data.user.uid
                var currentDoc = await this.db.collection("users").doc(id).get();
                if (currentDoc && currentDoc.exists) {
                    callback(null, data.user)
                }
                else {
                    this.db.collection("users").doc(id)
                        .set({
                            email: data.user.email,
                            provider,
                            created_at: new Date()
                        }).then(() => {
                            callback(null, data.user)
                        })
                }
            } catch (error) {
                console.log("getDocument", error);
                callback(error)
            }
        }).catch((error) => {
            callback(error)
        });
    }
    getDocument(collection, id, handleChange) {
        try {
            const api = this.db.collection(collection).doc(id);
            api.onSnapshot(function (doc) {
                handleChange && handleChange(doc);
            });
            return api.get();
        } catch (error) {
            console.log("getDocument", error);
        }
    }

    async  addDocument(collection, id, doc, callback) {
        try {
            var currentDoc = await this.db.collection(collection).doc(id).get();
            if (currentDoc && currentDoc.exists) {
                callback({ exists: true })
            }
            else {
                this.db.collection(collection).doc(id)
                    .set({
                        ...doc,
                        created_at: new Date()
                    }).then(() => {
                        callback()
                    });
            }
        } catch (error) {
            callback(error)
        }
    }
}
export default new Firebase();