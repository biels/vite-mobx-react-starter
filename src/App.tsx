import './App.css'
import {observer} from "mobx-react";
import {useAppStore} from "./AppStore.ts";


const App = observer(() => {
    let appStore = useAppStore()
    return <>
        <button onClick={() => window.location.href = "/test"}>Go to test</button>
        <button
          onClick={() => appStore.setCounter(appStore.count + 1)}
        >Increment {appStore.count}
        </button>

        <div className="bg-red-500">
            <p className="text-blue-500"> Tailwind CSS is working! </p>
        </div>
        <div className="p-4 bg-blue-500 text-white">
            This should be a blue box with white text
        </div>
    </>
});

export default App
