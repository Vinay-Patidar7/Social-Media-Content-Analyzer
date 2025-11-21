import { useState } from "react";
import UploadArea from "./components/UploadArea.jsx";
import AnalysisPanel from "./components/AnalysisPanel.jsx";

function App() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <header className="app__header">
        <h1>Social Media Content Analyzer</h1>
        <p>Upload your copy and get quick engagement suggestions.</p>
      </header>

      <main className="app__main">
        <UploadArea
          onStartLoading={() => {
            setIsLoading(true);
            setError("");
          }}
          onError={(msg) => {
            setIsLoading(false);
            setError(msg);
          }}
          onTextExtracted={(extractedText) => {
            setIsLoading(false);
            setError("");
            setText(extractedText);
            setAnalysis(analyzeText(extractedText));
          }}
          isLoading={isLoading}
        />

        <AnalysisPanel text={text} analysis={analysis} error={error} />
      </main>
    </div>
  );
}

function analyzeText(text) {
  if (!text || !text.trim()) return null;

  const length = text.trim().length;
  const words = text.trim().split(/\s+/).length;

  const hasHashtag = /#\w+/.test(text);
  const hasQuestion = /\?/.test(text);
  const hasCTA =
    /(follow|subscribe|comment|share|like|click|join|sign up|check out)/i.test(
      text
    );

  const suggestions = [];

  if (length < 50) {
    suggestions.push("Your copy is quite short; consider adding more context.");
  } else if (length > 300) {
    suggestions.push(
      "Your copy is long; try trimming to make it more skimmable."
    );
  }

  if (!hasHashtag) {
    suggestions.push(
      "You’re missing hashtags. Add 2–4 relevant hashtags to increase reach."
    );
  }

  if (!hasCTA) {
    suggestions.push(
      "Add a clear call-to-action (e.g., 'Comment below', 'Share with a friend')."
    );
  }

  if (!hasQuestion) {
    suggestions.push(
      "Questions can boost engagement. Consider asking something your audience can answer."
    );
  }

  return {
    length,
    words,
    hasHashtag,
    hasQuestion,
    hasCTA,
    suggestions,
  };
}

export default App;
