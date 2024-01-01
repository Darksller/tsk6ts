import Draw from './pages/Draw'
import { Home } from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/room/*' element={<Draw />} />
			</Routes>
		</Router>
	)
}

export default App
