import React from 'react';
import './App.css';
import { CoronaProvider } from './model/useTokyoCorona';
import { CalendarBackground } from './components/CalendarBackground/CalendarBackground';
import { ClipboardButton } from './components/ClipboardButton/ClipboardButton';
import { DescriptionText } from './components/DescriptionText/DescriptionText';
import { HeaderTitle } from './components/HeaderTitle/HeaderTitle';
import { SourceText } from './components/SourceText/SourceText';

function App() {
  return (
    <div className="App">
      <CoronaProvider>
        <HeaderTitle />
        <DescriptionText />
        <CalendarBackground>
          aaa
          <ClipboardButton />
        </CalendarBackground>
        <SourceText />
      </CoronaProvider>
    </div>
  );
}

export default App;
