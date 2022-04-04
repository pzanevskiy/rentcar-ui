import './index.css'
import { App } from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { render } from 'react-dom'

const rootElement: any = document.getElementById('root')
render(<App/>, rootElement)
