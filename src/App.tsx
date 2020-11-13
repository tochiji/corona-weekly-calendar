import React from 'react';
import './App.css';
import { CoronaProvider } from './model/useTokyoCorona';
import { CalendarBackground } from './components/CalendarBackground/CalendarBackground';
import { ClipboardButton } from './components/ClipboardButton/ClipboardButton';
import { DescriptionText } from './components/DescriptionText/DescriptionText';
import { HeaderTitle } from './components/HeaderTitle/HeaderTitle';
import { SourceText } from './components/SourceText/SourceText';
import { CoronaWeeklyTable } from './components/CoronaWeeklyTable/CoronaWeeklyTable';
import { GitHubIcon } from './components/GitHubIcon/GitHubIcon';

function App() {
  return (
    <div className="App">
      <CoronaProvider>
        <HeaderTitle />
        <DescriptionText />
        <CalendarBackground>
          <CoronaWeeklyTable />
          <ClipboardButton />
          <SourceText />
        </CalendarBackground>
        <GitHubIcon />
      </CoronaProvider>
    </div>
  );
}

export default App;
