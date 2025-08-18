import './App.css'
import {observer} from "mobx-react";
import {useAppStore} from "./AppStore.ts";
import { Link } from 'react-router-dom';


const App = observer(() => {
    let appStore = useAppStore()
    return <>
        {/* Example navigation link - replace with your own routes */}
        <Link to="/example" className="m-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Example Page
        </Link>
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
