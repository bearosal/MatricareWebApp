import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './User/components/Pages/Footer';
import Signup from './User/components/Pages/Signup';
import Login from './User/components/Pages/Login';
import ContactPage from './User/components/Pages/ContactPage';
import Inquiries from './User/components/Pages/Inquiries';
import Header1 from './User/components/Pages/Header1';
import ForgotPass from './User/components/Pages/ForgotPass';
import LandingPage from './User/components/Pages/LandingPage';
import Notifications from './User/components/Pages/Notifications'; 
import UserProfile from './User/components/Settings/UserProfile';
import MedicalRec from './User/components/Settings/MedicalRec'; 
import WeeklyPregnancy from './User/components/Library/WeeklyPregnancy';
import PregDischarge from './User/components/Library/PregDischarge';
import SignsofLabor from './User/components/Library/SignsofLabor';
import DateCalculator from './User/components/Features/datecalculator';
import VirtualConsul from './User/components/Features/VirtualConsul';
import Appointment from './User/components/Features/Appointment';
import FirstTri from './User/components/Library/FirstTri';
import SecondTri from './User/components/Library/SecondTri';
import ThirdTri from './User/components/Library/ThirdTri';
import LibraryDropdown from './User/components/Library/LibraryDropdown';
import MorningSickness from './User/components/Library/MorningSickness';
import LandingPageAssistant from './Assistant/components/Pages/LandingPageAssistant';
import HeaderAssistant from './Assistant/components/Pages/HeaderAssistant';
import ContactAssistant from './Assistant/components/Pages/ContactAssistant';
import NotificationAssistant from './Assistant/components/Pages/NotificationAssistant';
import ProfileAssistant from './Assistant/components/Pages/ProfileAssistant';
import FirstTriAssistant from './Assistant/components/Library/FirstTriAssistant';
import SecondTriAssistant from './Assistant/components/Library/SecondTriAssistant';
import ThirdTriAssistant from './Assistant/components/Library/ThirdTriAssistant';
import MorningSicknessAssistant from './Assistant/components/Library/MorningSicknessAssistant';
import WeeklyPregnancyAssistant from './Assistant/components/Library/WeeklyPregnancyAssistant';
import PregDischargeAssistant from './Assistant/components/Library/PregDischargeAssistant';
import SignsofLaborAssistant from './Assistant/components/Library/SignsofLaborAssistant';
import LibraryDropdownAssistant from './Assistant/components/Library/LibraryDropdownAssistant';
import AppointmentAssistant from './Assistant/components/Features/AppointmentAssistant';
import LandingPageConsultant from './Consultant/components/Pages/LandingPageConsultant';
import HeaderConsultant from './Consultant/components/Pages/HeaderConsultant';
import AppointmentConsultant from './Consultant/components/Features/AppointmentConsultant';
import VirtualConsultation1 from './Consultant/components/Features/VirtualConsultation1';
import ConsultantProfile from './Consultant/components/Settings/ConsultantProfile';
import ConsultantRecord from './Consultant/components/Settings/ConsultantRecord';
import ConsultantNotifications from './Consultant/components/Pages/ConsultantNotifications';
import BellyTalk from './User/components/Features/BellyTalk';
import HomePage from './User/components/Pages/HomePage';
import Library from './User/components/Features/Library';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header1/>
            <LandingPage />
            <Route path="/signup" component={Signup} />
          </Route>
          <Route exact path="/signup">
          <Route path="/login" component={Login} />
            <Signup />
          </Route>
          <Route exact path="/login">
          <Route path="/signup" component={Signup} />
            <Login />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPass />
          </Route>
          <Route exact path="/notification">
          <Route path="/app" component={LandingPage} />
            <Notifications />
          </Route>
          <Route exact path="/app">
          <HomePage />
            <Route path="/signup" component={Signup} />
          </Route>
          <Route exact path="/contact">
            <ContactPage />
          </Route>
          <Route exact path="/inquiries">
            <Inquiries />
          </Route>
          <Route exact path="/userprofile">
          <Route path="/app" component={LandingPage} />
            <UserProfile />
          </Route>
          <Route exact path="/library">
            <Library />
          </Route>
          <Route exact path="/virtual-consultation">
          <Route path="/app" component={LandingPage} />
            <VirtualConsul />
          </Route>
          <Route exact path="/appointment-scheduling">
          <Route path="/app" component={LandingPage} />
            <Appointment />
          </Route>
          <Route exact path="/duedate-calculator" component={DateCalculator} />
          <Route exact path="/app" component={LandingPage} />
          <Route exact path="/medicalrecords">
          <Route path="/app" component={LandingPage} />
            <MedicalRec />
          </Route>
      
          <Route exact path="/library-item1">
            <FirstTri />
          </Route>
          <Route exact path="/library-item2">
            <SecondTri />
          </Route>
          <Route exact path="/library-item3">
            <ThirdTri />
          </Route>
          <Route exact path="/library-item4">
          <Route path="/library" component={Library} />
            <WeeklyPregnancy />
          </Route>
          <Route exact path="/library-item5">
            <MorningSickness />
          </Route>
          <Route exact path="/library-item6">
            <PregDischarge />
          </Route>
          <Route exact path="/library-item7">
            <SignsofLabor />
          </Route>
          <Route exact path="/library-dropdown">
            <LibraryDropdown />
          </Route>
          <Route exact path="/belly-talk">
          <Route path="/LandingPage" component={LandingPage} />
            <BellyTalk />
          </Route>
          <Route exact path="/assistant-landing">
            <LandingPageAssistant />
          </Route>
          <Route exact path="/assistant-contact">
            <ContactAssistant />
          </Route>
          <Route exact path="/assistant-notification">
            <NotificationAssistant />
          </Route>
          <Route exact path="/assistant-profile">
            <ProfileAssistant />
          </Route>
          <Route exact path="/assistant-library-item1">
            <FirstTriAssistant />
          </Route>
          <Route exact path="/assistant-library-item2">
            <SecondTriAssistant />
          </Route>
          <Route exact path="/assistant-library-item3">
            <ThirdTriAssistant />
          </Route>
          <Route exact path="/assistant-library-item4">
            <WeeklyPregnancyAssistant />
          </Route>
          <Route exact path="/assistant-library-item5">
            <MorningSicknessAssistant />
          </Route>
          <Route exact path="/assistant-library-item6">
            <PregDischargeAssistant />
          </Route>
          <Route exact path="/assistant-library-item7">
            <SignsofLaborAssistant />
          </Route>
          <Route exact path="/assistant-library-dropdown">
            <LibraryDropdownAssistant />
          </Route>
          <Route exact path="/appointment-assistant">
          <Route path="/notification-Assistant" component={NotificationAssistant} />
            <AppointmentAssistant />
          </Route>
          <Route exact path="/consultant-landing">
            <LandingPageConsultant />
          </Route>
          <Route exact path="/consultant-records">
          <ConsultantRecord />
          </Route>
          <Route exact path="/consultant-appointment">
          <AppointmentConsultant />
          </Route>
          <Route exact path="/consultant-virtual">
          <VirtualConsultation1 />
          </Route>
          <Route exact path="/consultant-contactus">
          <ContactPage />
          </Route>
          <Route exact path="/consultant-profile">
          <ConsultantProfile />
          </Route>
          <Route exact path="/consultant-notification">
            <ConsultantNotifications />
          </Route>
          <Route exact path="/consultant-library-item1">
            <FirstTri />
          </Route>
          <Route exact path="/consultant-library-item2">
            <HeaderConsultant />
            <SecondTri />
          </Route>
          <Route exact path="/consultant-library-item3">
            <ThirdTri />
          </Route>
          <Route exact path="/consultant-library-item4">
            <WeeklyPregnancy />
          </Route>
          <Route exact path="/consultant-library-item5">
            <MorningSickness />
          </Route>
          <Route exact path="/consultant-library-item6">
            <PregDischarge />
          </Route>
          <Route exact path="/consultant-library-item7">
            <SignsofLabor />
          </Route>


          
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
