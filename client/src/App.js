import './App.scss';
import {Header, Layout} from './components';
import {Home, Plans} from './pages';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useGlobalContext} from './context/GlobalContext';

const App = () => {
    const {isAccSuccess} = useGlobalContext();

    return (
        <div className="app__container">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Header/>
                        </Layout>
                    }
                >
                    {
                        isAccSuccess
                            ? <>
                                <Route index path="/" element={<Home/>}/>
                                <Route path="/plans" element={<Plans/>}/>
                                <Route path="*" element={<Navigate to="/" replace/>}/>
                            </>
                            : <>
                                <Route index path="/" element={<Home/>}/>
                                <Route path="*" element={<Navigate to="/" replace/>}/>
                            </>
                    }
                </Route>
            </Routes>
        </div>
    );
}

export default App;
