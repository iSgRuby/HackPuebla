import "./App.css"

import { Box } from "@mui/material"

import Header from "./components/Header/Header"
import TabsMenu from "./components/TabsMenu/TabsMenu"
import Dashboard from "./Pages/Dashboard"
import Alerts from "./Pages/Alerts"

function App() {
  return <Box sx={{ width: '100%' }}>

            <Header/>

            <TabsMenu labels={['Dashboard','Alerts']} views={[<Dashboard/>, <Alerts/>]} />
        </Box>
}

export default App;
