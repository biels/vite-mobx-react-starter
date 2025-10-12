import {observer} from "mobx-react";
import {useAppStore} from "./AppStore.ts";
import {useThemeStore} from "./ThemeStore.ts";
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import {Button} from "./components/Button.tsx";

const App = observer(() => {
    let appStore = useAppStore()
    let themeStore = useThemeStore()

    return <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 p-6 sm:p-8">
        <div className="mx-auto max-w-7xl">
            {/* Header with theme toggle */}
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold">Vite + MobX + React</h1>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => themeStore.toggleTheme()}
                    aria-label="Toggle theme"
                    className="!p-2"
                >
                    {themeStore.theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                </Button>
            </header>

            {/* Main content - responsive grid layout */}
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Counter Section */}
                <section className="p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-2xl font-semibold mb-6">MobX Counter Example</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Button
                            variant="primary"
                            onClick={() => appStore.setCounter(appStore.count + 1)}
                        >
                            Count: {appStore.count}
                        </Button>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Click to increment the counter
                        </span>
                    </div>
                </section>

                {/* Navigation Section */}
                <section className="p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-2xl font-semibold mb-6">Example Page</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        View a complete example with MobX store, logic layer, and data models.
                    </p>
                    <Link to="/example">
                        <Button variant="success">
                            View Example Page
                        </Button>
                    </Link>
                </section>

                {/* Features Section - spans full width on desktop */}
                <section className="lg:col-span-2 p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">Vite</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Lightning fast builds</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">MobX</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Reactive state management</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">React Router</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Client-side routing</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">TailwindCSS v4</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Modern utility-first CSS</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">TypeScript</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Type safety & IntelliSense</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">Dependency Injection</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Clean architecture with tsyringe</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
});

export default App
