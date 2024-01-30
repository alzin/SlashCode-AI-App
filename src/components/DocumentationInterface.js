// DocumentationInterface.js

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SendIcon from "@mui/icons-material/Send";
import MarkdownEditor from "@uiw/react-markdown-editor";

import exampleText from "./dummy_requirements";

const DocumentationInterface = () => {
  const [requirements, setRequirements] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleRequirementsChange = (event) => {
    const text = event.target.value;
    setRequirements(text);
  };

  const loadExample = () => {
    setRequirements(exampleText);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    try {
      const response = await axios.post(
        "https://flaskbackend-production.up.railway.app/api/process-requirements",
        { requirements }
      );
      // Assuming the API returns an array of questions
      setQuestions(response.data.questions);
      setAnswers({});
    } catch (error) {
      console.error("Error processing requirements: ", error);
    }
    setLoading(false);
  };

  const handleInputChange = (index, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [index]: value }));
  };

  const handleSendAnswers = async () => {
    setLoading(true);
    try {
      // Create an array of question-answer pairs
      const qaPairs = questions.map((question, index) => ({
        question: question,
        answer: answers[index] || "",
      }));

      const response = await axios.post(
        // "http://127.0.0.1:5000/api/generate-document",
        "https://flaskbackend-production.up.railway.app/api/generate-document",
        { qaPairs } // Send the array of question-answer pairs
      );
      // Assuming the API returns some result
      setResult(response.data.result);
    } catch (error) {
      console.error("Error sending answers: ", error);
    }
    setLoading(false);
  };

  const handlePDFDownload = async () => {
    try {
      const response = await axios.post(
        "https://markdowntopdf-production.up.railway.app/generate-pdf",
        { markdown: result },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "documentation.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <TextField
            label="Input your software system requirements..."
            multiline
            rows={15}
            value={requirements}
            onChange={handleRequirementsChange}
            variant="outlined"
            fullWidth
            placeholder="Start typing or load an example to edit..."
          />
          <Button
            variant="text"
            color="primary"
            onClick={loadExample}
            style={{ marginTop: "10px" }}
          >
            Load Example
          </Button>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<DescriptionIcon />}
              onClick={handleSubmit}
              disabled={loading || !requirements.trim()}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Process Requirements"
              )}
            </Button>
          </div>

          {/* Render questions and answer inputs */}
          {questions.map((question, index) => (
            <FormControl fullWidth margin="normal" key={index}>
              <InputLabel htmlFor={`question-${index}`}>{question}</InputLabel>
              <Input
                id={`question-${index}`}
                value={answers[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <FormHelperText>Enter your answer</FormHelperText>
            </FormControl>
          ))}

          {/* Send Answers Button */}
          {questions.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleSendAnswers}
              disabled={
                loading || Object.keys(answers).length < questions.length
              }
              style={{ marginBottom: "20px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Send Answers"}
            </Button>
          )}

          {/* Display the result from generating the document */}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloudDownloadIcon />}
              onClick={handlePDFDownload}
              disabled={!result || loading}
            >
              Download PDF
            </Button>
          </div>
          {result && (
            <MarkdownEditor.Markdown
              source={result}
              data-color-mode="dark"
              style={{
                marginTop: "20px",
                margin: "10px auto",
                height: "800px",
                width: "100%",
                overflow: "scroll",
                textAlign: "left",
                fontSize: "1.2rem",
                padding: "20px",
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationInterface;
