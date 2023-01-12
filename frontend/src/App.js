import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotPage from "./components/SpotPage";
import SpotInfo from "./components/SpotInfo/SpotInfo";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpotForm from "./components/SpotForm";
import EditSpotFrom from "./components/EditSpotForm";
import CreateReviewForm from "./components/CreateReviewForm";
import EditReviewForm from "./components/EditReviewForm";
import MySpotsPage from "./components/MySpotsPage";
import MyReviewsPage from "./components/MyReviewsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SpotPage />
          </Route>
          <Route exact path='/spots/user'>
            <MySpotsPage />
          </Route>
          <Route path='/spots/new'>
            <CreateSpotForm />
          </Route>
          <Route path='/spots/edit/:spotId'>
            <EditSpotFrom />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotInfo />
          </Route>
          
          {/* <Route path='/spots/:spotId/reviews'>
            <CreateReviewForm />
          </Route> */}
          <Route path='/spots/:spotId/reviews/edit/:reviewId'>
            <EditReviewForm />
          </Route>
          <Route>
            <MyReviewsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;