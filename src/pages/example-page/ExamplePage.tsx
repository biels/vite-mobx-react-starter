import React from "react";
import {observer} from 'mobx-react'
import {useExampleStore} from "./ExampleStore.tsx";
import {useThemeStore} from "../../ThemeStore.ts";
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiHome } from 'react-icons/fi';
import {Button} from "../../components/Button.tsx";

export interface ExamplePageProps {

}

export const ExamplePage = observer((props: ExamplePageProps) => {
    let store = useExampleStore()
    let themeStore = useThemeStore()
    let logic = store.exampleLogic;
    let exampleData = logic.getExampleData();

    return <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 p-6 sm:p-8">
        <div className="mx-auto max-w-7xl">
            {/* Header with theme toggle */}
            <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button
                            variant="secondary"
                            size="sm"
                            aria-label="Go home"
                            className="!p-2"
                        >
                            <FiHome size={20} />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Example Page</h1>
                </div>
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

            {/* Main content */}
            <main className="space-y-8">
                <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">MobX Store Status</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300">
                            Loading: <span className="font-mono text-blue-600 dark:text-blue-400">{store.loading ? 'true' : 'false'}</span>
                        </p>
                    </div>
                </section>

                <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Example Logic Data</h2>
                    <pre className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-700 overflow-x-auto">
                        <code className="text-sm text-gray-800 dark:text-gray-200">
                            {JSON.stringify(exampleData, null, 2)}
                        </code>
                    </pre>
                </section>

                <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">About This Page</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This is an example page demonstrating the MobX store pattern with a separate logic layer.
                        The page structure includes:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                        <li>ExampleStore - MobX store for reactive state</li>
                        <li>ExampleLogic - Business logic layer</li>
                        <li>ExampleModel & ExampleTypes - Data models and types</li>
                    </ul>
                </section>
            </main>
        </div>
    </div>
})
