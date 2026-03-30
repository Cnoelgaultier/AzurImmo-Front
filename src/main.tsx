import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

import Navbar from './Navbar'
import HomePage from './HomePage'
// 1. On importe les VRAIS composants
import BatimentTable from "./BatimentTable";
import AppartementTable from "./AppartementTable";
import InterventionTable from "./InterventionTable.tsx";
import LocatairesBatimentPage from './LocatairesBatimentPage';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
                    <Navbar />

                    <main className="container mx-auto px-4 py-12">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            {/* 2. On utilise les composants importés ici */}
                            <Route path="/batiments" element={<BatimentTable />} />
                            <Route path="/appartements" element={<AppartementTable />} />
                            <Route path="/interventions" element={<InterventionTable />} />
                            <Route path="/batiments/:id/locataires" element={<LocatairesBatimentPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)