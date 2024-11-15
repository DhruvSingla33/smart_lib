import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Video from "./pages/Video";
import DataProvider from './context/DataProvider';
import Home from "./routes/Home/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Upload from "./components/Upload";
import Contact from "./components/Contact";
import Book from "./routes/Book/book";
import Personalproblem from "./routes/Book/personalproblem";
import SingleBook from "./routes/Book/singleBook";
import CreateBook from "./routes/Book/createBook";
import Codeeditor from "./routes/Book/CodeEditor";
import EditBook from "./routes/Book/editBook";
import Recommendation from "./routes/Recommendation/Recommendation";
import { Auth0Provider } from '@auth0/auth0-react';

import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/profile";
import DQ1 from "./routes/defaultQuestions/DQ1";
import DQ2 from "./routes/defaultQuestions/DQ2";
import DQ3 from "./routes/defaultQuestions/DQ3";
import DQ4 from "./routes/defaultQuestions/DQ4";
import DQ5 from "./routes/defaultQuestions/DQ5";

// importing Post routes
import Addpost from "./routes/Posts/Addpost";
import Home1 from './components/Home';
import App2 from './App2';
import App1 from './App1';
import Home2 from "./pages/Home";
import Posts from './Posts';
import Detailpost from "./Detailpost";
function App() {
 
  return (
    <>
    <div data-theme="halloween">
      <Router>
      
        <Header />
        <Routes>
        <Route path="/coding3">
                  <Route index element={<Home2 />} />
                  {/* <Route path="videos" element={<Video />} /> */}
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
        
        <Route path="/addpost" element={ <Addpost/> } />
          <Route path="/" element={ <Home/> } />
          <Route path="/contact" element={ <Contact /> } /> 
          <Route path="/problems" element={ <Book /> } /> 
          <Route path="/personalproblems" element={ <Personalproblem /> } /> 
          <Route path="/problems/:slug" element={ <SingleBook /> } /> 
          <Route path="/coding2" element={ <App2/> } /> 
          <Route path="/coding1" element={ <App1/> } /> 
          <Route path="/upload" element={ <Upload/> } />
          <Route path="/allpost" element={ <Posts/> } />
          <Route path='/allpost/details/:id' element={<Detailpost />} />
          {/* <Route path="/coding3" element={ <App3/> } />  */}
          {/* <Route path="/addproblem" element={ <CreateBook /> } />  */}
          <Route path="/addproblem" element={ <CreateBook /> } /> 
          
          <Route path="/code" element={ <Codeeditor/> } /> 
          <Route path="/editproblem/:slug" element={ <EditBook/> } />
          <Route path="/recommendation" element={ <Recommendation /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/logout" element={ <Logout /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/default-question-1" element={ < DQ1 />} />
          <Route path="/default-question-2" element={ < DQ2 />} />
          <Route path="/default-question-3" element={ < DQ3/>} />
          <Route path="/default-question-4" element={ < DQ4/>} />
          <Route path="/default-question-5" element={ < DQ5/>} />

        </Routes>
        <Footer />
      </Router>
      </div>
    </>
  )
}

export default App