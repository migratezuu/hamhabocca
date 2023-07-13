import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLayout from './layouts/HomeLayout';
import BoardLayout from './layouts/BoardLayout';
import Home from './pages/Home';
import RallyBoard from './pages/RallyBoard';
import RallySearchBoard from './pages/RallySearchBoard';
import RallyPost from './pages/RallyPost';
import WriteRallyPost from './pages/WriteRallyPost';
import ModifyRallyPost from './pages/ModifyRallyPost';
import ReviewBoard from './pages/ReviewBoard';
import ReviewSearchBoard from './pages/ReviewSearchBoard';
import ReviewPost from './pages/ReviewPost';
import WriteReviewPost from './pages/WriteReviewPost';
import ReviewEdit from './pages/ReviewEdit';
import Notice from './pages/Notice';
import QnABoard from './pages/QnABoard';
import QnAPost from './pages/QnAPost'
import QnASearchBoard from './pages/QnASearchBoard';
import WriteQnA from './pages/WriteQnA';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Oauth from './pages/Oauth';
import EditQnA from './pages/EditQnA';
import InitialPopUp from './components/popups/InitialPopUp';

// 브라우저별 기본 CSS 스타일 초기화
import '../src/reset.css';
import './App.css';
import Oauth1 from './pages/Oauth1';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomeLayout />}>
					<Route index element={<Home />} />
				</Route>
				<Route path='/' element={<BoardLayout />}>
					<Route path='rally'>
						<Route index element={<RallyBoard />} />
						<Route path=':rallyId' element={<RallyPost />} />
						<Route path='search' element={<RallySearchBoard />} />
						<Route path='write' element={<WriteRallyPost />} />
						<Route path=':rallyId/edit' element={<ModifyRallyPost />} />
					</Route>
					<Route path='review'>
						<Route index element={<ReviewBoard />} />
						<Route path=':reviewId' element={<ReviewPost />} />
						<Route path='search' element={<ReviewSearchBoard />} />
						<Route path='write' element={<WriteReviewPost />} />
						<Route path=':reviewId/edit' element={<ReviewEdit />} />
					</Route>
					<Route path='notice' element={<Notice />} />
					<Route path='qna'>
						<Route index element={<QnABoard />} />
						<Route path=':qnaId' element={<QnAPost />} />
						<Route path='search' element={<QnASearchBoard />} />
						<Route path='write' element={<WriteQnA />} />
						<Route path=':qnaId/edit' element={< EditQnA />} />
					</Route>
					<Route path='mypage' element={<MyPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/oauth' element={<Oauth />} />
					<Route path='/oauth1' element={<Oauth1 />} />
				</Route>
				<Route path='/popup'>
					<Route path='initial' element={<InitialPopUp />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
