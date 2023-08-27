import './App.css'
import {observer} from "mobx-react";
import {useAppStore} from "./AppStore.ts";


const App = observer(() =>  {
    let appStore = useAppStore()
   return  <>
       <button onClick={() => window.location.href = "/test"}>Go to test</button>
   </>
});

export default App
