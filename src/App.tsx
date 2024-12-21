import { BrowserRouter, Route, Routes } from "react-router"
import { AuthProvider } from "./contexts/authContext"
import { PrivateRoute } from "./components/privateRoutes"
import { Authenticate } from "./pages/authenticate"
import { Toaster } from "./components/ui/sonner"
import { Chat } from "./pages/chat"
import { MessagesProvider } from "./contexts/messagesContext"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <MessagesProvider>
          <Toaster />

          <Routes>
            <Route index path="/" element={<Authenticate />} />

            <Route element={<PrivateRoute />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </MessagesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
