import React, { useEffect } from 'react'
import {Route} from 'react-router-dom'
import MainContainer from './components/main/mainContainer'
import IntegratedStore from './mobx/integratedStore'
import {observer} from 'mobx-react'

const App = observer(() => {
  const {language} = IntegratedStore

  useEffect(() => {
    console.log(language.isPersist())
    console.log(language.language)
  }, [])

  return (
    <div className="App">
      <Route path="/saved/:savedId" component={MainContainer} />
      <Route exact path="/" component={MainContainer} />
    </div>
  )
})

export default App
