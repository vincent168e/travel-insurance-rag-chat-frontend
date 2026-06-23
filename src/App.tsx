import React from "react";
import { MainLayout } from "./layouts/MainLayout";
import { ChatWindow } from "./components/ChatWindow";

const App: React.FC = () => {
  return (
    <MainLayout>
      <ChatWindow />
    </MainLayout>
  );
};

export default App;
