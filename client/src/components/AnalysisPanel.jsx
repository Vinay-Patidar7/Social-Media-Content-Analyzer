function AnalysisPanel({ text, analysis, error }) {
  return (
    <section className="card analysis">
      <h2>2. Analysis & Suggestions</h2>

      {error && <div className="alert alert--error">{error}</div>}

      {!text && !error && (
        <p className="analysis__placeholder">
          Upload a file to see the extracted text and engagement insights here.
        </p>
      )}

      {text && (
        <>
          <div className="analysis__stats">
            <h3>Quick stats</h3>
            <ul>
              <li>
                <strong>Characters:</strong> {analysis?.length ?? text.length}
              </li>
              <li>
                <strong>Words:</strong> {analysis?.words ?? "-"}
              </li>
              <li>
                <strong>Has hashtags:</strong>{" "}
                {analysis?.hasHashtag ? "Yes" : "No"}
              </li>
              <li>
                <strong>Has question:</strong>{" "}
                {analysis?.hasQuestion ? "Yes" : "No"}
              </li>
              <li>
                <strong>Has CTA:</strong> {analysis?.hasCTA ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          <div className="analysis__suggestions">
            <h3>Suggestions</h3>
            {analysis?.suggestions?.length ? (
              <ul>
                {analysis.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            ) : (
              <p>No specific suggestions – your copy looks balanced.</p>
            )}
          </div>

          <div className="analysis__text">
            <h3>Extracted text</h3>
            <textarea
              readOnly
              value={text}
              rows={10}
              className="analysis__textarea"
            />
          </div>
        </>
      )}
    </section>
  );
}

export default AnalysisPanel;
