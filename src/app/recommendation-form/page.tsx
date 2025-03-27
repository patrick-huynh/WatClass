'use client';

import { useState } from 'react';
import CourseTable from '../components/CourseTable';
import Button from '../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const categoryRanges = {
    analyticalThinking: [1, 21],
    creativity: [22, 42],
    collaboration: [43, 63],
    difficulty: [64, 84],
  };

  const handleNextQuestion = async () => {
    let answerNum = Number(answer);
    if (!answerNum || answerNum < 1 || answerNum > 10) {
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
        ? [Math.round(Math.max(1, computedScores.analyticalThinking - 1)), Math.round(Math.min(10, computedScores.analyticalThinking + 1))]
        : [1, 10],
      creativity: computedScores.creativity
        ? [Math.round(Math.max(1, computedScores.creativity - 1)), Math.round(Math.min(10, computedScores.creativity + 1))]
        : [1, 10],
      collaboration: computedScores.collaboration
        ? [Math.round(Math.max(1, computedScores.collaboration - 1)), Math.round(Math.min(10, computedScores.collaboration + 1))]
        : [1, 10],
      difficulty: computedScores.difficulty
        ? [Math.round(computedScores.difficulty)]
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
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <Image src="/Logo.svg" alt="logo" width={150} height={150} />
        <div className="h-full flex flex-row gap-4">
          <Button onClick={() => router.push('/')} title="Back to Home" />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <div className="max-w-4xl w-full space-y-8 p-8 bg-white rounded-lg shadow">
          {!submitted && !loading && !noMoreQuestions ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-center">Answer the Questions</h1>
              <p className="text-md">{question.questionText}</p>
              <input
                type="number"
                min="1"
                max="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNextQuestion()}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
              <Button title="Next Question" onClick={handleNextQuestion} />
            </div>
          ) : null}

          {!submitted && !loading && noMoreQuestions ? (
            <div className="flex flex-col gap-4">
              <p className="text-md font-bold text-green-600 text-center">All questions completed! 🎉</p>
              <Button title="Submit All Answers" onClick={handleSubmit} />
            </div>
          ) : null}

          {submitted && (
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold text-center">Recommended Courses</h1>
              <div className="w-full overflow-x-auto">
                <CourseTable courses={recommendedCourses} submitted={submitted} loading={loading} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
