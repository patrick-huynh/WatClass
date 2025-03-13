'use client';

import { useState } from 'react';
import CourseTable from '../components/CourseTable';

export default function Form() {
  const [answers, setAnswers] = useState<{ qid: number; answer: number }[]>([]);
  const [question, setQuestion] = useState({
    qid: 1,
    questionText: 'Analytical Thinking: Rate your overall analytical problem-solving skills (1-10)',
  });
  const [answer, setAnswer] = useState('');
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categoryRanges = {
    analyticalThinking: [1, 21],
    creativity: [22, 42],
    collaboration: [43, 63],
    difficulty: [64, 84],
  };

  const handleNextQuestion = async () => {
    if (!answer) {
      alert('Please provide an answer between 1-10.');
      return;
    }

    const newAnswers = [...answers, { qid: question.qid, answer: Number(answer) }];
    setAnswers(newAnswers);

    const response = await fetch(`/api/next_question?qid=${question.qid}&answer=${answer}`);
    const data = await response.json();

    if (data) {
      setQuestion({ qid: data.qid, questionText: data.questionText });
      setAnswer('');
    } else {
      setNoMoreQuestions(true);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(false);
    setLoading(true);
    setNoMoreQuestions(false);

    const computedScores: { [key: string]: number } = {};

    Object.entries(categoryRanges).forEach(([category, range]) => {
      const filteredAnswers = answers.filter(
        (entry) => entry.qid >= range[0] && entry.qid <= range[1]
      );

      if (filteredAnswers.length > 0) {
        const sum = filteredAnswers.reduce((acc, curr) => acc + curr.answer, 0);
        computedScores[category] = sum / filteredAnswers.length;
      }
    });

    console.log("Final Computed Scores:", computedScores);

    const filterPayload = {
      analyticalThinking: computedScores.analyticalThinking
        ? [Math.max(1, computedScores.analyticalThinking - 1), Math.min(10, computedScores.analyticalThinking + 1)]
        : [1, 10],
      creativity: computedScores.creativity
        ? [Math.max(1, computedScores.creativity - 1), Math.min(10, computedScores.creativity + 1)]
        : [1, 10],
      collaboration: computedScores.collaboration
        ? [Math.max(1, computedScores.collaboration - 1), Math.min(10, computedScores.collaboration + 1)]
        : [1, 10],
      difficulty: computedScores.difficulty
        ? [Math.max(1, computedScores.difficulty - 1), Math.min(10, computedScores.difficulty + 1)]
        : [1, 10],
    };

    console.log("Filter Payload:", filterPayload);

    try {
      const response = await fetch('/api/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const courses = await response.json();
      setRecommendedCourses(courses);
      setSubmitted(true);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setSubmitted(true);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      {!submitted && !loading && !noMoreQuestions ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold mb-4">Answer the Questions</h1>
          <p className="text-md">{question.questionText}</p>
          <input
            type="number"
            min="1"
            max="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button onClick={handleNextQuestion} className="bg-blue-500 text-white p-2 rounded mt-4">
            Next Question
          </button>
        </div>
      ) : null}

      {!submitted && !loading && noMoreQuestions ? (
        <div>
          <p className="text-md font-bold text-green-600">All questions completed! 🎉</p>
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded mt-4">
            Submit All Answers
          </button>
        </div>
      ) : null}

      {submitted && (
        <div>
          <h1 className="text-lg font-bold mb-4">Recommended Courses</h1>
          <CourseTable courses={recommendedCourses} submitted={submitted} loading={loading} />
        </div>
      )}
    </div>
  );
}
