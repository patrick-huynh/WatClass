SELECT subject, 
    AVG(difficulty), 
    AVG(analyticalThinking), 
    AVG(creativity), 
    AVG(collaboration) 
    FROM CourseRatingView
    GROUP BY subject;