import './App.scss';
import {Header, Layout} from './components';
import {Home, Plans} from './pages';
import { Routes, Route } from 'react-router-dom';

const App = () =>  {
  return (
    <div className="app__container">
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <Header />
                    </Layout>
                }
            >
                <Route index path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
