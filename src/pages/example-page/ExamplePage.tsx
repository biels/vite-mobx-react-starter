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

    return <div className="min-h-screen bg-app text-text-primary transition-colors duration-200 p-6 sm:p-8">
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
                    onClick={(e) => themeStore.toggleDarkMode(e)}
                    aria-label="Toggle theme"
                    className="!p-2"
                >
                    {themeStore.darkModeActive ? <FiSun size={20} /> : <FiMoon size={20} />}
                </Button>
            </header>

            {/* Main content */}
            <main className="space-y-8">
                <section className="p-6 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">MobX Store Status</h2>
                    <div className="space-y-2">
                        <p className="text-text-secondary">
                            Loading: <span className="font-mono text-blue-600 dark:text-blue-400">{store.loading ? 'true' : 'false'}</span>
                        </p>
                    </div>
                </section>

                <section className="p-6 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Example Logic Data</h2>
                    <pre className="bg-surface-alt p-4 rounded border border-border-primary overflow-x-auto">
                        <code className="text-sm text-text-primary">
                            {JSON.stringify(exampleData, null, 2)}
                        </code>
                    </pre>
                </section>

                <section className="p-6 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">About This Page</h2>
                    <p className="text-text-secondary mb-4">
                        This is an example page demonstrating the MobX store pattern with a separate logic layer.
                        The page structure includes:
                    </p>
                    <ul className="space-y-2 text-text-secondary list-disc list-inside">
                        <li>ExampleStore - MobX store for reactive state</li>
                        <li>ExampleLogic - Business logic layer</li>
                        <li>ExampleModel & ExampleTypes - Data models and types</li>
                    </ul>
                </section>
            </main>
        </div>
    </div>
})
